<script>
// ======================================================
// NAIMA STORE - COMPLETE SHOP SCRIPT
// المنتجات + اللون + المقاس + السلة + WhatsApp + البحث
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // SETTINGS
    // =========================

    const WHATSAPP_NUMBER = "212703166572";
    const STORE_EMAIL = "sbahibtihal@gmail.com";

    let currentLanguage = "ar";
    let cart = JSON.parse(localStorage.getItem("naima_cart") || "[]");

    // =========================
    // GET ELEMENTS SAFELY
    // =========================

    const languageToggle = document.getElementById("language-toggle");
    const searchInput = document.getElementById("search-input");

    const cartButton = document.getElementById("cart-button");
    const cartWindow = document.getElementById("cart");
    const closeCartButton = document.getElementById("close-cart");

    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    const checkoutButton = document.getElementById("checkout");


    // ======================================================
    // ADD EXTRA STYLE FOR PRODUCT OPTIONS
    // ======================================================

    const extraStyle = document.createElement("style");

    extraStyle.textContent = `
    
    .product-options-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,.65);
        z-index: 9999;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }

    .product-options-overlay.active {
        display: flex;
    }

    .product-options-box {
        background: white;
        width: 100%;
        max-width: 550px;
        max-height: 90vh;
        overflow-y: auto;
        border-radius: 24px;
        padding: 28px;
        position: relative;
        box-shadow: 0 25px 80px rgba(0,0,0,.3);
    }

    .product-options-close {
        position: absolute;
        top: 15px;
        left: 15px;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background: #eeeeee;
        font-size: 18px;
        cursor: pointer;
    }

    .product-options-image {
        width: 100%;
        height: 280px;
        object-fit: cover;
        border-radius: 18px;
        background: #f3efff;
        margin-bottom: 20px;
    }

    .product-options-title {
        font-size: 27px;
        font-weight: 900;
        margin-bottom: 8px;
        color: #17152a;
    }

    .product-options-description {
        color: #777;
        margin-bottom: 15px;
    }

    .product-options-price {
        color: #6c4cff;
        font-size: 24px;
        font-weight: 900;
        margin-bottom: 20px;
    }

    .option-title {
        display: block;
        font-weight: 900;
        margin: 18px 0 10px;
    }

    .option-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 9px;
    }

    .option-button {
        background: white;
        border: 2px solid #ddd;
        padding: 10px 17px;
        border-radius: 10px;
        cursor: pointer;
        font-weight: 700;
    }

    .option-button:hover {
        border-color: #6c4cff;
    }

    .option-button.selected {
        background: #6c4cff;
        color: white;
        border-color: #6c4cff;
    }

    .quantity-box {
        display: flex;
        align-items: center;
        gap: 15px;
        margin: 20px 0;
    }

    .quantity-box button {
        width: 38px;
        height: 38px;
        border-radius: 9px;
        background: #eee9ff;
        color: #6c4cff;
        font-size: 20px;
        font-weight: 900;
    }

    .quantity-number {
        min-width: 30px;
        text-align: center;
        font-weight: 900;
    }

    .add-selected-product {
        width: 100%;
        padding: 15px;
        border-radius: 13px;
        background: #6c4cff;
        color: white;
        font-size: 17px;
        font-weight: 900;
        cursor: pointer;
    }

    .add-selected-product:hover {
        background: #5035d2;
    }

    .cart-product-options {
        font-size: 13px;
        color: #777;
        margin-top: 5px;
    }

    `;

    document.head.appendChild(extraStyle);


    // ======================================================
    // PRODUCT OPTIONS WINDOW
    // ======================================================

    const optionsOverlay = document.createElement("div");

    optionsOverlay.className = "product-options-overlay";

    optionsOverlay.innerHTML = `
        <div class="product-options-box">

            <button
                type="button"
                class="product-options-close">
                ✕
            </button>

            <div id="product-options-content"></div>

        </div>
    `;

    document.body.appendChild(optionsOverlay);

    const optionsContent =
        document.getElementById("product-options-content");

    const optionsClose =
        optionsOverlay.querySelector(".product-options-close");


    let selectedProduct = null;
    let selectedColor = "";
    let selectedSize = "";
    let selectedQuantity = 1;


    // ======================================================
    // PRODUCT DATA
    // ======================================================

    function getProductData(card) {

        const name =
            card.getAttribute("data-name") ||
            card.querySelector("h3")?.textContent.trim() ||
            "منتج";

        const price =
            Number(
                card.getAttribute("data-price") ||
                card.querySelector(".product-bottom strong")?.textContent
                    .replace(/[^\d.]/g, "") ||
                0
            );

        const description =
            card.getAttribute("data-description") ||
            card.querySelector("p")?.textContent.trim() ||
            "منتج مميز من NAIMA STORE";

        const image =
            card.getAttribute("data-image") ||
            card.querySelector("img")?.src ||
            "";

        // الألوان
        let colors =
            card.getAttribute("data-colors") ||
            "";

        colors = colors
            ? colors.split(",").map(x => x.trim()).filter(Boolean)
            : ["أسود", "أبيض", "بيج"];


        // المقاسات
        let sizes =
            card.getAttribute("data-sizes") ||
            "";

        sizes = sizes
            ? sizes.split(",").map(x => x.trim()).filter(Boolean)
            : ["S", "M", "L", "XL"];


        return {
            name,
            price,
            description,
            image,
            colors,
            sizes
        };
    }


    // ======================================================
    // OPEN PRODUCT
    // ======================================================

    function openProduct(card) {

        selectedProduct = getProductData(card);

        selectedColor =
            selectedProduct.colors[0] || "موحد";

        selectedSize =
            selectedProduct.sizes[0] || "موحد";

        selectedQuantity = 1;


        optionsContent.innerHTML = `

            ${
                selectedProduct.image
                ?
                `<img
                    class="product-options-image"
                    src="${escapeHTML(selectedProduct.image)}"
                    alt="${escapeHTML(selectedProduct.name)}">`
                :
                ""
            }

            <div class="product-options-title">
                ${escapeHTML(selectedProduct.name)}
            </div>

            <div class="product-options-description">
                ${escapeHTML(selectedProduct.description)}
            </div>

            <div class="product-options-price">
                ${selectedProduct.price} DH
            </div>


            <label class="option-title">
                🎨 ${currentLanguage === "ar" ? "اختاري اللون" : "Choose color"}
            </label>

            <div class="option-buttons" id="color-options">

                ${selectedProduct.colors.map((color, index) => `

                    <button
                        type="button"
                        class="option-button ${index === 0 ? "selected" : ""}"
                        data-color="${escapeHTML(color)}">

                        ${escapeHTML(color)}

                    </button>

                `).join("")}

            </div>


            <label class="option-title">
                📏 ${currentLanguage === "ar" ? "اختاري المقاس" : "Choose size"}
            </label>

            <div class="option-buttons" id="size-options">

                ${selectedProduct.sizes.map((size, index) => `

                    <button
                        type="button"
                        class="option-button ${index === 0 ? "selected" : ""}"
                        data-size="${escapeHTML(size)}">

                        ${escapeHTML(size)}

                    </button>

                `).join("")}

            </div>


            <label class="option-title">
                🔢 ${currentLanguage === "ar" ? "الكمية" : "Quantity"}
            </label>

            <div class="quantity-box">

                <button type="button" id="quantity-minus">
                    −
                </button>

                <span
                    id="quantity-number"
                    class="quantity-number">
                    1
                </span>

                <button type="button" id="quantity-plus">
                    +
                </button>

            </div>


            <button
                type="button"
                class="add-selected-product">

                🛒 ${
                    currentLanguage === "ar"
                    ? "أضف إلى السلة"
                    : "Add to cart"
                }

            </button>
        `;


        // اختيار اللون

        document
            .querySelectorAll("#color-options .option-button")
            .forEach(button => {

                button.addEventListener("click", function () {

                    document
                        .querySelectorAll("#color-options .option-button")
                        .forEach(b =>
                            b.classList.remove("selected")
                        );

                    this.classList.add("selected");

                    selectedColor =
                        this.getAttribute("data-color");

                });

            });


        // اختيار المقاس

        document
            .querySelectorAll("#size-options .option-button")
            .forEach(button => {

                button.addEventListener("click", function () {

                    document
                        .querySelectorAll("#size-options .option-button")
                        .forEach(b =>
                            b.classList.remove("selected")
                        );

                    this.classList.add("selected");

                    selectedSize =
                        this.getAttribute("data-size");

                });

            });


        // نقص الكمية

        document
            .getElementById("quantity-minus")
            .addEventListener("click", function () {

                if (selectedQuantity > 1) {

                    selectedQuantity--;

                    document
                        .getElementById("quantity-number")
                        .textContent = selectedQuantity;

                }

            });


        // زيادة الكمية

        document
            .getElementById("quantity-plus")
            .addEventListener("click", function () {

                selectedQuantity++;

                document
                    .getElementById("quantity-number")
                    .textContent = selectedQuantity;

            });


        // إضافة للسلة

        document
            .querySelector(".add-selected-product")
            .addEventListener("click", function () {

                addProductToCart(
                    selectedProduct,
                    selectedColor,
                    selectedSize,
                    selectedQuantity
                );

                closeProductOptions();

                openCart();

            });


        optionsOverlay.classList.add("active");

    }


    // ======================================================
    // CLOSE PRODUCT
    // ======================================================

    function closeProductOptions() {

        optionsOverlay.classList.remove("active");

    }


    optionsClose.addEventListener(
        "click",
        closeProductOptions
    );


    optionsOverlay.addEventListener("click", function (event) {

        if (event.target === optionsOverlay) {

            closeProductOptions();

        }

    });


    // ======================================================
    // CONNECT ALL PRODUCTS
    // ======================================================

    function connectProducts() {

        const cards =
            document.querySelectorAll(".product-card");


        cards.forEach(function (card) {

            // منع التكرار

            if (card.dataset.naimaConnected === "true") {
                return;
            }

            card.dataset.naimaConnected = "true";


            // الضغط على المنتج

            card.addEventListener("click", function (event) {

                // إذا ضغط على زر أضف للسلة
                // نفتح نافذة الاختيارات

                const clickedButton =
                    event.target.closest(".add-cart");

                if (clickedButton) {

                    event.preventDefault();

                    event.stopPropagation();

                    openProduct(card);

                    return;

                }


                // الضغط على أي مكان في المنتج

                openProduct(card);

            });

        });

    }


    // ======================================================
    // ADD PRODUCT TO CART
    // ======================================================

    function addProductToCart(
        product,
        color,
        size,
        quantity
    ) {

        const existing =
            cart.find(function (item) {

                return (
                    item.name === product.name &&
                    item.color === color &&
                    item.size === size
                );

            });


        if (existing) {

            existing.quantity += quantity;

        } else {

            cart.push({

                name: product.name,

                price: product.price,

                image: product.image,

                color: color,

                size: size,

                quantity: quantity

            });

        }


        saveCart();

        updateCart();


        alert(
            currentLanguage === "ar"
            ? "✅ تمت إضافة المنتج إلى السلة"
            : "✅ Product added to cart"
        );

    }


    // ======================================================
    // OPEN CART
    // ======================================================

    function openCart() {

        if (cartWindow) {

            cartWindow.classList.add("active");

        }

    }


    // ======================================================
    // CLOSE CART
    // ======================================================

    if (cartButton) {

        cartButton.addEventListener("click", function () {

            openCart();

        });

    }


    if (closeCartButton) {

        closeCartButton.addEventListener("click", function () {

            cartWindow.classList.remove("active");

        });

    }


    if (cartWindow) {

        cartWindow.addEventListener("click", function (event) {

            if (event.target === cartWindow) {

                cartWindow.classList.remove("active");

            }

        });

    }


    // ======================================================
    // UPDATE CART
    // ======================================================

    function updateCart() {

        if (!cartItems) {
            return;
        }


        cartItems.innerHTML = "";


        let total = 0;

        let count = 0;


        if (cart.length === 0) {

            const empty =
                document.createElement("p");

            empty.className = "empty-cart";

            empty.textContent =
                currentLanguage === "ar"
                ? "السلة فارغة 🛒"
                : "Your cart is empty 🛒";

            cartItems.appendChild(empty);

        }


        cart.forEach(function (item, index) {

            const itemTotal =
                item.price * item.quantity;


            total += itemTotal;

            count += item.quantity;


            const itemElement =
                document.createElement("div");

            itemElement.className =
                "cart-item";


            itemElement.innerHTML = `

                ${
                    item.image
                    ?
                    `<img
                        src="${escapeHTML(item.image)}"
                        style="
                            width:65px;
                            height:65px;
                            object-fit:cover;
                            border-radius:10px;
                        "
                    >`
                    :
                    ""
                }

                <div class="cart-item-info">

                    <h4>
                        ${escapeHTML(item.name)}
                    </h4>

                    <p>
                        ${item.price} DH × ${item.quantity}
                    </p>

                    <div class="cart-product-options">

                        🎨 ${escapeHTML(item.color)}
                        <br>
                        📏 ${escapeHTML(item.size)}

                    </div>

                </div>


                <div class="cart-item-actions">

                    <button
                        type="button"
                        onclick="window.naimaChangeQuantity(${index}, 1)">
                        +
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        type="button"
                        onclick="window.naimaChangeQuantity(${index}, -1)">
                        −
                    </button>

                    <button
                        type="button"
                        class="remove-item"
                        onclick="window.naimaRemoveFromCart(${index})">

                        🗑️

                    </button>

                </div>

            `;


            cartItems.appendChild(itemElement);

        });


        if (cartCount) {

            cartCount.textContent = count;

        }


        if (cartTotal) {

            cartTotal.textContent =
                total.toLocaleString("fr-MA") + " DH";

        }

    }


    // ======================================================
    // CHANGE QUANTITY
    // ======================================================

    window.naimaChangeQuantity =
        function (index, amount) {

            if (!cart[index]) {
                return;
            }


            cart[index].quantity += amount;


            if (cart[index].quantity <= 0) {

                cart.splice(index, 1);

            }


            saveCart();

            updateCart();

        };


    // ======================================================
    // REMOVE
    // ======================================================

    window.naimaRemoveFromCart =
        function (index) {

            cart.splice(index, 1);

            saveCart();

            updateCart();

        };


    // ======================================================
    // SAVE CART
    // ======================================================

    function saveCart() {

        localStorage.setItem(
            "naima_cart",
            JSON.stringify(cart)
        );

    }


    // ======================================================
    // WHATSAPP CHECKOUT
    // ======================================================

    if (checkoutButton) {

        checkoutButton.addEventListener("click", function () {

            if (cart.length === 0) {

                alert(
                    currentLanguage === "ar"
                    ? "السلة فارغة. أضيفي منتجاً أولاً."
                    : "Your cart is empty."
                );

                return;

            }


            let message =
                currentLanguage === "ar"
                ?
                "السلام عليكم، أريد طلب المنتجات التالية:\n\n"
                :
                "Hello, I would like to order:\n\n";


            let total = 0;


            cart.forEach(function (item) {

                const itemTotal =
                    item.price * item.quantity;


                total += itemTotal;


                message +=
                    "• " +
                    item.name +
                    "\n" +

                    "  اللون: " +
                    item.color +
                    "\n" +

                    "  المقاس: " +
                    item.size +
                    "\n" +

                    "  الكمية: " +
                    item.quantity +
                    "\n" +

                    "  السعر: " +
                    itemTotal +
                    " DH\n\n";

            });


            message +=
                "--------------------\n" +

                (
                    currentLanguage === "ar"
                    ? "المجموع: "
                    : "Total: "
                ) +

                total +

                " DH\n\n" +

                (
                    currentLanguage === "ar"
                    ? "طريقة الدفع: الدفع عند الاستلام"
                    : "Payment: Cash on delivery"
                );


            const whatsappURL =
                "https://wa.me/" +
                WHATSAPP_NUMBER +
                "?text=" +
                encodeURIComponent(message);


            window.open(
                whatsappURL,
                "_blank"
            );

        });

    }


    // ======================================================
    // SEARCH
    // ======================================================

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                const searchText =
                    searchInput.value
                        .toLowerCase()
                        .trim();


                const products =
                    document.querySelectorAll(
                        ".product-card"
                    );


                products.forEach(function (product) {

                    const productName =
                        (
                            product.getAttribute(
                                "data-name"
                            ) ||
                            product.textContent
                        ).toLowerCase();


                    const productText =
                        product.textContent.toLowerCase();


                    if (
                        productName.includes(searchText) ||
                        productText.includes(searchText)
                    ) {

                        product.style.display = "";

                    } else {

                        product.style.display = "none";

                    }

                });

            }
        );

    }


    // ======================================================
    // LANGUAGE
    // ======================================================

    if (languageToggle) {

        languageToggle.addEventListener(
            "click",
            function () {

                if (currentLanguage === "ar") {

                    currentLanguage = "en";

                    document.documentElement.lang = "en";

                    document.documentElement.dir = "ltr";

                    languageToggle.textContent = "AR";

                } else {

                    currentLanguage = "ar";

                    document.documentElement.lang = "ar";

                    document.documentElement.dir = "rtl";

                    languageToggle.textContent = "EN";

                }


                document
                    .querySelectorAll("[data-ar]")
                    .forEach(function (element) {

                        if (currentLanguage === "ar") {

                            element.textContent =
                                element.getAttribute(
                                    "data-ar"
                                );

                        } else {

                            element.textContent =
                                element.getAttribute(
                                    "data-en"
                                );

                        }

                    });


                updateSearchPlaceholder();

                updateCart();

            }
        );

    }


    // ======================================================
    // SEARCH PLACEHOLDER
    // ======================================================

    function updateSearchPlaceholder() {

        if (!searchInput) {
            return;
        }


        searchInput.placeholder =
            currentLanguage === "ar"
            ?
            "🔎 ابحثي عن منتج..."
            :
            "🔎 Search for a product...";

    }


    // ======================================================
    // ESCAPE HTML
    // ======================================================

    function escapeHTML(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    // ======================================================
    // INITIALIZE
    // ======================================================

    connectProducts();

    updateCart();

    updateSearchPlaceholder();


    console.log(
        "✅ NAIMA STORE JavaScript يعمل بنجاح"
    );

});
</script>
<div class="product-card"
     data-name="فستان أنيق"
     data-price="250"
     data-colors="أسود, أبيض, أحمر"
     data-sizes="S, M, L, XL"
     data-description="فستان أنيق مناسب للمناسبات"
     data-image="https://placehold.co/600x600">

    <div class="product-image">
        👗
    </div>

    <div class="product-info">

        <span class="product-badge">
            جديد
        </span>

        <h3>فستان أنيق</h3>

        <p>
            فستان أنيق ومريح بتصميم عصري.
        </p>

        <div class="product-bottom">

            <strong>
                250 DH
            </strong>

            <button
                type="button"
                class="add-cart">

                🛒 أضيفي للسلة

            </button>

        </div>

    </div>

</div>
<div class="product-card"
     data-name="حذاء رياضي"
     data-price="350"
     data-colors="أسود, أبيض, وردي"
     data-sizes="36, 37, 38, 39, 40, 41"
     data-description="حذاء رياضي مريح للاستعمال اليومي"
     data-image="https://placehold.co/600x600">

    <div class="product-image">
        👟
    </div>

    <div class="product-info">

        <span class="product-badge">
            عرض
        </span>

        <h3>حذاء رياضي</h3>

        <p>
            حذاء رياضي مريح وعصري.
        </p>

        <div class="product-bottom">

            <strong>
                350 DH
            </strong>

            <button
                type="button"
                class="add-cart">

                🛒 أضيفي للسلة

            </button>

        </div>

    </div>

</div>
