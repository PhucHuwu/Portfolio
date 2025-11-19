"use client";
import Image from "next/image";

export function About() {
    return (
        <section className="flex min-h-screen flex-col md:flex-row items-center justify-center gap-8 px-4 sm:px-6">
            {/* Left: personal photo */}
            <div className="flex-shrink-0 mt-8 md:mt-0 flex items-center justify-center">
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 lg:w-72 lg:h-72 rounded-full overflow-hidden shadow-lg">
                    <Image src="/PhucHuwu.jpg" alt="Phuc Huwu" fill className="object-cover" priority />
                </div>
            </div>

            {/* Right: name + intro text */}
            <div className="pb-16 text-center md:text-left w-full max-w-3xl px-2 sm:px-4">
                <div className="bg-white/40 dark:bg-neutral-800/50 p-6 sm:p-8 rounded-2xl shadow-lg backdrop-blur-sm border border-gray-200/10 dark:border-neutral-800/30">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-sentient">Phuc Huwu</h1>
                    <div className="mt-6 text-foreground/60 font-mono text-sm sm:text-base space-y-6">
                        <p>
                            Hello — I'm Phuc Huwu, an AI researcher and developer from Vietnam, currently studying Information Technology at the Posts and
                            Telecommunications Institute of Technology (PTIT). My primary interests are in large language models (LLMs), conversational AI, and
                            the design of intelligent, agentic systems.
                        </p>

                        <p>
                            I focus on research and engineering at the intersection of LLMs and practical systems: building and fine-tuning models, designing
                            robust chatbots, developing multi-agent workflows, and integrating retrieval-augmented pipelines. My work covers prompt engineering,
                            model evaluation, safety considerations, and deploying prototypes that turn research ideas into usable applications.
                        </p>

                        <p>
                            I enjoy reading recent papers, contributing to open-source projects, and collaborating on projects that explore how language models
                            can augment human workflows and enable new forms of automated assistance. Outside of development, I prototype agent designs, test
                            human-centered interactions, and experiment with novel architectures for scalable conversational systems.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
