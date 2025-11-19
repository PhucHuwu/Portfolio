"use client";

import Link from "next/link";
import { Pill } from "./pill";
import { Button } from "./ui/button";

export function Hero() {
    const emitHover = (v: boolean) => {
        window.dispatchEvent(new CustomEvent("gl-hover", { detail: v }));
    };

    return (
        <div className="flex flex-col min-h-svh justify-between py-6">
            <div className="pb-16 mt-auto text-center relative">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-sentient">
                    Phuc Huwu
                    <br />
                </h1>
                <p className="font-mono text-sm sm:text-base text-foreground/60 text-balance mt-8 max-w-[440px] mx-auto">
                    AI Engineering & Python Software Development
                </p>

                <Link className="contents max-sm:hidden" href="/#contact">
                    <Button className="mt-14" onMouseEnter={() => emitHover(true)} onMouseLeave={() => emitHover(false)}>
                        [Contact]
                    </Button>
                </Link>
                <Link className="contents sm:hidden" href="/#contact">
                    <Button size="sm" className="mt-14" onMouseEnter={() => emitHover(true)} onMouseLeave={() => emitHover(false)}>
                        [Contact]
                    </Button>
                </Link>
            </div>
        </div>
    );
}
