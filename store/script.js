/* =========================================
   NAIMA STORE - SCRIPT.JS
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       VARIABLES
    ========================================= */

    let cart = JSON.parse(localStorage.getItem("naimaCart")) || [];

    let currentLanguage =
        localStorage.getItem("naimaLanguage") || "ar";


    /* =========================================
       ELEMENTS
    ========================================= */

    const cartButton = document.getElementById("cart-button");
    const cartElement = document.getElementById("cart");
    const closeCartButton = document.getElementById("close-cart");

    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    const checkoutButton = document.getElementById("checkout");

    const addCartButtons =
        document.querySelectorAll(".add-cart");


    /* =========================================
       TRANSLATIONS
    ========================================= */

    const translations = {

        ar: {

            home: "الرئيسية",
            products: "المنتجات",
            about: "من نحن",
            contact: "تواصل معنا",

            welcome: "مرحباً بك في متجر NAIMA",
            discover: "اكتشفي منتجاتنا المميزة واختاري ما يناسبك بسهولة.",
            browse: "تصفح المنتجات",

            productsTitle: "منتجاتنا",

            aboutTitle: "من نحن؟",

            aboutText:
                "NAIMA STORE هو متجر إلكتروني حديث يهدف إلى تقديم منتجات مميزة وتجربة تسوق سهلة وسريعة للعملاء داخل وخارج المغرب.",

            contactTitle: "تواصل معنا",

            email: "البريد الإلكتروني",
            phone: "الهاتف",
            facebook: "فيسبوك",

            cart: "السلة",
            cartTitle: "سلة المشتريات",

            emptyCart: "السلة فارغة",

            total: "المجموع",

            addCart: "أضف إلى السلة 🛒",

            checkout: "إتمام الطلب",

            orderMessage:
                "مرحباً، أريد طلب المنتجات التالية:",

            success:
                "تم إرسال طلبك بنجاح. سنتواصل معك قريباً.",

            quantity: "الكمية",

            remove: "حذف",

            currency: "درهم"

        },

        en: {

            home: "Home",
            products: "Products",
            about: "About Us",
            contact: "Contact",

            welcome: "Welcome to NAIMA STORE",
            discover:
                "Discover our featured products and choose what suits you easily.",

            browse: "Shop Now",

            productsTitle: "Our Products",

            aboutTitle: "About Us",

            aboutText:
                "NAIMA STORE is a modern online store offering selected products and a simple shopping experience for customers in Morocco and worldwide.",

            contactTitle: "Contact Us",

            email: "Email",
            phone: "Phone",
            facebook: "Facebook",

            cart: "Cart",
            cartTitle: "Shopping Cart",

            emptyCart: "Your cart is empty",

            total: "Total",

            addCart: "Add to Cart 🛒",

            checkout: "Checkout",

            orderMessage:
                "Hello, I would like to order the following products:",

            success:
                "Your order has been prepared successfully. We will contact you soon.",

            quantity: "Quantity",

            remove: "Remove",

            currency: "MAD"

        }

    };


    /* =========================================
       LANGUAGE SYSTEM
    ========================================= */

    function changeLanguage(language) {

        currentLanguage = language;

        localStorage.setItem(
            "naimaLanguage",
            language
        );

        document.documentElement.lang = language;

        document.documentElement.dir =
            language === "ar" ? "rtl" : "ltr";


        /* Navigation */

        const navLinks =
            document.querySelectorAll("nav a");

        if (navLinks.length >= 4) {

            navLinks[0].textContent =
                translations[language].home;

            navLinks[1].textContent =
                translations[language].products;

            navLinks[2].textContent =
                translations[language].about;

            navLinks[3].textContent =
                translations[language].contact;
        }


        /* Cart button */

        if (cartButton) {

            cartButton.innerHTML =
                `🛒 ${translations[language].cart}
                 <span id="cart-count">${cart.length}</span>`;
        }


        /* Hero */

        const heroTitle =
            document.querySelector("#home h2");

        const heroText =
            document.querySelector("#home p");

        const heroButton =
            document.querySelector("#home .hero-button");


        if (heroTitle) {

            heroTitle.textContent =
                translations[language].welcome;
        }


        if (heroText) {

            heroText.textContent =
                translations[language].discover;
        }


        if (heroButton) {

            heroButton.textContent =
                translations[language].browse;
        }


        /* Products title */

        const productTitle =
            document.querySelector("#products .section-title");

        if (productTitle) {

            productTitle.textContent =
                translations[language].productsTitle;
        }


        /* About */

        const aboutTitle =
            document.querySelector("#about .section-title");

        const aboutText =
            document.querySelector("#about p");


        if (aboutTitle) {

            aboutTitle.textContent =
                translations[language].aboutTitle;
        }


        if (aboutText) {

            aboutText.textContent =
                translations[language].aboutText;
        }


        /* Contact */

        const contactTitle =
            document.querySelector("#contact .section-title");

        if (contactTitle) {

            contactTitle.textContent =
                translations[language].contactTitle;
        }


        updateAddButtons();

        updateCart();

    }


    /* =========================================
       ADD TO CART
    ========================================= */

    addCartButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const name =
                button.dataset.name;

            const price =
                Number(button.dataset.price);


            const existingProduct =
                cart.find(function (item) {

                    return item.name === name;

                });


            if (existingProduct) {

                existingProduct.quantity++;

            } else {

                cart.push({

                    name: name,

                    price: price,

                    quantity: 1

                });

            }


            saveCart();

            updateCart();

            showNotification(
                currentLanguage === "ar"
                    ? "تمت إضافة المنتج إلى السلة 🛒"
                    : "Product added to cart 🛒"
            );

        });

    });


    /* =========================================
       UPDATE CART
    ========================================= */

    function updateCart() {

        if (!cartItems) return;


        if (cart.length === 0) {

            cartItems.innerHTML =
                `<p>${translations[currentLanguage].emptyCart}</p>`;

            updateCartCount();

            if (cartTotal) {

                cartTotal.textContent = "0";

            }

            return;
        }


        cartItems.innerHTML = "";


        let total = 0;


        cart.forEach(function (item, index) {

            const itemTotal =
                item.price * item.quantity;

            total += itemTotal;


            const itemElement =
                document.createElement("div");

            itemElement.className =
                "cart-item";


            itemElement.innerHTML = `

                <div>

                    <strong>
                        ${item.name}
                    </strong>

                    <p>
                        ${item.price}
                        ${translations[currentLanguage].currency}
                    </p>

                </div>


                <div class="cart-item-actions">

                    <button
                        onclick="decreaseQuantity(${index})">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="increaseQuantity(${index})">
                        +
                    </button>

                    <button
                        class="remove-item"
                        onclick="removeFromCart(${index})">
                        🗑️
                    </button>

                </div>

            `;


            cartItems.appendChild(itemElement);

        });


        if (cartTotal) {

            cartTotal.textContent =
                total.toLocaleString();

        }


        updateCartCount();

    }


    /* =========================================
       CART COUNT
    ========================================= */

    function updateCartCount() {

        const count =
            cart.reduce(function (sum, item) {

                return sum + item.quantity;

            }, 0);


        if (cartCount) {

            cartCount.textContent =
                count;

        }

    }


    /* =========================================
       INCREASE QUANTITY
    ========================================= */

    window.increaseQuantity = function (index) {

        cart[index].quantity++;

        saveCart();

        updateCart();

    };


    /* =========================================
       DECREASE QUANTITY
    ========================================= */

    window.decreaseQuantity = function (index) {

        if (cart[index].quantity > 1) {

            cart[index].quantity--;

        } else {

            cart.splice(index, 1);

        }


        saveCart();

        updateCart();

    };


    /* =========================================
       REMOVE PRODUCT
    ========================================= */

    window.removeFromCart = function (index) {

        cart.splice(index, 1);

        saveCart();

        updateCart();

    };


    /* =========================================
       SAVE CART
    ========================================= */

    function saveCart() {

        localStorage.setItem(
            "naimaCart",
            JSON.stringify(cart)
        );

    }


    /* =========================================
       OPEN CART
    ========================================= */

    if (cartButton) {

        cartButton.addEventListener("click", function () {

            if (cartElement) {

                cartElement.classList.add("active");

            }

        });

    }


    /* =========================================
       CLOSE CART
    ========================================= */

    if (closeCartButton) {

        closeCartButton.addEventListener(
            "click",
            function () {

                if (cartElement) {

                    cartElement.classList.remove("active");

                }

            }
        );

    }


    /* =========================================
       CLICK OUTSIDE CART
    ========================================= */

    if (cartElement) {

        cartElement.addEventListener(
            "click",
            function (event) {

                if (event.target === cartElement) {

                    cartElement.classList.remove(
                        "active"
                    );

                }

            }
        );

    }


    /* =========================================
       CHECKOUT
    ========================================= */

    if (checkoutButton) {

        checkoutButton.addEventListener(
            "click",
            function () {

                if (cart.length === 0) {

                    showNotification(
                        currentLanguage === "ar"
                            ? "السلة فارغة"
                            : "Your cart is empty"
                    );

                    return;
                }


                let message =
                    translations[currentLanguage]
                        .orderMessage
                    + "\n\n";


                let total = 0;


                cart.forEach(function (item) {

                    const itemTotal =
                        item.price *
                        item.quantity;


                    total += itemTotal;


                    message +=
                        `• ${item.name} × ${item.quantity} = ${itemTotal} ${translations[currentLanguage].currency}\n`;

                });


                message +=
                    `\n${translations[currentLanguage].total}: ${total} ${translations[currentLanguage].currency}`;


                /*
                    WhatsApp
                    رقم المتجر:
                    212703166572
                */

                const whatsappNumber =
                    "212703166572";


                const whatsappURL =
                    "https://wa.me/" +
                    whatsappNumber +
                    "?text=" +
                    encodeURIComponent(message);


                window.open(
                    whatsappURL,
                    "_blank"
                );

            }
        );

    }


    /* =========================================
       SEARCH PRODUCTS
    ========================================= */

    window.searchProducts = function () {

        const searchInput =
            document.getElementById(
                "search-input"
            );


        if (!searchInput) return;


        const search =
            searchInput.value
                .toLowerCase()
                .trim();


        const products =
            document.querySelectorAll(
                ".product-card"
            );


        products.forEach(function (product) {

            const name =
                product.dataset.name ||
                product.querySelector("h3")?.textContent ||
                "";


            if (
                name
                    .toLowerCase()
                    .includes(search)
            ) {

                product.style.display =
                    "";

            } else {

                product.style.display =
                    "none";

            }

        });

    };


    /* =========================================
       UPDATE ADD BUTTONS LANGUAGE
    ========================================= */

    function updateAddButtons() {

        const buttons =
            document.querySelectorAll(
                ".add-cart"
            );


        buttons.forEach(function (button) {

            button.textContent =
                translations[currentLanguage]
                    .addCart;

        });

    }


    /* =========================================
       NOTIFICATION
    ========================================= */

    function showNotification(message) {

        const notification =
            document.createElement("div");


        notification.textContent =
            message;


        notification.style.position =
            "fixed";

        notification.style.bottom =
            "25px";

        notification.style.left =
            "50%";

        notification.style.transform =
            "translateX(-50%)";

        notification.style.background =
            "#6c4cff";

        notification.style.color =
            "#fff";

        notification.style.padding =
            "14px 24px";

        notification.style.borderRadius =
            "12px";

        notification.style.zIndex =
            "9999";

        notification.style.fontWeight =
            "bold";


        document.body.appendChild(
            notification
        );


        setTimeout(function () {

            notification.remove();

        }, 2500);

    }


    /* =========================================
       LANGUAGE BUTTON
    ========================================= */

    const languageButton =
        document.createElement("button");


    languageButton.id =
        "language-button";


    languageButton.textContent =
        currentLanguage === "ar"
            ? "EN"
            : "AR";


    languageButton.style.position =
        "fixed";

    languageButton.style.bottom =
        "25px";

    languageButton.style.right =
        "25px";

    languageButton.style.zIndex =
        "9999";

    languageButton.style.border =
        "none";

    languageButton.style.background =
        "#6c4cff";

    languageButton.style.color =
        "white";

    languageButton.style.padding =
        "12px 18px";

    languageButton.style.borderRadius =
        "10px";

    languageButton.style.cursor =
        "pointer";

    languageButton.style.fontWeight =
        "bold";


    document.body.appendChild(
        languageButton
    );


    languageButton.addEventListener(
        "click",
        function () {

            const newLanguage =
                currentLanguage === "ar"
                    ? "en"
                    : "ar";


            changeLanguage(
                newLanguage
            );


            languageButton.textContent =
                newLanguage === "ar"
                    ? "EN"
                    : "AR";

        }
    );


    /* =========================================
       INITIALIZE
    ========================================= */

    updateCart();

    changeLanguage(
        currentLanguage
    );

});
