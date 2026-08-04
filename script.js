// ==============================
// شاشة التحميل
// ==============================

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    loader.style.opacity = "0";

    setTimeout(() => {

        loader.style.display = "none";

    }, 600);

});

// ==============================
// الوضع الليلي
// ==============================

const themeToggle = document.getElementById("theme-toggle");

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

// ==============================
// الكتابة المتحركة
// ==============================

const typing = document.getElementById("typing");

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

    let speed = deleting ? 80 : 120;

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

// ==============================
// ظهور الأقسام عند التمرير
// ==============================

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: 0.2

});

sections.forEach((section) => {

    observer.observe(section);

});

// ==============================
// تمرير سلس
// ==============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e) {

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
// تفعيل رابط القائمة
// ==============================

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.forEach(item => item.classList.remove("active"));

        link.classList.add("active");

    });

});

console.log("Portfolio Loaded Successfully");
