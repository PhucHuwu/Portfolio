"use client";

import { useEffect } from "react";
import { Hero } from "../components/hero";
import { About } from "../components/about";
import { Projects } from "../components/projects";
import { Contact } from "../components/contact";
import { Leva } from "leva";
import { SlideContainer } from "../components/slide-container";

export default function Home() {
    useEffect(() => {
        try {
            const id = sessionStorage.getItem("scroll-to");
            if (id) {
                // small timeout to ensure layout is ready
                setTimeout(() => {
                    const el = document.getElementById(id);
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 50);
                sessionStorage.removeItem("scroll-to");
            }
        } catch (e) {
            // ignore in non-browser environments
        }
    }, []);
    return (
        <SlideContainer>
            <section id="home" className="slide home-slide">
                <Hero />
            </section>

            <section id="about" className="slide about-slide">
                <About />
            </section>

            <section id="projects" className="slide projects-slide">
                <Projects />
            </section>

            <section id="contact" className="slide contact-slide">
                <Contact />
            </section>

            <Leva hidden />
        </SlideContainer>
    );
}
