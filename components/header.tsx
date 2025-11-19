"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MobileMenu } from "./mobile-menu";
import React, { useEffect, useState } from "react";

export const Header = () => {
    const sendGlHover = (value: boolean) => {
        if (typeof window === "undefined") return;
        window.dispatchEvent(new CustomEvent("gl-hover", { detail: value }));
    };
    const [activeId, setActiveId] = useState<string | null>(null);
    const router = useRouter();

    const scrollTo = (id: string, e?: React.MouseEvent) => {
        e?.preventDefault();
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
            try {
                window.history.pushState(null, "", `#${id}`);
            } catch {}
            return;
        }

        // If target not present (we're on another route), navigate to home
        try {
            sessionStorage.setItem("scroll-to", id);
        } catch {}
        router.push("/");
    };

    useEffect(() => {
        const ids = ["home", "about", "projects", "contact"];
        const elements = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
        if (!elements.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                // Pick the entry with largest intersectionRatio
                let best: IntersectionObserverEntry | null = null;
                for (const entry of entries) {
                    if (!best || entry.intersectionRatio > best.intersectionRatio) best = entry;
                }
                if (best && best.isIntersecting) {
                    setActiveId(best.target.id);
                }
            },
            {
                threshold: [0.25, 0.5, 0.75],
                root: null,
            }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="fixed z-50 pt-8 md:pt-14 top-0 left-0 w-full">
            <header id="main-header" className="flex items-center justify-between container">
                <Link
                    href="#home"
                    onClick={(e) => scrollTo("home", e)}
                    className="uppercase font-mono backdrop-blur-sm bg-white/30 dark:bg-neutral-900/30 px-3 py-1.5 rounded-lg border border-white/10"
                >
                    Portfolio
                </Link>
                <nav id="desktop-nav" className="flex max-lg:hidden absolute left-1/2 -translate-x-1/2 items-center justify-center gap-x-10">
                    {[
                        { label: "Home", id: "home" },
                        { label: "About", id: "about" },
                        { label: "Projects", id: "projects" },
                        { label: "Contact", id: "contact" },
                    ].map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={(e) => scrollTo(item.id, e)}
                            onMouseEnter={() => sendGlHover(true)}
                            onMouseLeave={() => sendGlHover(false)}
                            onFocus={() => sendGlHover(true)}
                            onBlur={() => sendGlHover(false)}
                            className={`uppercase inline-block font-mono text-foreground/60 hover:text-foreground/100 duration-150 transition-colors ease-out px-2 py-1 rounded-md hover:bg-foreground/6 dark:hover:bg-neutral-800/30 ${
                                activeId === item.id ? "underline decoration-foreground/100 underline-offset-4" : ""
                            }`}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>
                {/* Sign In link removed */}
                <MobileMenu />
            </header>
        </div>
    );
};
