// =====================================
// PORTFOLIO JAVASCRIPT
// Front-End Developer
// =====================================


// =====================================
// الوضع الليلي
// =====================================

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


// =====================================
// ظهور الأقسام عند التمرير
// =====================================

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


document.querySelectorAll("section").forEach((section) => {

    section.classList.add("hidden");

    observer.observe(section);

});


// =====================================
// الرابط النشط في شريط التنقل
// =====================================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");


function updateActiveLink() {

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

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener("scroll", updateActiveLink);

updateActiveLink();


// =====================================
// تأثير شريط التنقل عند التمرير
// =====================================

const header = document.querySelector("header");


window.addEventListener("scroll", () => {

    if (!header) return;


    if (window.scrollY > 50) {

        header.style.background =
            "rgba(9,11,20,.95)";

        header.style.backdropFilter =
            "blur(15px)";

    } else {

        header.style.background =
            "rgba(13,17,23,.90)";

        header.style.backdropFilter =
            "blur(15px)";

    }

});


// =====================================
// حركة بطاقات المهارات
// =====================================

document.querySelectorAll(".skill-card").forEach((card) => {


    card.addEventListener("mouseenter", () => {

        card.style.transform =
            "translateY(-12px) scale(1.03)";

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


// =====================================
// حركة بطاقات المشاريع
// =====================================

document.querySelectorAll(".project-card").forEach((card) => {


    card.addEventListener("mouseenter", () => {

        card.style.transform =
            "translateY(-10px)";

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


// =====================================
// حركة بطاقات التواصل
// =====================================

document.querySelectorAll(".contact-box").forEach((box) => {


    box.addEventListener("mouseenter", () => {

        box.style.transform =
            "translateY(-10px)";

    });


    box.addEventListener("mouseleave", () => {

        box.style.transform = "";

    });

});


// =====================================
// تأثير الكتابة المتحركة
// =====================================
// يعمل فقط إذا أضفنا id="typing"
// إلى عنصر في HTML.
// لذلك لن يسبب أي خطأ حاليًا.

const typing = document.getElementById("typing");


if (typing) {

    const words = [

        "Front-End Developer",
        "HTML Developer",
        "CSS Developer",
        "JavaScript Developer"

    ];


    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;


    function typeEffect() {

        const currentWord =
            words[wordIndex];


        typing.textContent =
            currentWord.substring(
                0,
                charIndex
            );


        if (!deleting) {

            charIndex++;


            if (
                charIndex >
                currentWord.length
            ) {

                deleting = true;

                setTimeout(
                    typeEffect,
                    1200
                );

                return;

            }

        } else {

            charIndex--;


            if (charIndex === 0) {

                deleting = false;

                wordIndex =
                    (wordIndex + 1) %
                    words.length;

            }

        }


        setTimeout(
            typeEffect,
            deleting ? 60 : 120
        );

    }


    typeEffect();

}


// =====================================
// زر التواصل
// =====================================

document.querySelectorAll('a[href="#contact"]').forEach((button) => {

    button.addEventListener("click", () => {

        const contact =
            document.getElementById("contact");


        if (contact) {

            contact.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


// =====================================
// السنة الحالية في Footer
// =====================================

const footerYear =
    document.querySelector("footer p");


if (footerYear) {

    footerYear.innerHTML =
        `© ${new Date().getFullYear()} جميع الحقوق محفوظة | ابتهاج`;

}
