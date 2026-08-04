// القائمة المتجاوبة
const menuBtn = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

// الوضع الليلي
const themeBtn = document.getElementById("theme-toggle");

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");

        const icon = themeBtn.querySelector("i");
        if (icon) {
            if (document.body.classList.contains("light-mode")) {
                icon.className = "fas fa-sun";
            } else {
                icon.className = "fas fa-moon";
            }
        }
    });
}

// ظهور العناصر عند التمرير
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.2
});

sections.forEach(section => {
    observer.observe(section);
});

// تغيير لون شريط التنقل عند النزول
window.addEventListener("scroll", () => {
    const header = document.querySelector("header");

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// تأثير الكتابة
const title = document.querySelector(".hero-text h1");

if (title) {
    const text = title.textContent;
    title.textContent = "";

    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    typeWriter();
}
