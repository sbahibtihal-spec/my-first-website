/* =====================================================
   NAIMA PORTFOLIO - JAVASCRIPT
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. العناصر الأساسية
    ===================================================== */

    const html = document.documentElement;
    const body = document.body;

    const themeToggle = document.getElementById("theme-toggle");
    const languageToggle = document.getElementById("language-toggle");

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    let currentLanguage = "ar";


    /* =====================================================
       2. الوضع الليلي / النهاري
    ===================================================== */

    if (themeToggle) {

        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "light") {
            body.classList.add("light-mode");
            themeToggle.textContent = "☀️";
        } else {
            body.classList.remove("light-mode");
            themeToggle.textContent = "🌙";
        }


        themeToggle.addEventListener("click", () => {

            body.classList.toggle("light-mode");

            const isLight =
                body.classList.contains("light-mode");

            themeToggle.textContent =
                isLight ? "☀️" : "🌙";

            localStorage.setItem(
                "theme",
                isLight ? "light" : "dark"
            );

        });

    }


    /* =====================================================
       3. تغيير اللغة العربية / الإنجليزية
    ===================================================== */

    function changeLanguage(language) {

        currentLanguage = language;

        html.lang = language;

        /*
         * اتجاه الصفحة
         * العربية = RTL
         * الإنجليزية = LTR
         */

        html.dir = language === "ar" ? "rtl" : "ltr";


        /*
         * تغيير جميع النصوص التي تحتوي
         * data-ar و data-en
         */

        const translatedElements =
            document.querySelectorAll("[data-ar][data-en]");

        translatedElements.forEach(element => {

            const text =
                element.getAttribute(
                    language === "ar"
                        ? "data-ar"
                        : "data-en"
                );

            if (text !== null) {
                element.textContent = text;
            }

        });


        /*
         * تغيير زر اللغة
         */

        if (languageToggle) {

            languageToggle.textContent =
                language === "ar"
                    ? "EN"
                    : "AR";

        }


        /*
         * حفظ اللغة
         */

        localStorage.setItem(
            "language",
            language
        );

    }


    if (languageToggle) {

        const savedLanguage =
            localStorage.getItem("language");

        if (savedLanguage === "en") {
            changeLanguage("en");
        } else {
            changeLanguage("ar");
        }


        languageToggle.addEventListener("click", () => {

            const newLanguage =
                currentLanguage === "ar"
                    ? "en"
                    : "ar";

            changeLanguage(newLanguage);

        });

    }


    /* =====================================================
       4. قائمة الهاتف
    ===================================================== */

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            navLinks.classList.toggle("active");

            menuToggle.classList.toggle("active");

            if (navLinks.classList.contains("active")) {
                menuToggle.textContent = "✕";
            } else {
                menuToggle.textContent = "☰";
            }

        });


        /*
         * إغلاق القائمة بعد الضغط على رابط
         */

        const navItems =
            navLinks.querySelectorAll("a");

        navItems.forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                menuToggle.classList.remove("active");

                menuToggle.textContent = "☰";

            });

        });

    }


    /* =====================================================
       5. التمرير السلس
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            });

        });


    /* =====================================================
       6. ظهور الأقسام عند التمرير
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            "section, .about-text, .stat-card, .skill-card, .project-card, .certificate-card, .contact-box"
        );


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(
                            entry.target
                        );

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


    /* =====================================================
       7. تحديد القسم الحالي في القائمة
    ===================================================== */

    const sections =
        document.querySelectorAll("section");

    const navigationLinks =
        document.querySelectorAll(".nav-links a");


    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    navigationLinks.forEach(link => {

                        link.classList.remove(
                            "active"
                        );

                    });


                    const activeLink =
                        document.querySelector(
                            `.nav-links a[href="#${entry.target.id}"]`
                        );


                    if (activeLink) {

                        activeLink.classList.add(
                            "active"
                        );

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


    /* =====================================================
       8. تأثير الكتابة
    ===================================================== */

    const typingElement =
        document.querySelector(".typing");


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

            const currentText =
                texts[textIndex];


            if (!deleting) {

                typingElement.textContent =
                    currentText.substring(
                        0,
                        charIndex + 1
                    );

                charIndex++;


                if (
                    charIndex ===
                    currentText.length
                ) {

                    deleting = true;

                    setTimeout(
                        typingEffect,
                        1800
                    );

                    return;
                }

            } else {

                typingElement.textContent =
                    currentText.substring(
                        0,
                        charIndex - 1
                    );

                charIndex--;


                if (charIndex === 0) {

                    deleting = false;

                    textIndex++;

                    if (
                        textIndex >=
                        texts.length
                    ) {
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


    /* =====================================================
       9. زر العودة إلى الأعلى
    ===================================================== */

    const backToTop =
        document.getElementById("back-to-top");


    if (backToTop) {

        window.addEventListener(
            "scroll",
            () => {

                if (window.scrollY > 500) {

                    backToTop.classList.add(
                        "show"
                    );

                } else {

                    backToTop.classList.remove(
                        "show"
                    );

                }

            }
        );


        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       10. حركة البطاقات بالماوس
    ===================================================== */

    const cards =
        document.querySelectorAll(
            ".project-card, .skill-card, .stat-card, .certificate-card"
        );


    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                        centerY) * -4;


                const rotateY =
                    ((x - centerX) /
                        centerX) * 4;


                card.style.transform =
                    `perspective(800px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });


    /* =====================================================
       11. السنة الحالية تلقائياً
    ===================================================== */

    const yearElements =
        document.querySelectorAll(
            ".current-year"
        );


    yearElements.forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================================
       12. نموذج التواصل
    ===================================================== */

    const contactForm =
        document.querySelector(
            "#contact-form"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                alert(
                    currentLanguage === "ar"
                        ? "شكراً لك 🌷 تم إرسال رسالتك بنجاح."
                        : "Thank you 🌷 Your message has been sent successfully."
                );


                contactForm.reset();

            }
        );

    }


    /* =====================================================
       13. الخلفية المتحركة - الجسيمات
    ===================================================== */

    const particles =
        document.getElementById(
            "particles"
        );


    if (particles) {

        const canvas =
            document.createElement(
                "canvas"
            );


        canvas.style.position =
            "absolute";

        canvas.style.inset = "0";

        canvas.style.width =
            "100%";

        canvas.style.height =
            "100%";


        particles.appendChild(canvas);


        const ctx =
            canvas.getContext("2d");


        let width;
        let height;


        function resizeCanvas() {

            width =
                canvas.width =
                window.innerWidth;

            height =
                canvas.height =
                window.innerHeight;

        }


        resizeCanvas();


        window.addEventListener(
            "resize",
            resizeCanvas
        );


        const particleArray = [];


        const particleCount =
            window.innerWidth < 700
                ? 35
                : 70;


        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            particleArray.push({

                x:
                    Math.random() *
                    width,

                y:
                    Math.random() *
                    height,

                size:
                    Math.random() *
                    2.5 + 0.5,

                speedX:
                    (Math.random() - 0.5) *
                    0.5,

                speedY:
                    (Math.random() - 0.5) *
                    0.5

            });

        }


        function drawParticles() {

            ctx.clearRect(
                0,
                0,
                width,
                height
            );


            particleArray.forEach(
                particle => {

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


                    particle.x +=
                        particle.speedX;

                    particle.y +=
                        particle.speedY;


                    if (
                        particle.x < 0 ||
                        particle.x > width
                    ) {

                        particle.speedX *= -1;

                    }


                    if (
                        particle.y < 0 ||
                        particle.y > height
                    ) {

                        particle.speedY *= -1;

                    }

                }
            );


            requestAnimationFrame(
                drawParticles
            );

        }


        drawParticles();

    }


    /* =====================================================
       14. رسالة Console
    ===================================================== */

    console.log(
        "✨ مرحباً بك في موقع NAIMA - Front-End Developer"
    );

});
