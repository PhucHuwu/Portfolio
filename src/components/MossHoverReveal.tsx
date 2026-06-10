"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type TrailPoint = {
  id: number;
  x: number;
  y: number;
  life: number;
};

const dustParticles = Array.from({ length: 18 }, (_, index) => {
  const sizes = [1, 1.5, 2, 2.5, 3, 1.5, 2, 3.5];
  const opacities = [0.2, 0.26, 0.18, 0.3, 0.22, 0.16, 0.28];
  const blurs = [0.4, 0.7, 1, 0.5, 1.2, 0.8];
  const durations = [18, 22, 26, 31, 24, 35, 28, 20];
  const direction = index % 2 === 0 ? 1 : -1;

  return {
    left: (index * 17 + 5) % 100,
    top: -34 + ((index * 13) % 58),
    size: sizes[index % sizes.length],
    opacity: opacities[index % opacities.length],
    blur: blurs[index % blurs.length],
    duration: durations[index % durations.length],
    delay: -(index * 1.9),
    drift: direction * (46 + ((index * 11) % 72)),
    sway: direction * (18 + ((index * 7) % 36)),
    vanishY: 42 + ((index * 23) % 54),
  };
});

const lightBeams = [
  { left: 4, top: -28, width: 16, height: 96, rotate: 15, opacity: 0.18, duration: 28, delay: -9 },
  { left: 46, top: -30, width: 18, height: 104, rotate: -9, opacity: 0.15, duration: 32, delay: -5 },
  { left: 84, top: -34, width: 10, height: 76, rotate: -12, opacity: 0.1, duration: 45, delay: -18 },
];

export function MossHoverReveal({ children }: { children?: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  const trailRef = useRef<TrailPoint[]>([]);
  const lastTrailPointRef = useRef({ x: 0, y: 0 });
  const lastMoveTimeRef = useRef(0);
  const pointIdRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [active, setActive] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [reducedEffect, setReducedEffect] = useState(false);

  const maxRadius = reducedEffect ? 300 : 400;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMode = () => {
      const lowCpu = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false;
      const compactScreen = window.innerWidth < 1024;
      setReducedEffect(media.matches || lowCpu || compactScreen);
    };

    updateMode();
    media.addEventListener("change", updateMode);
    window.addEventListener("resize", updateMode);

    return () => {
      media.removeEventListener("change", updateMode);
      window.removeEventListener("resize", updateMode);
    };
  }, []);

  const startTrailDecay = () => {
    if (reducedEffect || rafRef.current) return;

    const tick = () => {
      const now = performance.now();
      const isIdle = now - lastMoveTimeRef.current > 110;
      const decay = active && !isIdle ? 0.985 : 0.92;

      trailRef.current = trailRef.current
        .map((point) => ({ ...point, life: point.life * decay }))
        .filter((point) => point.life > 0.025)
        .slice(-34);

      if (trailRef.current.length > 0) {
        setTrail(trailRef.current);
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setTrail([]);
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const nextTarget = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    lastMoveTimeRef.current = performance.now();
    setPos(nextTarget);

    if (!initializedRef.current) {
      initializedRef.current = true;
      lastTrailPointRef.current = nextTarget;
    }

    const distanceFromLastPoint = Math.hypot(
      nextTarget.x - lastTrailPointRef.current.x,
      nextTarget.y - lastTrailPointRef.current.y,
    );

    if (!reducedEffect && distanceFromLastPoint > 14) {
      trailRef.current = [
        ...trailRef.current,
        {
          id: pointIdRef.current++,
          x: nextTarget.x,
          y: nextTarget.y,
          life: 1,
        },
      ].slice(-14);
      lastTrailPointRef.current = nextTarget;
      setTrail(trailRef.current);
      startTrailDecay();
    }

    const target = e.target as HTMLElement | null;
    setIsInteractive(Boolean(target?.closest("a, button, input, textarea, select, [role='button']")));
  };

  const r = active ? maxRadius : 0;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseEnter={(e) => {
        setActive(true);
        handleMove(e);
      }}
      onMouseLeave={() => {
        setActive(false);
        startTrailDecay();
      }}
      className="moss-bg relative min-h-screen w-full overflow-x-hidden cursor-none select-none lg:h-screen lg:overflow-hidden"
    >
      <div className="mobile-moss-image" aria-hidden="true" />
      <svg className="desktop-moss-hover pointer-events-none absolute inset-0 size-full" aria-hidden="true">
        <defs>
          <radialGradient id="hover-reveal-gradient">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="42%" stopColor="white" stopOpacity="0.9" />
            <stop offset="76%" stopColor="white" stopOpacity="0.36" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="hover-reveal-mask" maskUnits="userSpaceOnUse">
            <rect width="100%" height="100%" fill="black" />
            {!reducedEffect && trail.map((point, index) => {
              const age = index / Math.max(trail.length - 1, 1);
              const tailRadius = r * (0.18 + age * 0.48) * point.life;

              return (
                <circle
                  key={point.id}
                  cx={point.x}
                  cy={point.y}
                  r={tailRadius}
                  fill="url(#hover-reveal-gradient)"
                  opacity={point.life * age * 0.72}
                />
              );
            })}
            <circle
              cx={pos.x}
              cy={pos.y}
              r={r}
              fill="url(#hover-reveal-gradient)"
            />
          </mask>
        </defs>
        <image
          href="/fross.png"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          mask="url(#hover-reveal-mask)"
        />
      </svg>

      <div className="mobile-moss-sweep" aria-hidden="true" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34vh] bg-gradient-to-b from-black/85 via-black/45 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[34vh] bg-gradient-to-t from-black/85 via-black/45 to-transparent" />
      <div className="mobile-moss-fade pointer-events-none absolute inset-0" />

      {!reducedEffect ? <div className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen" aria-hidden="true">
        <div className="forest-light-canopy" />
        {lightBeams.map((beam, index) => (
          <span
            key={index}
            className="forest-light-beam"
            style={
              {
                "--beam-left": `${beam.left}%`,
                "--beam-top": `${beam.top}%`,
                "--beam-width": `${beam.width}vw`,
                "--beam-height": `${beam.height}vh`,
                "--beam-rotate": `${beam.rotate}deg`,
                "--beam-opacity": beam.opacity,
                "--beam-duration": `${beam.duration}s`,
                "--beam-delay": `${beam.delay}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div> : null}

      {!reducedEffect ? <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {dustParticles.map((particle, index) => (
          <span
            key={index}
            className="dust-particle"
            style={
              {
                "--dust-left": `${particle.left}%`,
                "--dust-top": `${particle.top}%`,
                "--dust-size": `${particle.size}px`,
                "--dust-opacity": particle.opacity,
                "--dust-blur": `${particle.blur}px`,
                "--dust-duration": `${particle.duration}s`,
                "--dust-delay": `${particle.delay}s`,
                "--dust-drift": `${particle.drift}px`,
                "--dust-sway": `${particle.sway}px`,
                "--dust-vanish-y": `${particle.vanishY}vh`,
              } as React.CSSProperties
            }
          />
        ))}
      </div> : null}

      <div
        className={`forest-cursor ${active ? "forest-cursor-active" : ""} ${isInteractive ? "forest-cursor-interactive" : ""}`}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
        }}
        aria-hidden="true"
      >
        <span className="forest-cursor-ring" />
        <span className="forest-cursor-dot" />
      </div>

      {children ? <div className="relative z-10 min-h-screen lg:h-screen">{children}</div> : null}
    </div>
  );
}
