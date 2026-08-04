// ==========================
// شاشة التحميل
// ==========================

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    loader.style.opacity = "0";

    loader.style.visibility = "hidden";

});

// ==========================
// الكتابة المتحركة
// ==========================

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

    const current = words[wordIndex];

    if (!deleting) {

        typing.textContent = current.substring(0, charIndex++);

        if (charIndex > current.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;

        }

    } else {

        typing.textContent = current.substring(0, charIndex--);

        if (charIndex < 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {

                wordIndex = 0;

            }

        }

    }

    setTimeout(typeEffect, deleting ? 70 : 120);

}

typeEffect();

// ==========================
// الوضع الليلي
// ==========================

const themeBtn = document.getElementById("theme-toggle");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    const icon = themeBtn.querySelector("i");

    if (document.body.classList.contains("light-mode")) {

        icon.classList.remove("fa-moon");

        icon.classList.add("fa-sun");

    } else {

        icon.classList.remove("fa-sun");

        icon.classList.add("fa-moon");

    }

});

// ==========================
// تمرير سلس
// ==========================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

console.log("Portfolio Loaded Successfully");
const words = [
    "Front-End Developer",
    "HTML",
    "CSS",
    "JavaScript"
];

let i = 0;
let j = 0;
let current = "";
let isDeleting = false;

function type() {
    current = words[i];

    if (!isDeleting) {
        document.getElementById("typing").textContent =
            current.substring(0, j++);
    } else {
        document.getElementById("typing").textContent =
            current.substring(0, j--);
    }

    if (j === current.length + 1) {
        isDeleting = true;
        setTimeout(type, 1000);
        return;
    }

    if (j === 0) {
        isDeleting = false;
        i = (i + 1) % words.length;
    }

    setTimeout(type, isDeleting ? 70 : 120);
}

type();
