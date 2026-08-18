/* =========================================================
   SABIH STORE — MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle = document.getElementById("menu-toggle");
    const mainNav = document.getElementById("main-nav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            mainNav.classList.toggle("open");

            const isOpen = mainNav.classList.contains("open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuToggle.textContent = isOpen ? "×" : "☰";
        });

        mainNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("open");

                menuToggle.textContent = "☰";

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            });

        });
    }


    /* =====================================================
       PRODUCTS
    ===================================================== */

    const products = [
        ...document.querySelectorAll(".product-card")
    ];

    const filterButtons = [
        ...document.querySelectorAll(".filter-pill")
    ];

    const categoryButtons = [
        ...document.querySelectorAll(".category-card")
    ];

    const searchInput =
        document.getElementById("search-input");

    const noResults =
        document.getElementById("no-results");

    let currentFilter = "all";


    function filterProducts(category = currentFilter) {

        currentFilter = category;

        const search =
            searchInput
                ? searchInput.value.trim().toLowerCase()
                : "";

        let visible = 0;

        products.forEach(product => {

            const productCategory =
                product.dataset.category || "";

            const productName =
                product.dataset.name || "";

            const categoryMatch =
                category === "all" ||
                productCategory === category;

            const searchMatch =
                productName
                    .toLowerCase()
                    .includes(search);

            if (categoryMatch && searchMatch) {

                product.style.display = "";

                visible++;

            } else {

                product.style.display = "none";
            }

        });


        /* FILTER BUTTONS */

        filterButtons.forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.filter === category
            );

        });


        /* CATEGORY CARDS */

        categoryButtons.forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.filter === category
            );

        });


        /* NO RESULTS */

        if (noResults) {

            noResults.hidden = visible !== 0;
        }
    }


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterProducts(
                button.dataset.filter
            );

            const productsSection =
                document.getElementById("products");

            if (productsSection) {

                productsSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    categoryButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterProducts(
                button.dataset.filter
            );

            const productsSection =
                document.getElementById("products");

            if (productsSection) {

                productsSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            () => filterProducts(currentFilter)
        );

    }


    /* =====================================================
       CART
    ===================================================== */

    const cartButton =
        document.getElementById("cart-button");

    const cartOverlay =
        document.getElementById("cart");

    const closeCart =
        document.getElementById("close-cart");

    const cartItems =
        document.getElementById("cart-items");

    const cartCount =
        document.getElementById("cart-count");

    const cartTotal =
        document.getElementById("cart-total");

    const checkout =
        document.getElementById("checkout");


    let cart = [];

    try {

        cart =
            JSON.parse(
                localStorage.getItem("sabihCart")
            ) || [];

    } catch {

        cart = [];
    }


    /* =====================================================
       SAVE CART
    ===================================================== */

    function saveCart() {

        localStorage.setItem(
            "sabihCart",
            JSON.stringify(cart)
        );

    }


    /* =====================================================
       CART COUNT
    ===================================================== */

    function getCartCount() {

        return cart.reduce(
            (total, item) =>
                total + Number(item.quantity),
            0
        );

    }


    /* =====================================================
       CART TOTAL
    ===================================================== */

    function getCartTotal() {

        return cart.reduce(
            (total, item) =>
                total +
                Number(item.price) *
                Number(item.quantity),
            0
        );

    }


    /* =====================================================
       RENDER CART
    ===================================================== */

    function renderCart() {

        if (!cartItems) return;


        if (cart.length === 0) {

            cartItems.innerHTML = `
                <div class="empty-cart">

                    <div style="font-size:45px;">
                        🛍️
                    </div>

                    <h3>
                        السلة فارغة
                    </h3>

                    <p>
                        أضيفي بعض المنتجات الجميلة إلى سلتك.
                    </p>

                </div>
            `;

        } else {

            cartItems.innerHTML = cart.map(
                (item, index) => `

                <div class="cart-item">

                    <div>

                        <h4>
                            ${escapeHTML(item.name)}
                        </h4>

                        <p>
                            ${item.price} DH
                        </p>

                        <small>
                            الكمية: ${item.quantity}
                        </small>

                    </div>


                    <div class="cart-actions">

                        <button
                            type="button"
                            class="decrease"
                            data-index="${index}">
                            −
                        </button>

                        <strong>
                            ${item.quantity}
                        </strong>

                        <button
                            type="button"
                            class="increase"
                            data-index="${index}">
                            +
                        </button>

                        <button
                            type="button"
                            class="remove"
                            data-index="${index}">
                            ×
                        </button>

                    </div>

                </div>

            `
            ).join("");

        }


        if (cartCount) {

            cartCount.textContent =
                getCartCount();

        }


        if (cartTotal) {

            cartTotal.textContent =
                `${getCartTotal()} DH`;

        }


        saveCart();
    }


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =====================================================
       ADD TO CART
    ===================================================== */

    document
        .querySelectorAll(".add-cart")
        .forEach(button => {

            button.addEventListener("click", () => {

                const name =
                    button.dataset.name || "منتج";

                const price =
                    Number(button.dataset.price) || 0;


                const existing =
                    cart.find(
                        item => item.name === name
                    );


                if (existing) {

                    existing.quantity++;

                } else {

                    cart.push({
                        name: name,
                        price: price,
                        quantity: 1
                    });

                }


                renderCart();

                showNotification(
                    "تمت إضافة المنتج إلى السلة ✓"
                );

                openCart();

            });

        });


    /* =====================================================
       CART ACTIONS
    ===================================================== */

    if (cartItems) {

        cartItems.addEventListener(
            "click",
            event => {

                const button =
                    event.target.closest("button");

                if (!button) return;


                const index =
                    Number(button.dataset.index);


                if (
                    Number.isNaN(index) ||
                    !cart[index]
                ) {
                    return;
                }


                /* زيادة */

                if (
                    button.classList.contains("increase")
                ) {

                    cart[index].quantity++;

                }


                /* نقصان */

                if (
                    button.classList.contains("decrease")
                ) {

                    cart[index].quantity--;

                    if (
                        cart[index].quantity <= 0
                    ) {

                        cart.splice(index, 1);

                    }

                }


                /* حذف */

                if (
                    button.classList.contains("remove")
                ) {

                    cart.splice(index, 1);

                }


                renderCart();

            }
        );

    }


    /* =====================================================
       OPEN CART
    ===================================================== */

    function openCart() {

        if (!cartOverlay) return;

        /*
           مهم:
           CSS ديالك يستعمل .open
        */

        cartOverlay.classList.add("open");

        cartOverlay.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";
    }


    /* =====================================================
       CLOSE CART
    ===================================================== */

    function closeCartPanel() {

        if (!cartOverlay) return;

        cartOverlay.classList.remove("open");

        cartOverlay.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow = "";
    }


    if (cartButton) {

        cartButton.addEventListener(
            "click",
            openCart
        );

    }


    if (closeCart) {

        closeCart.addEventListener(
            "click",
            closeCartPanel
        );

    }


    if (cartOverlay) {

        cartOverlay.addEventListener(
            "click",
            event => {

                if (
                    event.target === cartOverlay
                ) {

                    closeCartPanel();

                }

            }
        );

    }


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeCartPanel();

            }

        }
    );


    /* =====================================================
       WHATSAPP CHECKOUT
    ===================================================== */

    if (checkout) {

        checkout.addEventListener(
            "click",
            () => {

                if (cart.length === 0) {

                    showNotification(
                        "السلة فارغة، أضيفي منتجًا أولاً."
                    );

                    return;
                }


                let message =
                    "السلام عليكم، أريد الطلب من SABIH STORE\n\n";


                cart.forEach(item => {

                    const subtotal =
                        Number(item.price) *
                        Number(item.quantity);

                    message +=
                        `• ${item.name} × ${item.quantity} — ${subtotal} DH\n`;

                });


                message +=
                    `\nالمجموع: ${getCartTotal()} DH\n\n`;

                message +=
                    "الاسم:\n";

                message +=
                    "المدينة:\n";

                message +=
                    "العنوان:\n";

                message +=
                    "رقم الهاتف:";


                const phone =
                    "212703166572";


                const whatsappURL =
                    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;


                window.open(
                    whatsappURL,
                    "_blank"
                );

            }
        );

    }


    /* =====================================================
       FAVORITES
    ===================================================== */

    const favoriteButtons =
        document.querySelectorAll(".quick");


    let favorites = [];

    try {

        favorites =
            JSON.parse(
                localStorage.getItem(
                    "sabihFavorites"
                )
            ) || [];

    } catch {

        favorites = [];
    }


    favoriteButtons.forEach(button => {

        const card =
            button.closest(".product-card");

        if (!card) return;


        const name =
            card.dataset.name || "";


        if (favorites.includes(name)) {

            button.textContent = "♥";

            button.classList.add("favorite");

        }


        button.addEventListener(
            "click",
            () => {

                if (
                    favorites.includes(name)
                ) {

                    favorites =
                        favorites.filter(
                            item => item !== name
                        );

                    button.textContent = "♡";

                    button.classList.remove(
                        "favorite"
                    );

                    showNotification(
                        "تمت إزالة المنتج من المفضلة"
                    );

                } else {

                    favorites.push(name);

                    button.textContent = "♥";

                    button.classList.add(
                        "favorite"
                    );

                    showNotification(
                        "تمت إضافة المنتج إلى المفضلة ♥"
                    );

                }


                localStorage.setItem(
                    "sabihFavorites",
                    JSON.stringify(favorites)
                );

            }
        );

    });


    /* =====================================================
       NOTIFICATION
    ===================================================== */

    function showNotification(message) {

        const old =
            document.querySelector(
                ".sabih-notification"
            );

        if (old) {
            old.remove();
        }


        const notification =
            document.createElement("div");


        notification.className =
            "sabih-notification";


        notification.textContent =
            message;


        document.body.appendChild(
            notification
        );


        setTimeout(() => {

            notification.classList.add("show");

        }, 20);


        setTimeout(() => {

            notification.classList.remove("show");

            setTimeout(() => {

                notification.remove();

            }, 300);

        }, 2200);

    }


    /* =====================================================
       HEADER SHADOW
    ===================================================== */

    const header =
        document.querySelector(".header");


    window.addEventListener(
        "scroll",
        () => {

            if (!header) return;


            header.classList.toggle(
                "scrolled",
                window.scrollY > 20
            );

        },
        { passive: true }
    );


    /* =====================================================
       REVEAL ANIMATION
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".product-card, .category-card, .about-grid, .contact-cards a"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.08
                }
            );


        revealElements.forEach(element => {

            element.classList.add("reveal");

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    renderCart();

    filterProducts("all");

});
