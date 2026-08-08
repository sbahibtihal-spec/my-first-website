// =========================
// THEME TOGGLE
// =========================

const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");

        const icon = themeToggle.querySelector("i");

        if (document.body.classList.contains("light-mode")) {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        } else {
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
        }

    });
}


// =========================
// SCROLL ANIMATION
// =========================

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    },
    {
        threshold: 0.15
    }
);

sections.forEach((section) => {
    observer.observe(section);
});


// =========================
// ACTIVE NAVIGATION
// =========================

const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }

    });

});


// =========================
// SMOOTH NAVIGATION
// =========================

navLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        if (targetId.startsWith("#")) {

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }

    });

});


// =========================
// PAGE LOADING ANIMATION
// =========================

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});


// =========================
// FLOATING PARTICLES
// =========================

const particlesContainer = document.getElementById("particles");

if (particlesContainer) {

    for (let i = 0; i < 35; i++) {

        const particle = document.createElement("span");

        particle.style.position = "absolute";
        particle.style.width = Math.random() * 5 + 2 + "px";
        particle.style.height = particle.style.width;
        particle.style.borderRadius = "50%";
        particle.style.background = "#00d9ff";
        particle.style.opacity = Math.random() * 0.5 + 0.2;

        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * 100 + "%";

        particle.style.animation = `
            particleMove ${Math.random() * 8 + 5}s ease-in-out infinite
        `;

        particle.style.animationDelay =
            Math.random() * 5 + "s";

        particlesContainer.appendChild(particle);

    }

}


// =========================
// BUTTON EFFECT
// =========================

const buttons = document.querySelectorAll(".btn");

buttons.forEach((button) => {

    button.addEventListener("mouseenter", () => {
        button.style.transform = "translateY(-4px)";
    });

    button.addEventListener("mouseleave", () => {
        button.style.transform = "";
    });

});
