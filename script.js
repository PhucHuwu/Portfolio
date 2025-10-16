// Cursor Glow Effect
const cursorGlow = document.querySelector(".cursor-glow");
let mouseX = 0,
    mouseY = 0;
let cursorX = 0,
    cursorY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorGlow.classList.add("active");
});

document.addEventListener("mouseleave", () => {
    cursorGlow.classList.remove("active");
});

function animateCursor() {
    const speed = 0.15;
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;

    cursorGlow.style.left = cursorX + "px";
    cursorGlow.style.top = cursorY + "px";

    requestAnimationFrame(animateCursor);
}
animateCursor();

// Floating Particles Animation
const canvas = document.getElementById("particles-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const numberOfParticles = 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = this.randomColor();
    }

    randomColor() {
        const colors = [
            "rgba(0, 212, 255, ",
            "rgba(255, 0, 110, ",
            "rgba(131, 56, 236, ",
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = this.color + this.opacity + ")";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray.length = 0;
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function connectParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i + 1; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                const opacity = (1 - distance / 120) * 0.3;
                ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach((particle) => {
        particle.update();
        particle.draw();
    });
    connectParticles();
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// MacOS Dock Magnification Effect
const dockItems = document.querySelectorAll(".dock-item");
const dockContainer = document.querySelector(".dock-container");

dockItems.forEach((item, index) => {
    item.addEventListener("mouseenter", (e) => {
        magnifyDock(index);
    });
});

if (dockContainer) {
    dockContainer.addEventListener("mouseleave", () => {
        resetDock();
    });
}

function magnifyDock(hoveredIndex) {
    dockItems.forEach((item, index) => {
        const distance = Math.abs(hoveredIndex - index);
        let scale = 1;
        let translateY = 0;

        if (distance === 0) {
            scale = 1.6;
            translateY = -15;
        } else if (distance === 1) {
            scale = 1.3;
            translateY = -8;
        } else if (distance === 2) {
            scale = 1.1;
            translateY = -3;
        }

        const link = item.querySelector("a");
        link.style.transform = `scale(${scale}) translateY(${translateY}px)`;
    });
}

function resetDock() {
    dockItems.forEach((item) => {
        const link = item.querySelector("a");
        link.style.transform = "scale(1) translateY(0)";
    });
}



// Active navigation item based on scroll
const sections = document.querySelectorAll("section[id]");

function setActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document
                .querySelectorAll(`.dock-item a[href="#${sectionId}"]`)
                .forEach((link) => {
                    link.classList.add("active");
                });
        } else {
            document
                .querySelectorAll(`.dock-item a[href="#${sectionId}"]`)
                .forEach((link) => {
                    link.classList.remove("active");
                });
        }
    });
}

window.addEventListener("scroll", setActiveNav);
setActiveNav();

// Hide/Show Dock on Footer Scroll
const dockNav = document.querySelector("#dock-nav");
const footer = document.querySelector("footer");
let lastScrollTop = 0;

function handleDockVisibility() {
    if (!dockNav || !footer) return;

    const footerRect = footer.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const isMobile = window.innerWidth <= 768;

    // Check if footer is visible in viewport
    const footerVisible = footerRect.top < windowHeight && footerRect.bottom > 0;
    
    // Check if scrolling down
    const scrollingDown = scrollTop > lastScrollTop;
    
    if (footerVisible && scrollingDown) {
        // Hide dock when footer is visible and scrolling down
        dockNav.style.opacity = "0";
        dockNav.style.transform = "translateX(-50%) translateY(20px)";
        dockNav.style.pointerEvents = "none";
    } else {
        // Show dock when scrolling up or footer not visible
        dockNav.style.opacity = "1";
        dockNav.style.transform = "translateX(-50%) translateY(0)";
        dockNav.style.pointerEvents = "auto";
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}

window.addEventListener("scroll", handleDockVisibility);
handleDockVisibility();

// Smooth Scroll
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
