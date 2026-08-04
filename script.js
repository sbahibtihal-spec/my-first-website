// ==============================
// الوضع الليلي
// ==============================

const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {

    const icon = themeToggle.querySelector("i");

    // استرجاع الوضع المحفوظ
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    }

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {

            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");

            localStorage.setItem("theme", "light");

        } else {

            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");

            localStorage.setItem("theme", "dark");
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

        let speed = deleting ? 70 : 120;

        if (!deleting && charIndex > currentWord.length) {
            deleting = true;
            speed = 1500;
        }

        if (deleting && charIndex < 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            charIndex = 0;
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
// تمرير سلس
// ==============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView
