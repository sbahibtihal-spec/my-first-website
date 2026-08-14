/* =========================================
   NAIMA STORE - SCRIPT.JS
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       CART
    ========================================= */

    let cart = JSON.parse(localStorage.getItem("naimaCart")) || [];

    const cartButton = document.getElementById("cart-button");
    const cartElement = document.getElementById("cart");
    const closeCart = document.getElementById("close-cart");
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");
    const checkoutButton = document.getElementById("checkout");


    /* =========================================
       ADD PRODUCT TO CART
    ========================================= */

    const addButtons = document.querySelectorAll(".add-cart");

    addButtons.forEach(button => {

        button.addEventListener("click", () => {

            const name = button.dataset.name;
            const price = Number(button.dataset.price);

            const existingProduct = cart.find(
                product => product.name === name
            );

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

            showNotification("تمت إضافة المنتج إلى السلة 🛒");

        });

    });


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
       UPDATE CART
    ========================================= */

    function updateCart() {

        if (!cartItems) return;

        cartItems.innerHTML = "";

        if (cart.length === 0) {

            cartItems.innerHTML = `
                <p class="empty-cart">
                    السلة فارغة 🛒
                </p>
            `;

            if (cartCount) {
                cartCount.textContent = "0";
            }

            if (cartTotal) {
                cartTotal.textContent = "0";
            }

            return;
        }


        let total = 0;
        let quantityTotal = 0;


        cart.forEach((product, index) => {

            const productTotal =
                product.price * product.quantity;

            total += productTotal;
            quantityTotal += product.quantity;


            const item = document.createElement("div");

            item.className = "cart-item";


            item.innerHTML = `

                <div class="cart-item-info">

                    <h4>
                        ${product.name}
                    </h4>

                    <p>
                        ${product.price} DH
                    </p>

                </div>


                <div class="cart-item-actions">

                    <button
                        class="minus-btn"
                        data-index="${index}">
                        −
                    </button>


                    <span>
                        ${product.quantity}
                    </span>


                    <button
                        class="plus-btn"
                        data-index="${index}">
                        +
                    </button>


                    <button
                        class="remove-item"
                        data-index="${index}">
                        🗑️
                    </button>

                </div>

            `;


            cartItems.appendChild(item);

        });


        if (cartCount) {
            cartCount.textContent = quantityTotal;
        }

        if (cartTotal) {
            cartTotal.textContent = total + " DH";
        }


        /* =========================================
           PLUS
        ========================================= */

        document.querySelectorAll(".plus-btn").forEach(button => {

            button.addEventListener("click", () => {

                const index = Number(button.dataset.index);

                cart[index].quantity++;

                saveCart();
                updateCart();

            });

        });


        /* =========================================
           MINUS
        ========================================= */

        document.querySelectorAll(".minus-btn").forEach(button => {

            button.addEventListener("click", () => {

                const index = Number(button.dataset.index);

                if (cart[index].quantity > 1) {

                    cart[index].quantity--;

                } else {

                    cart.splice(index, 1);

                }

                saveCart();
                updateCart();

            });

        });


        /* =========================================
           REMOVE
        ========================================= */

        document.querySelectorAll(".remove-item").forEach(button => {

            button.addEventListener("click", () => {

                const index = Number(button.dataset.index);

                cart.splice(index, 1);

                saveCart();
                updateCart();

            });

        });

    }


    /* =========================================
       OPEN CART
    ========================================= */

    if (cartButton) {

        cartButton.addEventListener("click", () => {

            if (cartElement) {
                cartElement.classList.add("active");
            }

        });

    }


    /* =========================================
       CLOSE CART
    ========================================= */

    if (closeCart) {

        closeCart.addEventListener("click", () => {

            if (cartElement) {
                cartElement.classList.remove("active");
            }

        });

    }


    /* =========================================
       CLICK OUTSIDE CART
    ========================================= */

    if (cartElement) {

        cartElement.addEventListener("click", (event) => {

            if (event.target === cartElement) {

                cartElement.classList.remove("active");

            }

        });

    }


    /* =========================================
       CHECKOUT VIA WHATSAPP
    ========================================= */

    if (checkoutButton) {

        checkoutButton.addEventListener("click", () => {

            if (cart.length === 0) {

                alert(
                    "السلة فارغة. أضيفي منتجًا أولاً 🛒"
                );

                return;
            }


            let message =
                "🛍️ *طلب جديد من NAIMA STORE*%0A%0A";


            let total = 0;


            cart.forEach(product => {

                const productTotal =
                    product.price * product.quantity;

                total += productTotal;


                message +=
                    `📦 ${product.name}%0A` +
                    `الكمية: ${product.quantity}%0A` +
                    `الثمن: ${product.price} DH%0A` +
                    `المجموع: ${productTotal} DH%0A%0A`;

            });


            message +=
                `💰 *المجموع النهائي: ${total} DH*%0A%0A` +
                `مرحبًا، أريد تأكيد هذا الطلب.`;


            /* رقم WhatsApp الخاص بك */
            const phoneNumber = "212703166572";


            const whatsappURL =
                `https://wa.me/${phoneNumber}?text=${message}`;


            window.open(
                whatsappURL,
                "_blank"
            );

        });

    }


    /* =========================================
       SEARCH PRODUCTS
    ========================================= */

    const searchInput =
        document.getElementById("search-input");


    if (searchInput) {

        searchInput.addEventListener("input", () => {

            const search =
                searchInput.value
                    .toLowerCase()
                    .trim();


            const products =
                document.querySelectorAll(".product-card");


            products.forEach(product => {

                const name =
                    product.dataset.name ||
                    product.querySelector("h3")?.textContent ||
                    "";


                if (
                    name
                        .toLowerCase()
                        .includes(search)
                ) {

                    product.style.display = "";

                } else {

                    product.style.display = "none";

                }

            });

        });

    }


    /* =========================================
       NOTIFICATION
    ========================================= */

    function showNotification(message) {

        const notification =
            document.createElement("div");


        notification.className =
            "store-notification";


        notification.textContent =
            message;


        notification.style.position = "fixed";
        notification.style.bottom = "25px";
        notification.style.right = "25px";
        notification.style.background = "#6c4cff";
        notification.style.color = "#fff";
        notification.style.padding = "14px 20px";
        notification.style.borderRadius = "12px";
        notification.style.zIndex = "9999";
        notification.style.fontWeight = "bold";
        notification.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.2)";


        document.body.appendChild(
            notification
        );


        setTimeout(() => {

            notification.remove();

        }, 2500);

    }


    /* =========================================
       LANGUAGE SWITCH
       Works with data-ar / data-en
    ========================================= */

    let currentLanguage =
        localStorage.getItem("naimaLanguage") || "ar";


    const languageButton =
        document.getElementById("language-toggle");


    function changeLanguage(language) {

        currentLanguage = language;


        document.documentElement.lang =
            language;


        document.documentElement.dir =
            language === "ar" ? "rtl" : "ltr";


        const elements =
            document.querySelectorAll(
                "[data-ar][data-en]"
            );


        elements.forEach(element => {

            element.textContent =
                element.getAttribute(
                    `data-${language}`
                );

        });


        if (languageButton) {

            languageButton.textContent =
                language === "ar" ? "EN" : "AR";

        }


        localStorage.setItem(
            "naimaLanguage",
            language
        );

    }


    if (languageButton) {

        languageButton.addEventListener(
            "click",
            () => {

                const newLanguage =
                    currentLanguage === "ar"
                        ? "en"
                        : "ar";


                changeLanguage(
                    newLanguage
                );

            }
        );

    }


    /* =========================================
       INITIALIZE
    ========================================= */

    updateCart();

    changeLanguage(currentLanguage);


});
