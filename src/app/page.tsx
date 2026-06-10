"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Mail, Globe, Phone, Code2, MapPin } from "lucide-react";
import { MossHoverReveal } from "@/components/MossHoverReveal";

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".anim-hidden, .anim-hidden-scale");
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("anim-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

const projects = [
  {
    title: "Chatbot Dich Vu Cong",
    description:
      "AI chatbot system supporting Vietnamese public administrative services consultation using RAG architecture with FAISS vector database, FastAPI backend, and Sentence Transformers for semantic search optimized for Vietnamese language.",
    tags: ["RAG", "FAISS", "FastAPI", "Semantic Search"],
    github: "https://github.com/PhucHuwu/ChatBot_Dich_vu_cong",
    demo: "https://chatbot-dichvucong.vercel.app/",
  },
  {
    title: "CellphoneS Chatbot",
    description:
      "AI chatbot system for product information lookup, policies, and FAQ for CellphoneS using RAG architecture with FAISS vector database, Meta Llama-4 Scout 17B via Groq API, and Flask RESTful API backend.",
    tags: ["RAG", "FAISS", "Sentence Transformers", "Flask"],
    github: "https://github.com/PhucHuwu/CellphoneS_Chatbot",
  },
  {
    title: "Laos Agent",
    description:
      "Laotian citizen eKYC identity verification system using AI chatbot, OCR document scanning, and real-time facial recognition. Flask backend + vanilla JS frontend with WebSocket support.",
    tags: ["AI Agent", "Tools Calling", "Flask", "Request"],
    github: "https://github.com/PhucHuwu/Laos_Agent",
  },
  {
    title: "IoT Project",
    description:
      "A real-time IoT sensor monitoring system built with ESP32, MQTT, MongoDB, and Flask. Features web dashboard for temperature, humidity, and light data visualization with real-time charts and device control.",
    tags: ["ESP32", "MQTT", "MongoDB", "Flask"],
    github: "https://github.com/PhucHuwu/IoT_Project",
  },
  {
    title: "TuyenSinhGPT",
    description:
      "A web application that provides in-depth information on Vietnamese university admission scores for 2024. With intuitive visual analytics features and an AI-powered advisory chatbot.",
    tags: ["RAG", "SentenceTransformer", "FAISS", "Numpy"],
    github: "https://github.com/PhucHuwu/TuyenSinhGPT_web",
  },
  {
    title: "Chatbot Generate Video",
    description:
      "A Next.js application (Next 16) for generating videos from text prompts and/or images, with all business logic executed on the server side.",
    tags: ["Next.js", "Server-side", "Video Generator", "Prompt Generator"],
    github: "https://github.com/PhucHuwu/Chatbot_generate_video",
    demo: "https://chatbot-generate-video.vercel.app",
  },
];

const contactItems = [
  { label: "Email", value: "phuctranhuu37@gmail.com", href: "mailto:phuctranhuu37@gmail.com", icon: <Mail className="size-4" /> },
  { label: "Facebook", value: "facebook.com/PhucHuwu", href: "https://facebook.com/PhucHuwu", icon: <Globe className="size-4" /> },
  { label: "Phone", value: "(+84) 368 334 223", href: "tel:+84368334223", icon: <Phone className="size-4" /> },
  { label: "GitHub", value: "github.com/PhucHuwu", href: "https://github.com/PhucHuwu", icon: <Code2 className="size-4" /> },
  { label: "Location", value: "Hanoi, Vietnam", icon: <MapPin className="size-4" /> },
];

export default function Home() {
  const slidesRef = useRef<HTMLElement | null>(null);
  const [activeId, setActiveId] = useState("home");

  useScrollReveal();

  useEffect(() => {
    const el = slidesRef.current;
    if (!el) return;

    let isThrottled = false;
    const onWheel = (event: WheelEvent) => {
      if (window.innerWidth < 1024 || event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      event.preventDefault();
      if (isThrottled) return;
      isThrottled = true;

      const slides = Array.from(el.querySelectorAll<HTMLElement>(".slide"));
      const currentIndex = slides.reduce((bestIndex, slide, index) => {
        const bestDiff = Math.abs(slides[bestIndex].offsetLeft - el.scrollLeft);
        const diff = Math.abs(slide.offsetLeft - el.scrollLeft);
        return diff < bestDiff ? index : bestIndex;
      }, 0);
      const targetIndex = event.deltaY > 0 ? Math.min(slides.length - 1, currentIndex + 1) : Math.max(0, currentIndex - 1);

      slides[targetIndex]?.scrollIntoView({ behavior: "smooth", inline: "start" });
      window.setTimeout(() => {
        isThrottled = false;
      }, 600);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    const elements = navItems.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
    const root = window.innerWidth >= 1024 ? slidesRef.current : null;
    const observer = new IntersectionObserver(
      (entries) => {
        const best = entries.reduce<IntersectionObserverEntry | null>((current, entry) => {
          if (!entry.isIntersecting) return current;
          return !current || entry.intersectionRatio > current.intersectionRatio ? entry : current;
        }, null);
        if (best) setActiveId(best.target.id);
      },
      { root, threshold: [0.3, 0.55, 0.75] }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <MossHoverReveal>
      <Header activeId={activeId} onNavigate={scrollTo} />
      <main ref={slidesRef} className="slides" aria-label="Portfolio sections horizontal scroller">
        <section id="home" className="slide home-slide">
          <div className="hero-card text-center">
            <p className="eyebrow animate-fade-up" style={{ animationDelay: "0.1s" }}>Portfolio</p>
            <h1 className="font-sentient text-5xl sm:text-6xl md:text-7xl animate-fade-up" style={{ animationDelay: "0.25s" }}>Phuc Huwu</h1>
            <div className="glass-panel mx-auto mt-6 block px-4 py-2 animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <p className="font-mono text-sm text-foreground/80 sm:text-base">AI Engineering & Python Software Development</p>
            </div>
            <button className="portfolio-button mt-8 animate-fade-up" style={{ animationDelay: "0.55s" }} onClick={() => scrollTo("contact")}>
              [Contact]
            </button>
          </div>
        </section>

        <section id="about" className="slide about-slide">
          <div className="about-grid">
            <div className="anim-hidden-scale relative h-40 w-40 overflow-hidden rounded-full shadow-2xl shadow-white/10 sm:h-48 sm:w-48 md:h-64 md:w-64 lg:h-72 lg:w-72" style={{ transitionDelay: "0.05s" }}>
              <Image src="/PhucHuwu.jpg" alt="Phuc Huwu" fill priority sizes="(min-width: 1024px) 288px, (min-width: 768px) 256px, (min-width: 640px) 192px, 160px" className="object-cover" />
            </div>
            <div className="glass-panel anim-hidden max-w-3xl p-6 text-center sm:p-8 md:text-left" style={{ transitionDelay: "0.15s" }}>
              <h2 className="font-sentient text-5xl sm:text-6xl md:text-7xl">Phuc Huwu</h2>
              <div className="mt-6 space-y-6 font-mono text-sm text-foreground/60 sm:text-base">
                <p>
                  Hello, I&apos;m Phuc Huwu, an AI researcher and developer from Vietnam, currently studying Information Technology at the Posts and
                  Telecommunications Institute of Technology (PTIT). My primary interests are in large language models (LLMs), conversational AI, and the design
                  of intelligent, agentic systems.
                </p>
                <p>
                  I focus on research and engineering at the intersection of LLMs and practical systems: building and fine-tuning models, designing robust
                  chatbots, developing multi-agent workflows, and integrating retrieval-augmented pipelines.
                </p>
                <p>
                  I enjoy reading recent papers, contributing to open-source projects, and collaborating on projects that explore how language models can augment
                  human workflows and enable new forms of automated assistance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="slide projects-slide">
          <div className="projects-grid">
            {projects.map((project, index) => (
              <article key={project.title} className={`glass-panel anim-hidden flex h-full flex-col p-5 sm:p-6`} style={{ transitionDelay: `${0.06 * (index + 1)}s` }}>
                <div className="flex-1">
                  <h2 className="font-sentient text-2xl sm:text-3xl md:text-4xl">{project.title}</h2>
                  <p className="mt-4 font-mono text-sm text-foreground/60">{project.description}</p>
                </div>
                <div className="mt-5 border-t border-white/10 pt-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-foreground/5 px-3 py-1 text-xs text-foreground/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <ExternalButton href={project.github}>GitHub</ExternalButton>
                    {project.demo ? <ExternalButton href={project.demo}>Demo</ExternalButton> : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="slide contact-slide">
          <div className="contact-grid">
            <div className="glass-panel anim-hidden p-6 sm:p-8" style={{ transitionDelay: "0.05s" }}>
              <h2 className="font-sentient text-3xl sm:text-4xl">Phuc Huwu</h2>
              <p className="mt-6 font-mono text-sm text-foreground/60 sm:text-base">AI Engineering & Python Software Development</p>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
                {contactItems.map((item) => (
                  <ContactCard key={item.label} {...item} />
                ))}
              </div>
            </div>
            <div className="glass-panel anim-hidden p-6 sm:p-8" style={{ transitionDelay: "0.18s" }}>
              <h2 className="font-sentient text-3xl sm:text-4xl">Send me a message</h2>
              <p className="mt-6 font-mono text-sm text-foreground/60 sm:text-base">Have a project or question? Drop a message and I&apos;ll get back to you.</p>
              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <Field label="Your name" name="name" placeholder="Your full name" />
                <Field label="Your email" name="email" placeholder="you@example.com" type="email" />
                <label className="block">
                  <span className="mb-1 block font-mono text-xs text-foreground/60">Message</span>
                  <textarea name="message" placeholder="Write your message here..." className="portfolio-input min-h-32 resize-y" />
                </label>
                <button className="portfolio-button" type="submit">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </MossHoverReveal>
  );
}

function Header({ activeId, onNavigate }: { activeId: string; onNavigate: (id: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed left-0 top-0 z-50 w-full pt-8 md:pt-14">
      <header className="container flex items-center justify-between">
        <button className="nav-brand" onClick={() => onNavigate("home")}>
          Portfolio
        </button>
        <nav className="hidden items-center justify-center gap-x-10 lg:flex">
          {navItems.map((item) => (
            <button key={item.id} className={`nav-link ${activeId === item.id ? "nav-link-active" : ""}`} onClick={() => onNavigate(item.id)}>
              {item.label}
            </button>
          ))}
        </nav>
        <button className="nav-brand lg:hidden" onClick={() => setIsOpen((value) => !value)} aria-expanded={isOpen} aria-controls="mobile-nav">
          Menu
        </button>
      </header>
      {isOpen ? (
        <nav id="mobile-nav" className="container mt-4 grid gap-2 lg:hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`mobile-link ${activeId === item.id ? "nav-link-active" : ""}`}
              onClick={() => {
                onNavigate(item.id);
                setIsOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      ) : null}
    </div>
  );
}

function ExternalButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className="external-button">
      {children}
    </Link>
  );
}

function ContactCard({ icon, label, value, href }: { icon: ReactNode; label: string; value: string; href?: string }) {
  const content = (
    <div className="contact-card">
      <span className="contact-icon">{icon}</span>
      <span className="min-w-0">
        <span className="block font-mono text-xs text-foreground/60">{label}</span>
        <span className="block truncate text-sm font-medium">{value}</span>
      </span>
    </div>
  );

  return href ? (
    <Link href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
      {content}
    </Link>
  ) : (
    content
  );
}

function Field({ label, name, placeholder, type = "text" }: { label: string; name: string; placeholder: string; type?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block font-mono text-xs text-foreground/60">{label}</span>
      <input name={name} placeholder={placeholder} type={type} className="portfolio-input" />
    </label>
  );
}

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = String(data.get("name") || "");
  const email = String(data.get("email") || "");
  const message = String(data.get("message") || "");
  const subject = encodeURIComponent(`Contact from ${name || email}`);
  const body = encodeURIComponent(`${message}\n\n- ${name} - ${email}`);
  window.location.href = `mailto:phuctranhuu37@gmail.com?subject=${subject}&body=${body}`;
}
