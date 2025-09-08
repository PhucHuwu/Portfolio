document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
});

/* --- Liquid glass interactive SVG animation --- */
(function () {
    const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;
    const turbulence = document.getElementById("liquid-turbulence");
    const displacement = document.getElementById("liquid-displacement");

    if (!turbulence || !displacement || prefersReduced) return;

    // gentle continuous animation for baseFrequency
    let t = 0;
    function animateTurbulence() {
        t += 0.01;
        // oscillate baseFrequency subtly to simulate fluid motion
        const bf = 0.006 + Math.sin(t * 0.8) * 0.002 + Math.random() * 0.0005;
        turbulence.setAttribute("baseFrequency", bf.toFixed(5));
        // slowly rotate seed for variety
        const seed = 2 + Math.floor((Math.sin(t * 0.4) + 1) * 3);
        turbulence.setAttribute("seed", seed);
        requestAnimationFrame(animateTurbulence);
    }
    requestAnimationFrame(animateTurbulence);

    // pointer-driven displacement scaling (throttled)
    let last = 0;
    function onPointer(e) {
        const now = performance.now();
        if (now - last < 40) return; // ~25Hz
        last = now;

        const { clientX, clientY } = e.touches ? e.touches[0] : e;
        const w = window.innerWidth;
        const h = window.innerHeight;
        // distance from center -> stronger displacement
        const dx = (clientX - w / 2) / (w / 2);
        const dy = (clientY - h / 2) / (h / 2);
        const dist = Math.min(1, Math.sqrt(dx * dx + dy * dy));
        const scale = 4 + dist * 18; // 4..22
        displacement.setAttribute("scale", scale.toFixed(2));
    }

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("touchmove", onPointer, { passive: true });
})();

window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 100) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
    observer.observe(el);
});

document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    if (!name || !email || !subject || !message) {
        alert("Please fill in all fields!");
        return;
    }

    const mailtoLink = `mailto:phuctranhuu37@gmail.com?subject=${encodeURIComponent(
        subject
    )}&body=${encodeURIComponent(
        `From: ${name}\nEmail: ${email}\n\n${message}`
    )}`;

    window.location.href = mailtoLink;

    this.reset();
    alert("Opening your mail client...");
});

const mobileMenu = document.querySelector(".mobile-menu");
const navLinks = document.querySelector(".nav-links");

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        mobileMenu.classList.toggle("active");

        if (navLinks.classList.contains("active")) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    });

    const navLinksItems = document.querySelectorAll(".nav-links a");
    navLinksItems.forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            mobileMenu.classList.remove("active");
            document.body.style.overflow = "auto";
        });
    });

    document.addEventListener("click", (e) => {
        if (!mobileMenu.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove("active");
            mobileMenu.classList.remove("active");
            document.body.style.overflow = "auto";
        }
    });
}

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = "";

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

window.addEventListener("load", () => {
    const heroTitle = document.querySelector(".hero-content h1");
    if (heroTitle) {
        typeWriter(heroTitle, "Phuc Huwu", 150);
    }
});

window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector(".bg-animation");
    const speed = scrolled * 0.5;
    parallax.style.transform = `translateY(${speed}px)`;
});

document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)";
    });
});

document.querySelectorAll(".cta-button, .submit-btn").forEach((button) => {
    button.addEventListener("click", function (e) {
        const ripple = document.createElement("span");
        ripple.classList.add("ripple");
        this.appendChild(ripple);

        const x = e.clientX - e.target.offsetLeft;
        const y = e.clientY - e.target.offsetTop;

        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});
