"use client";

import Link from "next/link";
import { Pill } from "./pill";
import { Button } from "./ui/button";

export function Hero() {
    const emitHover = (v: boolean) => {
        window.dispatchEvent(new CustomEvent("gl-hover", { detail: v }));
    };

    return (
        <div id="hero" className="flex flex-col min-h-svh justify-center py-6">
            <div className="text-center relative">
                <h1 id="hero-heading" className="text-4xl sm:text-6xl md:text-7xl font-sentient">
                    Phuc Huwu
                    <br />
                </h1>
                <div
                    id="hero-subtitle"
                    className="inline-block mt-6 px-4 py-2 rounded-lg bg-white/40 dark:bg-neutral-800/50 backdrop-blur-sm border border-gray-200/10 dark:border-neutral-800/30"
                >
                    <p className="text-foreground/80 font-mono text-sm sm:text-base">AI Engineering & Python Software Development</p>
                </div>

                <div className="mt-14">
                    <Link className="contents max-sm:hidden" href="/#contact">
                        <Button id="hero-contact-btn-desktop" onMouseEnter={() => emitHover(true)} onMouseLeave={() => emitHover(false)}>
                            [Contact]
                        </Button>
                    </Link>
                    <Link className="contents sm:hidden" href="/#contact">
                        <Button id="hero-contact-btn-mobile" size="sm" onMouseEnter={() => emitHover(true)} onMouseLeave={() => emitHover(false)}>
                            [Contact]
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
