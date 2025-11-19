"use client";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";

export function Projects() {
    const sendGlHover = (value: boolean) => {
        if (typeof window === "undefined") return;
        window.dispatchEvent(new CustomEvent("gl-hover", { detail: value }));
    };
    return (
        <section id="projects" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start justify-center gap-6 px-4 md:px-8 lg:px-12 py-8">
            <div className="text-center md:text-left w-full px-1 sm:px-2 h-full">
                <div className="h-full flex flex-col bg-white/40 dark:bg-neutral-800/50 p-4 sm:p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-gray-200/10 dark:border-neutral-800/30">
                    <div className="flex-grow">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-sentient">Chatbot Dich Vu Cong</h1>
                        <div className="mt-4 text-foreground/60 font-mono text-sm space-y-4">
                            <p>
                                AI chatbot system supporting Vietnamese public administrative services consultation using RAG architecture with FAISS vector
                                database, FastAPI backend, and Sentence Transformers for semantic search optimized for Vietnamese language.
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="mt-2 pt-3 border-t border-gray-200/10 dark:border-neutral-800/20 flex flex-wrap gap-2">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-foreground/5 text-foreground/80 dark:bg-neutral-800/20">
                                RAG
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-foreground/5 text-foreground/80 dark:bg-neutral-800/20">
                                FAISS
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-foreground/5 text-foreground/80 dark:bg-neutral-800/20">
                                FastAPI
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-foreground/5 text-foreground/80 dark:bg-neutral-800/20">
                                Semantic Search
                            </span>
                        </div>
                        <div className="mt-2 flex gap-2">
                            <a
                                href="https://github.com/PhucHuwu/ChatBot_Dich_vu_cong"
                                target="_blank"
                                rel="noopener noreferrer"
                                onMouseEnter={() => sendGlHover(true)}
                                onMouseLeave={() => sendGlHover(false)}
                                onFocus={() => sendGlHover(true)}
                                onBlur={() => sendGlHover(false)}
                                className="inline-flex items-center px-3 py-1 rounded-md text-sm bg-foreground/5 text-foreground/80 dark:bg-neutral-800/20 hover:bg-foreground/10 dark:hover:bg-neutral-800/40 hover:text-foreground/100 transition-colors"
                            >
                                <Github className="size-4 mr-2" />
                                GitHub
                            </a>
                            <a
                                href="https://chatbot-dichvucong.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                onMouseEnter={() => sendGlHover(true)}
                                onMouseLeave={() => sendGlHover(false)}
                                onFocus={() => sendGlHover(true)}
                                onBlur={() => sendGlHover(false)}
                                className="inline-flex items-center px-3 py-1 rounded-md text-sm bg-foreground/5 text-foreground/80 dark:bg-neutral-800/20 hover:bg-foreground/10 dark:hover:bg-neutral-800/40 hover:text-foreground/100 transition-colors"
                            >
                                <ExternalLink className="size-4 mr-2" />
                                Demo
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center md:text-left w-full px-1 sm:px-2 h-full">
                <div className="h-full flex flex-col bg-white/40 dark:bg-neutral-800/50 p-4 sm:p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-gray-200/10 dark:border-neutral-800/30">
                    <div className="flex-grow">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-sentient">CellphoneS Chatbot</h1>
                        <div className="mt-4 text-foreground/60 font-mono text-sm space-y-4">
                            <p>
                                AI chatbot system for product information lookup, policies, and FAQ for CellphoneS using RAG architecture with FAISS vector
                                database, Meta Llama-4 Scout 17B via Groq API, and Flask RESTful API backend.
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="mt-2 pt-3 border-t border-gray-200/10 dark:border-neutral-800/20 flex flex-wrap gap-2">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-foreground/5 text-foreground/80 dark:bg-neutral-800/20">
                                RAG
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-foreground/5 text-foreground/80 dark:bg-neutral-800/20">
                                FAISS
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-foreground/5 text-foreground/80 dark:bg-neutral-800/20">
                                Sentence Transformers
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-foreground/5 text-foreground/80 dark:bg-neutral-800/20">
                                Flask
                            </span>
                        </div>
                        <div className="mt-2 flex gap-2">
                            <a
                                href="https://github.com/PhucHuwu/CellphoneS_Chatbot"
                                target="_blank"
                                rel="noopener noreferrer"
                                onMouseEnter={() => sendGlHover(true)}
                                onMouseLeave={() => sendGlHover(false)}
                                onFocus={() => sendGlHover(true)}
                                onBlur={() => sendGlHover(false)}
                                className="inline-flex items-center px-3 py-1 rounded-md text-sm bg-foreground/5 text-foreground/80 dark:bg-neutral-800/20 hover:bg-foreground/10 dark:hover:bg-neutral-800/40 hover:text-foreground/100 transition-colors"
                            >
                                <Github className="size-4 mr-2" />
                                GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center md:text-left w-full px-1 sm:px-2 h-full">
                <div className="h-full flex flex-col bg-white/40 dark:bg-neutral-800/50 p-4 sm:p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-gray-200/10 dark:border-neutral-800/30">
                    <div className="flex-grow">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-sentient">Laos Agent</h1>
                        <div className="mt-4 text-foreground/60 font-mono text-sm space-y-4">
                            <p>
                                Laotian citizen eKYC identity verification system using AI chatbot, OCR document scanning, and real-time facial recognition.
                                Flask backend + vanilla JS frontend with WebSocket support.
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="mt-2 pt-3 border-t border-gray-200/10 dark:border-neutral-800/20 flex flex-wrap gap-2">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-foreground/5 text-foreground/80 dark:bg-neutral-800/20">
                                AI Agent
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-foreground/5 text-foreground/80 dark:bg-neutral-800/20">
                                Tools Calling
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-foreground/5 text-foreground/80 dark:bg-neutral-800/20">
                                Flask
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-foreground/5 text-foreground/80 dark:bg-neutral-800/20">
                                Request
                            </span>
                        </div>
                        <div className="mt-2 flex gap-2">
                            <a
                                href="https://github.com/PhucHuwu/Laos_Agent"
                                target="_blank"
                                rel="noopener noreferrer"
                                onMouseEnter={() => sendGlHover(true)}
                                onMouseLeave={() => sendGlHover(false)}
                                onFocus={() => sendGlHover(true)}
                                onBlur={() => sendGlHover(false)}
                                className="inline-flex items-center px-3 py-1 rounded-md text-sm bg-foreground/5 text-foreground/80 dark:bg-neutral-800/20 hover:bg-foreground/10 dark:hover:bg-neutral-800/40 hover:text-foreground/100 transition-colors"
                            >
                                <Github className="size-4 mr-2" />
                                GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center md:text-left w-full px-1 sm:px-2 h-full">
                <div className="h-full flex flex-col bg-white/40 dark:bg-neutral-800/50 p-4 sm:p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-gray-200/10 dark:border-neutral-800/30">
                    <div className="flex-grow">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-sentient">IoT Project</h1>
                        <div className="mt-4 text-foreground/60 font-mono text-sm space-y-4">
                            <p>
                                A real-time IoT sensor monitoring system built with ESP32, MQTT, MongoDB, and Flask. Features web dashboard for temperature,
                                humidity, and light data visualization with real-time charts and device control.
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="mt-2 pt-3 border-t border-gray-200/10 dark:border-neutral-800/20 flex flex-wrap gap-2">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-foreground/5 text-foreground/80 dark:bg-neutral-800/20">
                                ESP32
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-foreground/5 text-foreground/80 dark:bg-neutral-800/20">
                                MQTT
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-foreground/5 text-foreground/80 dark:bg-neutral-800/20">
                                MongoDB
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-foreground/5 text-foreground/80 dark:bg-neutral-800/20">
                                Flask
                            </span>
                        </div>
                        <div className="mt-2 flex gap-2">
                            <a
                                href="https://github.com/PhucHuwu/IoT_Project"
                                target="_blank"
                                rel="noopener noreferrer"
                                onMouseEnter={() => sendGlHover(true)}
                                onMouseLeave={() => sendGlHover(false)}
                                onFocus={() => sendGlHover(true)}
                                onBlur={() => sendGlHover(false)}
                                className="inline-flex items-center px-3 py-1 rounded-md text-sm bg-foreground/5 text-foreground/80 dark:bg-neutral-800/20 hover:bg-foreground/10 dark:hover:bg-neutral-800/40 hover:text-foreground/100 transition-colors"
                            >
                                <Github className="size-4 mr-2" />
                                GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center md:text-left w-full px-1 sm:px-2 h-full">
                <div className="h-full flex flex-col bg-white/40 dark:bg-neutral-800/50 p-4 sm:p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-gray-200/10 dark:border-neutral-800/30">
                    <div className="flex-grow">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-sentient">TuyenSinhGPT</h1>
                        <div className="mt-4 text-foreground/60 font-mono text-sm space-y-4">
                            <p>
                                A web application that provides in-depth information on Vietnamese university admission scores for 2024. With intuitive visual
                                analytics features and an AI-powered advisory chatbot.
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="mt-2 pt-3 border-t border-gray-200/10 dark:border-neutral-800/20 flex flex-wrap gap-2">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-foreground/5 text-foreground/80 dark:bg-neutral-800/20">
                                RAG
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-foreground/5 text-foreground/80 dark:bg-neutral-800/20">
                                SentenceTransformer
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-foreground/5 text-foreground/80 dark:bg-neutral-800/20">
                                FAISS
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-foreground/5 text-foreground/80 dark:bg-neutral-800/20">
                                Numpy
                            </span>
                        </div>
                        <div className="mt-2 flex gap-2">
                            <a
                                href="https://github.com/PhucHuwu/TuyenSinhGPT_web"
                                target="_blank"
                                rel="noopener noreferrer"
                                onMouseEnter={() => sendGlHover(true)}
                                onMouseLeave={() => sendGlHover(false)}
                                onFocus={() => sendGlHover(true)}
                                onBlur={() => sendGlHover(false)}
                                className="inline-flex items-center px-3 py-1 rounded-md text-sm bg-foreground/5 text-foreground/80 dark:bg-neutral-800/20 hover:bg-foreground/10 dark:hover:bg-neutral-800/40 hover:text-foreground/100 transition-colors"
                            >
                                <Github className="size-4 mr-2" />
                                GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center md:text-left w-full px-1 sm:px-2 h-full">
                <div className="h-full flex flex-col bg-white/40 dark:bg-neutral-800/50 p-4 sm:p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-gray-200/10 dark:border-neutral-800/30">
                    <div className="flex-grow">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-sentient">Chatbot Generate Video</h1>
                        <div className="mt-4 text-foreground/60 font-mono text-sm space-y-4">
                            <p>
                                A Next.js application (Next 16) for generating videos from text prompts and/or images, with all business logic executed on the
                                server side.
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="mt-2 pt-3 border-t border-gray-200/10 dark:border-neutral-800/20 flex flex-wrap gap-2">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-foreground/5 text-foreground/80 dark:bg-neutral-800/20">
                                Next.js
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-foreground/5 text-foreground/80 dark:bg-neutral-800/20">
                                Server-side
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-foreground/5 text-foreground/80 dark:bg-neutral-800/20">
                                Video Generator
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-foreground/5 text-foreground/80 dark:bg-neutral-800/20">
                                Prompt Generator
                            </span>
                        </div>
                        <div className="mt-2 flex gap-2">
                            <a
                                href="https://github.com/PhucHuwu/Chatbot_generate_video"
                                target="_blank"
                                rel="noopener noreferrer"
                                onMouseEnter={() => sendGlHover(true)}
                                onMouseLeave={() => sendGlHover(false)}
                                onFocus={() => sendGlHover(true)}
                                onBlur={() => sendGlHover(false)}
                                className="inline-flex items-center px-3 py-1 rounded-md text-sm bg-foreground/5 text-foreground/80 dark:bg-neutral-800/20 hover:bg-foreground/10 dark:hover:bg-neutral-800/40 hover:text-foreground/100 transition-colors"
                            >
                                <Github className="size-4 mr-2" />
                                GitHub
                            </a>
                            <a
                                href="https://chatbot-generate-video.vercel.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                onMouseEnter={() => sendGlHover(true)}
                                onMouseLeave={() => sendGlHover(false)}
                                onFocus={() => sendGlHover(true)}
                                onBlur={() => sendGlHover(false)}
                                className="inline-flex items-center px-3 py-1 rounded-md text-sm bg-foreground/5 text-foreground/80 dark:bg-neutral-800/20 hover:bg-foreground/10 dark:hover:bg-neutral-800/40 hover:text-foreground/100 transition-colors"
                            >
                                <ExternalLink className="size-4 mr-2" />
                                Demo
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
