"use client";

import { useEffect, useState } from "react";
import { GL } from "./index";

const EFFECTS = ["sparkle", "slowmo", "dense", "spread", "flicker"] as const;

export default function GlClient() {
    const [hovering, setHovering] = useState(false);
    const [effect, setEffect] = useState<string | null>(null);

    useEffect(() => {
        const onHover = (e: Event) => {
            // CustomEvent with detail boolean
            // @ts-ignore
            const detail = (e as CustomEvent)?.detail;
            const isHover = Boolean(detail);
            setHovering(isHover);
            if (isHover) {
                // pick a random effect each time hover starts
                const idx = Math.floor(Math.random() * EFFECTS.length);
                setEffect(EFFECTS[idx]);
            } else {
                // clear effect when not hovering
                setEffect(null);
            }
        };

        window.addEventListener("gl-hover", onHover as EventListener);
        return () => window.removeEventListener("gl-hover", onHover as EventListener);
    }, []);

    return <GL hovering={hovering} effect={effect ?? undefined} />;
}
