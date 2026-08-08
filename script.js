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
