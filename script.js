/* =====================================================
   NAIMA PORTFOLIO - JAVASCRIPT
   Responsive / Mobile / Tablet / Desktop
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

    let currentLanguage =
        localStorage.getItem("language") === "en"
            ? "en"
            : "ar";


    /* =====================================================
       2. الوضع الليلي / النهاري
    ===================================================== */

    function applyTheme(theme) {

        const isLight = theme === "light";

        body.classList.toggle(
            "light-mode",
            isLight
        );

        if (themeToggle) {

            themeToggle.textContent =
                isLight
                    ? "☀️"
                    : "🌙";

            themeToggle.setAttribute(
                "aria-label",
                isLight
                    ? "تفعيل الوضع الليلي"
                    : "تفعيل الوضع النهاري"
            );

        }

    }


    const savedTheme =
        localStorage.getItem("theme") || "dark";

    applyTheme(savedTheme);


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                const isLight =
                    body.classList.contains(
                        "light-mode"
                    );

                const newTheme =
                    isLight
                        ? "dark"
                        : "light";

                applyTheme(newTheme);

                localStorage.setItem(
                    "theme",
                    newTheme
                );

            }
        );

    }


    /* =====================================================
       3. تغيير اللغة
    ===================================================== */

    function changeLanguage(language) {

        currentLanguage = language;

        html.lang = language;

        html.dir =
            language === "ar"
                ? "rtl"
                : "ltr";


        const translatedElements =
            document.querySelectorAll(
                "[data-ar][data-en]"
            );


        translatedElements.forEach(
            element => {

                const text =
                    element.getAttribute(
                        language === "ar"
                            ? "data-ar"
                            : "data-en"
                    );


                if (text !== null) {

                    element.textContent = text;

                }

            }
        );


        if (languageToggle) {

            languageToggle.textContent =
                language === "ar"
                    ? "EN"
                    : "AR";

        }


        localStorage.setItem(
            "language",
            language
        );

    }


    changeLanguage(currentLanguage);


    if (languageToggle) {

        languageToggle.addEventListener(
            "click",
            () => {

                const newLanguage =
                    currentLanguage === "ar"
                        ? "en"
                        : "ar";

                changeLanguage(newLanguage);

            }
        );

    }


    /* =====================================================
       4. قائمة الهاتف والتابليت
    ===================================================== */

    function closeMobileMenu() {

        if (!navLinks || !menuToggle) {
            return;
        }

        navLinks.classList.remove(
            "active"
        );

        menuToggle.classList.remove(
            "active"
        );

        menuToggle.textContent = "☰";

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    function openMobileMenu() {

        if (!navLinks || !menuToggle) {
            return;
        }

        navLinks.classList.add(
            "active"
        );

        menuToggle.classList.add(
            "active"
        );

        menuToggle.textContent = "✕";

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

    }


    if (menuToggle && navLinks) {

        menuToggle.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                const isOpen =
                    navLinks.classList.contains(
                        "active"
                    );


                if (isOpen) {

                    closeMobileMenu();

                } else {

                    openMobileMenu();

                }

            }
        );


        /* إغلاق القائمة عند الضغط على رابط */

        navLinks
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        closeMobileMenu();

                    }
                );

            });


        /* إغلاق القائمة عند الضغط خارجها */

        document.addEventListener(
            "click",
            event => {

                if (
                    !navLinks.contains(
                        event.target
                    ) &&
                    !menuToggle.contains(
                        event.target
                    )
                ) {

                    closeMobileMenu();

                }

            }
        );


        /* عند تكبير الشاشة */

        window.addEventListener(
            "resize",
            () => {

                if (
                    window.innerWidth > 900
                ) {

                    closeMobileMenu();

                }

            }
        );

    }


    /* =====================================================
       5. التمرير السلس
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (target) {

                        event.preventDefault();


                        const header =
                            document.querySelector(
                                "header"
                            );


                        const headerHeight =
                            header
                                ? header.offsetHeight
                                : 0;


                        const targetPosition =
                            target.getBoundingClientRect()
                                .top +
                            window.scrollY -
                            headerHeight;


                        window.scrollTo({

                            top:
                                Math.max(
                                    0,
                                    targetPosition
                                ),

                            behavior:
                                "smooth"

                        });

                    }

                }
            );

        });


    /* =====================================================
       6. ظهور العناصر عند التمرير
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            "section, .about-text, .stat-card, .skill-card, .project-card, .certificate-card, .contact-box"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "show"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.08
                }
            );


        revealElements.forEach(
            element => {

                element.classList.add(
                    "reveal"
                );

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        /* دعم المتصفحات القديمة */

        revealElements.forEach(
            element => {

                element.classList.add(
                    "show"
                );

            }
        );

    }


    /* =====================================================
       7. تحديد القسم الحالي في القائمة
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const navigationLinks =
        document.querySelectorAll(
            ".nav-links a"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }


                            navigationLinks.forEach(
                                link => {

                                    link.classList.remove(
                                        "active"
                                    );

                                }
                            );


                            const activeLink =
                                document.querySelector(
                                    `.nav-links a[href="#${entry.target.id}"]`
                                );


                            if (activeLink) {

                                activeLink.classList.add(
                                    "active"
                                );

                            }

                        }
                    );

                },
                {
                    rootMargin:
                        "-20% 0px -65% 0px"
                }
            );


        sections.forEach(
            section => {

                sectionObserver.observe(
                    section
                );

            }
        );

    }


    /* =====================================================
       8. تأثير الكتابة
       يعمل فقط إذا كان عنصر .typing موجودًا
    ===================================================== */

    const typingElement =
        document.querySelector(
            ".typing"
        );


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
                    charIndex >=
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


                if (charIndex <= 0) {

                    charIndex = 0;

                    deleting = false;

                    textIndex =
                        (textIndex + 1) %
                        texts.length;

                }

            }


            setTimeout(
                typingEffect,
                deleting
                    ? 50
                    : 100
            );

        }


        typingEffect();

    }


    /* =====================================================
       9. زر العودة إلى الأعلى
       يعمل إذا كان موجودًا في HTML
    ===================================================== */

    const backToTop =
        document.getElementById(
            "back-to-top"
        );


    if (backToTop) {

        const checkScroll =
            () => {

                if (
                    window.scrollY > 500
                ) {

                    backToTop.classList.add(
                        "show"
                    );

                } else {

                    backToTop.classList.remove(
                        "show"
                    );

                }

            };


        window.addEventListener(
            "scroll",
            checkScroll,
            {
                passive: true
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


        checkScroll();

    }


    /* =====================================================
       10. حركة البطاقات بالماوس
       لا تعمل على الهواتف والتابليت
       حتى لا تسبب مشاكل باللمس
    ===================================================== */

    const supportsHover =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches;


    if (supportsHover) {

        const cards =
            document.querySelectorAll(
                ".project-card, .skill-card, .stat-card, .certificate-card"
            );


        cards.forEach(
            card => {

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


                        if (
                            centerX === 0 ||
                            centerY === 0
                        ) {

                            return;

                        }


                        const rotateX =
                            ((y - centerY) /
                                centerY) *
                            -3;


                        const rotateY =
                            ((x - centerX) /
                                centerX) *
                            3;


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

                        card.style.transform =
                            "";

                    }
                );

            }
        );

    }


    /* =====================================================
       11. السنة الحالية
    ===================================================== */

    const yearElements =
        document.querySelectorAll(
            ".current-year"
        );


    yearElements.forEach(
        element => {

            element.textContent =
                new Date()
                    .getFullYear();

        }
    );


    /* =====================================================
       12. نموذج التواصل
       يعمل إذا تمت إضافته إلى HTML
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
                        ? "شكراً لك 🌷 تم إرسال رسالتك."
                        : "Thank you 🌷 Your message has been sent."
                );


                contactForm.reset();

            }
        );

    }


    /* =====================================================
       13. الخلفية المتحركة - Canvas
       محسنة للهواتف والتابليت
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


        canvas.setAttribute(
            "aria-hidden",
            "true"
        );


        canvas.style.position =
            "absolute";

        canvas.style.inset = "0";

        canvas.style.width =
            "100%";

        canvas.style.height =
            "100%";

        canvas.style.pointerEvents =
            "none";


        particles.appendChild(
            canvas
        );


        const ctx =
            canvas.getContext(
                "2d"
            );


        if (ctx) {

            let width = 0;
            let height = 0;


            function resizeCanvas() {

                const pixelRatio =
                    Math.min(
                        window.devicePixelRatio || 1,
                        2
                    );


                width =
                    window.innerWidth;

                height =
                    window.innerHeight;


                canvas.width =
                    Math.floor(
                        width *
                        pixelRatio
                    );


                canvas.height =
                    Math.floor(
                        height *
                        pixelRatio
                    );


                ctx.setTransform(
                    pixelRatio,
                    0,
                    0,
                    pixelRatio,
                    0,
                    0
                );

            }


            resizeCanvas();


            window.addEventListener(
                "resize",
                resizeCanvas,
                {
                    passive: true
                }
            );


            const getParticleCount =
                () => {

                    if (
                        window.innerWidth < 480
                    ) {

                        return 25;

                    }

                    if (
                        window.innerWidth < 768
                    ) {

                        return 35;

                    }

                    if (
                        window.innerWidth < 1024
                    ) {

                        return 50;

                    }

                    return 70;

                };


            let particleArray = [];


            function createParticles() {

                const count =
                    getParticleCount();


                particleArray =
                    [];


                for (
                    let i = 0;
                    i < count;
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
                            2 +
                            0.5,

                        speedX:
                            (
                                Math.random() -
                                0.5
                            ) *
                            0.35,

                        speedY:
                            (
                                Math.random() -
                                0.5
                            ) *
                            0.35

                    });

                }

            }


            createParticles();


            let animationFrame;


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
                            "rgba(0, 234, 255, 0.65)";


                        ctx.fill();


                        particle.x +=
                            particle.speedX;


                        particle.y +=
                            particle.speedY;


                        if (
                            particle.x < 0 ||
                            particle.x > width
                        ) {

                            particle.speedX *=
                                -1;

                        }


                        if (
                            particle.y < 0 ||
                            particle.y > height
                        ) {

                            particle.speedY *=
                                -1;

                        }

                    }
                );


                animationFrame =
                    requestAnimationFrame(
                        drawParticles
                    );

            }


            /* تقليل الحركة إذا اختار المستخدم ذلك */

            const reducedMotion =
                window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches;


            if (!reducedMotion) {

                drawParticles();

            }

        }

    }


    /* =====================================================
       14. منع أخطاء الروابط الفارغة
    ===================================================== */

    document
        .querySelectorAll(
            'a[href="#"]'
        )
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();

                    }
                );

            }
        );


    /* =====================================================
       15. رسالة Console
    ===================================================== */

    console.log(
        "✨ NAIMA Portfolio loaded successfully."
    );

});
