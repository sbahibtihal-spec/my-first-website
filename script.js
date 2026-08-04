// ==============================
// الوضع الليلي
// ==============================

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

// ==============================
// الكتابة المتحركة
// ==============================

const typing = document.getElementById("typing");

if (typing) {

    const words = [
        "Front-End Developer",
        "HTML Developer",
        "CSS Expert",
        "JavaScript Developer"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        const currentWord = words[wordIndex];

        if (!deleting) {
            typing.textContent = currentWord.substring(0, charIndex++);
        } else {
            typing.textContent = currentWord.substring(0, charIndex--);
        }

        let speed = 120;

        if (!deleting && charIndex === currentWord.length + 1) {
            deleting = true;
            speed = 1500;
        }

        if (deleting && charIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        setTimeout(typeEffect, speed);
    }

    typeEffect();

}

// ==============================
// ظهور الأقسام عند التمرير
// ==============================

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

}, {
    threshold: 0.2
});

document.querySelectorAll("section").forEach((section) => {

    section.classList.add("fade-up");
    observer.observe(section);

});

// ==============================
// تفعيل رابط القائمة الحالي
// ==============================

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.forEach((item) => {
            item.classList.remove("active");
        });

        link.classList.add("active");

    });

});

// ==============================
// التمرير السلس
// ==============================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});

// ==============================
// نموذج التواصل
// ==============================

const form = document.querySelector(".contact-form");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        alert("تم إرسال رسالتك بنجاح.");

        form.reset();

    });

}
