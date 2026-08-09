// ================================
// 1. الوضع الليلي
// ================================

const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");

        const icon = themeToggle.querySelector("i");

        if (document.body.classList.contains("light-mode")) {
            if (icon) {
                icon.classList.remove("fa-moon");
                icon.classList.add("fa-sun");
            }

            localStorage.setItem("theme", "light");
        } else {
            if (icon) {
                icon.classList.remove("fa-sun");
                icon.classList.add("fa-moon");
            }

            localStorage.setItem("theme", "dark");
        }
    });
}


// ================================
// 2. حفظ الوضع المختار
// ================================

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    document.body.classList.add("light-mode");

    const icon = document.querySelector("#theme-toggle i");

    if (icon) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    }
}


// ================================
// 3. حركة ظهور الأقسام
// ================================

const sections = document.querySelectorAll("section");

const revealSections = () => {
    sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight - 100) {
            section.classList.add("show");
        }
    });
};

window.addEventListener("scroll", revealSections);

window.addEventListener("load", revealSections);


// ================================
// 4. تحديد القسم الموجود فيه المستخدم
// ================================

const navLinks = document.querySelectorAll("nav a");

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

        const href = link.getAttribute("href");

        if (href === "#" + currentSection) {
            link.classList.add("active");
        }

    });

});


// ================================
// 5. التمرير السلس
// ================================

navLinks.forEach((link) => {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (targetId && targetId.startsWith("#")) {

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


// ================================
// 6. حركة زر "تواصل معي"
// ================================

const contactButtons = document.querySelectorAll(
    'a[href="#contact"]'
);

contactButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const contactSection =
            document.getElementById("contact");

        if (contactSection) {

            contactSection.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


// ================================
// 7. حركة عند فتح الموقع
// ================================

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});


// ================================
// 8. تأثير على بطاقات المهارات والمشاريع
// ================================

const cards = document.querySelectorAll(
    ".skill-card, .project-card, .certificate-card, .contact-card"
);

cards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX =
            (y - centerY) / 20;

        const rotateY =
            (centerX - x) / 20;

        card.style.transform =
            `perspective(800px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-5px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(800px) rotateX(0) rotateY(0) translateY(0)";

    });

});


// ================================
// 9. رسالة بسيطة عند الضغط على روابط فارغة
// ================================

const emptyLinks = document.querySelectorAll(
    'a[href="#"]'
);

emptyLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        event.preventDefault();

    });

});
// ================================
// تشغيل JavaScript بعد تحميل الصفحة
// ================================
document.addEventListener("DOMContentLoaded", () => {

    // ================================
    // الوضع الليلي / النهاري
    // ================================
    const themeToggle = document.getElementById("theme-toggle");

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");

            // تغيير الأيقونة
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

            // حفظ الاختيار
            if (document.body.classList.contains("light-mode")) {
                localStorage.setItem("theme", "light");
            } else {
                localStorage.setItem("theme", "dark");
            }
        });
    }


    // ================================
    // استرجاع الوضع المحفوظ
    // ================================
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");

        const icon = document.querySelector("#theme-toggle i");

        if (icon) {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        }
    }


    // ================================
    // حركة ظهور العناصر عند التمرير
    // ================================
    const animatedElements = document.querySelectorAll(
        ".section, .skill-card, .project-card, .certificate-card, .contact-card, .about-card"
    );

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

    animatedElements.forEach((element) => {
        element.classList.add("hidden");
        observer.observe(element);
    });


    // ================================
    // حركة خاصة عند فتح الصفحة
    // ================================
    document.body.classList.add("page-loaded");


    // ================================
    // روابط القائمة
    // ================================
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {

            navLinks.forEach((item) => {
                item.classList.remove("active");
            });

            link.classList.add("active");
        });
    });


    // ================================
    // تحديد القسم الحالي أثناء التمرير
    // ================================
    const sections = document.querySelectorAll("section");

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

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    });


    // ================================
    // زر العودة للأعلى
    // ================================
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


    // ================================
    // تأثير الكتابة في الصفحة الرئيسية
    // ================================
    const typingText = document.querySelector(".typing");

    if (typingText) {

        const text = typingText.textContent;
        typingText.textContent = "";

        let index = 0;

        function typeWriter() {

            if (index < text.length) {
                typingText.textContent += text.charAt(index);
                index++;

                setTimeout(typeWriter, 100);
            }
        }

        typeWriter();
    }


    // ================================
    // منع إرسال نموذج التواصل
    // إذا كان النموذج موجوداً
    // ================================
    const contactForm = document.querySelector("#contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", (event) => {

            event.preventDefault();

            alert("شكراً لك! تم إرسال رسالتك بنجاح ❤️");

            contactForm.reset();
        });
    }

});
