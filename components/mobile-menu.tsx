"use client";

import { cn } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface MobileMenuProps {
    className?: string;
}

export const MobileMenu = ({ className }: MobileMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
    ];

    const router = useRouter();

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        e.preventDefault();
        setIsOpen(false);
        const targetId = href.replace("#", "");
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            try {
                window.history.pushState(null, "", href);
            } catch {}
            return;
        }

        // If target not present, navigate to home and set flag to scroll after load
        try {
            sessionStorage.setItem("scroll-to", targetId);
        } catch {}
        router.push("/");
    };

    return (
        <Dialog.Root modal={false} open={isOpen} onOpenChange={setIsOpen}>
            <div className="relative z-50">
                <Dialog.Trigger asChild>
                    <button id="mobile-menu-trigger" className={cn("group lg:hidden p-2 text-foreground transition-colors", className)} aria-label="Open menu">
                        <Menu className="group-[[data-state=open]]:hidden" size={24} />
                        <X className="hidden group-[[data-state=open]]:block" size={24} />
                    </button>
                </Dialog.Trigger>

                <Dialog.Content
                    id="mobile-menu-content"
                    className="absolute top-full right-0 mt-2 w-max min-w-[150px] p-4 rounded-2xl bg-white/40 dark:bg-neutral-800/50 backdrop-blur-md border border-gray-200/10 dark:border-neutral-800/30 shadow-lg origin-top-right data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
                    onInteractOutside={(e) => {
                        setIsOpen(false);
                    }}
                >
                    <Dialog.Title className="sr-only">Menu</Dialog.Title>

                    <nav className="flex flex-col space-y-2">
                        {menuItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={(e) => handleScroll(e, item.href)}
                                className="text-base font-mono uppercase text-foreground/80 transition-colors ease-out duration-150 hover:text-foreground/100 hover:bg-foreground/5 dark:hover:bg-neutral-800/40 px-4 py-3 rounded-lg block"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </Dialog.Content>
            </div>
        </Dialog.Root>
    );
};
