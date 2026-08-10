// ===============================
// تغيير اللغة العربية / الإنجليزية
// ===============================

const languageToggle = document.getElementById("language-toggle");
const html = document.getElementById("html");

let currentLanguage = "ar";

function changeLanguage() {

    const elements = document.querySelectorAll("[data-ar][data-en]");

    elements.forEach(function (element) {

        if (currentLanguage === "ar") {
            element.textContent = element.getAttribute("data-en");
        } else {
            element.textContent = element.getAttribute("data-ar");
        }

    });

    if (currentLanguage === "ar") {

        currentLanguage = "en";

        html.setAttribute("lang", "en");
        html.setAttribute("dir", "ltr");

        languageToggle.textContent = "AR";

    } else {

        currentLanguage = "ar";

        html.setAttribute("lang", "ar");
        html.setAttribute("dir", "rtl");

        languageToggle.textContent = "EN";
    }
}


// تشغيل زر اللغة
if (languageToggle) {

    languageToggle.addEventListener("click", changeLanguage);

}
