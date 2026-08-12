/* =====================================================
   PORTFOLIO JAVASCRIPT
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       1. الوضع الليلي / النهاري
       ========================================= */

   const languageToggle = document.getElementById("language-toggle");
const html = document.documentElement;

let currentLanguage = "ar"; 

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");

            const icon = themeToggle.querySelector("i");

            if (icon) {
                if (document.body.classList.contains("light-mode")) {
                    icon.classList.remove("fa-moon");
                    icon.classList.add("fa-sun");
                } else {
                    icon.classList.remove("fa-sun");
                    icon.classList.add("fa-moon");
                }
            }

            localStorage.setItem(
                "theme",
                document.body.classList.contains("light-mode")
                    ? "light"
                    : "dark"
            );
        });

        /* استرجاع الوضع المحفوظ */
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "light") {
            document.body.classList.add("light-mode");

            const icon = themeToggle.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-moon");
                icon.classList.add("fa-sun");
            }
        }
    }


    /* =========================================
       2. ظهور الأقسام عند التمرير
       ========================================= */

    const revealElements = document.querySelectorAll(
        "section, .about-text, .stat-card, .skill-card, .project-card, .certificate-card, .contact-box"
    );

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });


    /* =========================================
       3. التمرير السلس للقائمة
       ========================================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    });


    /* =========================================
       4. تحديد القسم الحالي في القائمة
       ========================================= */

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    const sectionObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navLinks.forEach(link => {
                        link.classList.remove("active");
                    });

                    const activeLink = document.querySelector(
                        `.nav-links a[href="#${entry.target.id}"]`
                    );

                    if (activeLink) {
                        activeLink.classList.add("active");
                    }
                }

            });

        },
        {
            threshold: 0.45
        }
    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    /* =========================================
       5. تأثير الكتابة
       ========================================= */

    const typingElement = document.querySelector(".typing");

    if (typingElement) {

        const texts = [
            "Front-End Developer",
            "Web Designer",
            "JavaScript Developer"
        ];

        let textIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typingEffect() {

            const currentText = texts[textIndex];

            if (!deleting) {

                typingElement.textContent =
                    currentText.substring(0, charIndex + 1);

                charIndex++;

                if (charIndex === currentText.length) {
                    deleting = true;

                    setTimeout(typingEffect, 1800);
                    return;
                }

            } else {

                typingElement.textContent =
                    currentText.substring(0, charIndex - 1);

                charIndex--;

                if (charIndex === 0) {
                    deleting = false;

                    textIndex++;

                    if (textIndex >= texts.length) {
                        textIndex = 0;
                    }
                }
            }

            setTimeout(
                typingEffect,
                deleting ? 50 : 100
            );
        }

        typingEffect();
    }


    /* =========================================
       6. زر العودة إلى الأعلى
       ========================================= */

    const backToTop = document.getElementById("back-to-top");

    if (backToTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }

        });

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });
    }


    /* =========================================
       7. حركة البطاقات بالماوس
       ========================================= */

    const cards = document.querySelectorAll(
        ".project-card, .skill-card, .stat-card, .certificate-card"
    );

    cards.forEach(card => {

        card.addEventListener("mousemove", event => {

            const rect = card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -4;

            const rotateY =
                ((x - centerX) / centerX) * 4;

            card.style.transform =
                `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });

    });


    /* =========================================
       8. السنة الحالية تلقائياً
       ========================================= */

    const yearElements =
        document.querySelectorAll(".current-year");

    yearElements.forEach(element => {
        element.textContent = new Date().getFullYear();
    });


    /* =========================================
       9. رسالة نموذج التواصل
       ========================================= */

    const contactForm =
        document.querySelector("#contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            event.preventDefault();

            alert(
                "شكراً لك 🌷 تم إرسال رسالتك بنجاح."
            );

            contactForm.reset();
        });

    }


    /* =========================================
       10. تأثير الجسيمات في الخلفية
       ========================================= */

    const particles =
        document.getElementById("particles");

    if (particles) {

        const canvas =
            document.createElement("canvas");

        canvas.style.position = "absolute";
        canvas.style.inset = "0";
        canvas.style.width = "100%";
        canvas.style.height = "100%";

        particles.appendChild(canvas);

        const ctx = canvas.getContext("2d");

        let width;
        let height;

        function resizeCanvas() {

            width = canvas.width =
                window.innerWidth;

            height = canvas.height =
                window.innerHeight;
        }

        resizeCanvas();

        window.addEventListener(
            "resize",
            resizeCanvas
        );

        const particleArray = [];

        const particleCount =
            window.innerWidth < 700 ? 35 : 70;

        for (let i = 0; i < particleCount; i++) {

            particleArray.push({

                x: Math.random() * width,
                y: Math.random() * height,

                size:
                    Math.random() * 2.5 + 0.5,

                speedX:
                    (Math.random() - 0.5) * 0.5,

                speedY:
                    (Math.random() - 0.5) * 0.5
            });
        }

        function drawParticles() {

            ctx.clearRect(
                0,
                0,
                width,
                height
            );

            particleArray.forEach(particle => {

                ctx.beginPath();

                ctx.arc(
                    particle.x,
                    particle.y,
                    particle.size,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    "rgba(0, 234, 255, 0.7)";

                ctx.fill();

                particle.x += particle.speedX;
                particle.y += particle.speedY;

                if (particle.x < 0 ||
                    particle.x > width) {

                    particle.speedX *= -1;
                }

                if (particle.y < 0 ||
                    particle.y > height) {

                    particle.speedY *= -1;
                }

            });

            requestAnimationFrame(drawParticles);
        }

        drawParticles();
    }


    /* =========================================
       11. رسالة ترحيب في Console
       ========================================= */

    console.log(
        "✨ مرحباً بك في موقع NAIMA - Front-End Developer"
    );
// ======================================
// قائمة الهاتف ☰
// ======================================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("active");

        // تغيير شكل الزر
        if (navLinks.classList.contains("active")) {
            menuToggle.textContent = "✕";
        } else {
            menuToggle.textContent = "☰";
        }

    });


    // إغلاق القائمة عند الضغط على أحد الروابط
    const navItems = navLinks.querySelectorAll("a");

    navItems.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");

            menuToggle.textContent = "☰";

        });

    });

}
