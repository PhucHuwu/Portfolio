"use client";

import React, { useEffect, useRef } from "react";

type Props = {
    children: React.ReactNode;
};

export function SlideContainer({ children }: Props) {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Discrete wheel-to-slide navigation.
        let isThrottled = false;
        const throttleMs = 600;

        const getSlides = () => Array.from(el.querySelectorAll<HTMLElement>(".slide"));

        const onWheel = (e: WheelEvent) => {
            // If shift key is pressed or it's more of a horizontal wheel, allow default
            if (e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
            e.preventDefault();

            if (isThrottled) return;
            isThrottled = true;

            const slides = getSlides();
            if (!slides.length) {
                isThrottled = false;
                return;
            }

            // Determine current index by nearest slide to current scrollLeft
            const scrollLeft = el.scrollLeft;
            const width = el.clientWidth || window.innerWidth;
            // Use bounding left positions for accuracy
            const positions = slides.map((s) => s.offsetLeft);
            let currentIndex = 0;
            let minDiff = Infinity;
            positions.forEach((pos, i) => {
                const diff = Math.abs(pos - scrollLeft);
                if (diff < minDiff) {
                    minDiff = diff;
                    currentIndex = i;
                }
            });

            const delta = e.deltaY;
            let targetIndex = currentIndex;
            if (delta > 0) {
                targetIndex = Math.min(slides.length - 1, currentIndex + 1);
            } else if (delta < 0) {
                targetIndex = Math.max(0, currentIndex - 1);
            }

            const target = slides[targetIndex];
            if (target) {
                target.scrollIntoView({ behavior: "smooth", inline: "start" });
            }

            // Release throttle after animation-ish time
            setTimeout(() => {
                isThrottled = false;
            }, throttleMs);
        };

        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel as any);
    }, []);

    return (
        <main ref={ref} className="slides" role="main" aria-label="Site sections horizontal scroller">
            {children}
        </main>
    );
}
