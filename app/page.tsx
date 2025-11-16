"use client";

import { Hero } from "../components/hero";
import { About } from "../components/about";
import { Projects } from "../components/projects";
import { Contact } from "../components/contact";
import { Leva } from "leva";
import { SlideContainer } from "../components/slide-container";

export default function Home() {
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
