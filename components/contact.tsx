"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { Mail, Phone, MapPin, Github, Facebook } from "lucide-react";

export function Contact() {
    return (
        <section className="flex min-h-screen items-center justify-center px-4 py-12 md:py-24">
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {/* Left column: photo, name, info cards */}
                <div className="flex flex-col items-center md:items-start gap-6">
                    <div className="w-full bg-white/40 dark:bg-neutral-800/50 p-6 sm:p-8 rounded-2xl shadow-lg backdrop-blur-sm border border-gray-200/10 dark:border-neutral-800/30">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-sentient">Phuc Huwu</h1>
                        <p className="mt-6 text-foreground/60 font-mono text-sm sm:text-base space-y-6">AI Engineering & Python Software Development</p>

                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-3">
                            <ContactCard
                                icon={<Mail className="size-4" />}
                                label="Email"
                                value="phuctranhuu37@gmail.com"
                                href="mailto:phuctranhuu37@gmail.com"
                                className="sm:col-span-2 md:col-span-1 xl:col-span-2"
                            />
                            <ContactCard
                                icon={<Facebook className="size-4" />}
                                label="Facebook"
                                value="facebook.com/PhucHuwu"
                                href="https://facebook.com/PhucHuwu"
                                external
                                className="sm:col-span-2 md:col-span-1 xl:col-span-2"
                            />
                            <ContactCard icon={<Phone className="size-4" />} label="Phone" value="(+84) 368 334 223" href="tel:+84368334223" />
                            <ContactCard
                                icon={<Github className="size-4" />}
                                label="GitHub"
                                value="github.com/PhucHuwu"
                                href="https://github.com/PhucHuwu"
                                external
                            />
                            <ContactCard
                                icon={<MapPin className="size-4" />}
                                label="Location"
                                value="Hanoi, Vietnam"
                                className="sm:col-span-2 md:col-span-1 xl:col-span-2"
                            />
                        </div>
                    </div>
                </div>

                {/* Right column: contact form */}
                <div className="w-full flex items-start">
                    <div className="w-full bg-white/40 dark:bg-neutral-800/50 p-6 sm:p-8 rounded-2xl shadow-lg backdrop-blur-sm border border-gray-200/10 dark:border-neutral-800/30">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-sentient">Send me a message</h1>
                        <p className="mt-6 text-foreground/60 font-mono text-sm sm:text-base space-y-6">
                            Have a project or question? Drop a message and I’ll get back to you.
                        </p>

                        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-xs font-mono text-foreground/60 mb-1">Your name</label>
                                <Input name="name" placeholder="Your full name" />
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-foreground/60 mb-1">Your email</label>
                                <Input name="email" type="email" placeholder="you@example.com" />
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-foreground/60 mb-1">Message</label>
                                <Textarea name="message" placeholder="Write your message here..." />
                            </div>

                            <div className="pt-2">
                                <Button type="submit">Send Message</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
function ContactCard({
    icon,
    label,
    value,
    href,
    external,
    className,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    href?: string;
    external?: boolean;
    className?: string;
}) {
    const sendGlHover = (value: boolean) => {
        if (typeof window === "undefined") return;
        window.dispatchEvent(new CustomEvent("gl-hover", { detail: value }));
    };
    const content = (
        <div
            className={`flex items-center gap-3 p-3 rounded-md transition-colors hover:bg-foreground/10 dark:hover:bg-neutral-800/40 hover:text-foreground/100 cursor-pointer ${
                className ?? ""
            }`}
        >
            <div className="flex-shrink-0 w-10 h-10 rounded-md bg-background/60 dark:bg-neutral-900/30 flex items-center justify-center text-lg">{icon}</div>
            <div className="flex-1 min-w-0">
                <div className="text-xs font-mono text-foreground/60">{label}</div>
                <div className="text-sm font-medium truncate">{value}</div>
            </div>
        </div>
    );

    if (href) {
        return (
            <Link
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="block"
                onMouseEnter={() => sendGlHover(true)}
                onMouseLeave={() => sendGlHover(false)}
                onFocus={() => sendGlHover(true)}
                onBlur={() => sendGlHover(false)}
            >
                {content}
            </Link>
        );
    }

    return (
        <div onMouseEnter={() => sendGlHover(true)} onMouseLeave={() => sendGlHover(false)} onFocus={() => sendGlHover(true)} onBlur={() => sendGlHover(false)}>
            {content}
        </div>
    );
}

function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") || "").toString();
    const email = (data.get("email") || "").toString();
    const message = (data.get("message") || "").toString();

    // fallback: open mail client with prefilled message
    const to = "hello@phuchuwu.dev";
    const subject = encodeURIComponent(`Contact from ${name || email}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} • ${email}`);
    if (typeof window !== "undefined") {
        window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    }
}
