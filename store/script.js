// ======================================================
// NAIMA STORE - PROFESSIONAL JAVASCRIPT
// ======================================================

"use strict";

// ======================================================
// إعدادات المتجر
// ======================================================

const WHATSAPP_NUMBER = "212703166572";
const STORE_NAME = "NAIMA STORE";

// ======================================================
// المنتجات
// ======================================================

const products = [
    {
        id: 1,
        name: "حقيبة نسائية أنيقة",
        category: "الحقائب",
        price: 250,
        image: "https://placehold.co/800x800/f0e8ff/4c1d95?text=Bag",
        description: "حقيبة نسائية أنيقة وعملية للاستعمال اليومي.",
        colors: ["أسود", "بني", "بيج"],
        sizes: ["صغير", "متوسط", "كبير"]
    },

    {
        id: 2,
        name: "حذاء رياضي مريح",
        category: "الأحذية",
        price: 350,
        image: "https://placehold.co/800x800/e0f2fe/075985?text=Shoes",
        description: "حذاء رياضي مريح بتصميم عصري.",
        colors: ["أسود", "أبيض", "وردي"],
        sizes: ["36", "37", "38", "39", "40", "41"]
    },

    {
        id: 3,
        name: "ساعة ذكية",
        category: "الإكسسوارات",
        price: 399,
        image: "https://placehold.co/800x800/fef3c7/92400e?text=Watch",
        description: "ساعة أنيقة مناسبة للاستعمال اليومي.",
        colors: ["أسود", "فضي", "وردي"],
        sizes: ["موحد"]
    },

    {
        id: 4,
        name: "نظارات شمسية عصرية",
        category: "الإكسسوارات",
        price: 180,
        image: "https://placehold.co/800x800/dcfce7/166534?text=Glasses",
        description: "نظارات عصرية وأنيقة.",
        colors: ["أسود", "بني"],
        sizes: ["موحد"]
    },

    {
        id: 5,
        name: "فستان نسائي أنيق",
        category: "الملابس",
        price: 320,
        image: "https://placehold.co/800x800/fce7f3/9d174d?text=Dress",
        description: "فستان أنيق مناسب للمناسبات والاستعمال اليومي.",
        colors: ["أسود", "أحمر", "بيج"],
        sizes: ["S", "M", "L", "XL"]
    },

    {
        id: 6,
        name: "قميص نسائي",
        category: "الملابس",
        price: 190,
        image: "https://placehold.co/800x800/e0e7ff/3730a3?text=Shirt",
        description: "قميص أنيق بتصميم عصري.",
        colors: ["أبيض", "أسود", "أزرق"],
        sizes: ["S", "M", "L", "XL"]
    }
];


// ======================================================
// السلة
// ======================================================

let cart = JSON.parse(localStorage.getItem("naimaCart")) || [];


// ======================================================
// عناصر الصفحة
// ======================================================

const productsContainer =
    document.getElementById("products");

const cartWindow =
    document.getElementById("cart");

const cartItems =
    document.getElementById("cart-items");

const cartCount =
    document.getElementById("cart-count");

const cartTotal =
    document.getElementById("cart-total");

const cartButton =
    document.getElementById("cart-button");

const closeCartButton =
    document.getElementById("close-cart");

const checkoutButton =
    document.getElementById("checkout");

const searchInput =
    document.getElementById("search-input");


// ======================================================
// حفظ السلة
// ======================================================

function saveCart() {

    localStorage.setItem(
        "naimaCart",
        JSON.stringify(cart)
    );

}


// ======================================================
// عرض المنتجات
// ======================================================

function renderProducts(list = products) {

    if (!productsContainer) return;

    productsContainer.innerHTML = "";

    if (list.length === 0) {

        productsContainer.innerHTML = `
            <div style="
                grid-column:1/-1;
                text-align:center;
                padding:50px;
                font-size:20px;
            ">
                لا توجد منتجات
            </div>
        `;

        return;
    }


    list.forEach(product => {

        const card =
            document.createElement("article");

        card.className = "product-card";

        card.setAttribute(
            "data-name",
            product.name
        );


        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    style="
                        width:100%;
                        height:100%;
                        object-fit:cover;
                    "
                >

            </div>


            <div class="product-info">

                <span class="product-badge">
                    ${product.category}
                </span>


                <h3>
                    ${product.name}
                </h3>


                <p>
                    ${product.description}
                </p>


                <div class="product-bottom">

                    <strong>
                        ${product.price} DH
                    </strong>


                    <button
                        class="add-cart"
                        type="button"
                        onclick="openProduct(${product.id})"
                    >
                        🛒 أضف إلى السلة
                    </button>

                </div>

            </div>

        `;


        productsContainer.appendChild(card);

    });

}


// ======================================================
// فتح تفاصيل المنتج
// ======================================================

function openProduct(id) {

    const product =
        products.find(p => p.id === id);

    if (!product) return;


    let color =
        product.colors.length > 0
            ? product.colors[0]
            : "موحد";


    let size =
        product.sizes.length > 0
            ? product.sizes[0]
            : "موحد";


    const overlay =
        document.createElement("div");

    overlay.id = "product-modal";

    overlay.style.cssText = `
        position:fixed;
        inset:0;
        background:rgba(0,0,0,.65);
        z-index:9999;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:20px;
    `;


    overlay.innerHTML = `

        <div style="
            background:white;
            width:min(900px,100%);
            max-height:90vh;
            overflow:auto;
            border-radius:24px;
            padding:25px;
            position:relative;
        ">

            <button
                id="close-product"
                style="
                    position:absolute;
                    top:15px;
                    left:15px;
                    width:40px;
                    height:40px;
                    border-radius:50%;
                    background:#eee;
                    cursor:pointer;
                    font-size:18px;
                "
            >
                ✕
            </button>


            <div style="
                display:grid;
                grid-template-columns:1fr 1fr;
                gap:30px;
            ">


                <div>

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        style="
                            width:100%;
                            height:400px;
                            object-fit:cover;
                            border-radius:20px;
                        "
                    >

                </div>


                <div>

                    <h2>
                        ${product.name}
                    </h2>


                    <p style="color:#666">
                        ${product.description}
                    </p>


                    <h2 style="color:#6c4cff">
                        ${product.price} DH
                    </h2>


                    <!-- اللون -->

                    <div style="margin-top:25px">

                        <strong>
                            اللون:
                        </strong>

                        <div
                            id="color-options"
                            style="
                                display:flex;
                                flex-wrap:wrap;
                                gap:8px;
                                margin-top:10px;
                            "
                        >

                            ${product.colors.map((c, index) => `

                                <button
                                    type="button"
                                    class="option-color"
                                    data-value="${c}"
                                    style="
                                        padding:10px 16px;
                                        border:1px solid #ddd;
                                        border-radius:10px;
                                        background:${index === 0 ? "#6c4cff" : "white"};
                                        color:${index === 0 ? "white" : "#222"};
                                        cursor:pointer;
                                    "
                                >
                                    ${c}
                                </button>

                            `).join("")}

                        </div>

                    </div>


                    <!-- المقاس -->

                    <div style="margin-top:25px">

                        <strong>
                            المقاس:
                        </strong>

                        <div
                            id="size-options"
                            style="
                                display:flex;
                                flex-wrap:wrap;
                                gap:8px;
                                margin-top:10px;
                            "
                        >

                            ${product.sizes.map((s, index) => `

                                <button
                                    type="button"
                                    class="option-size"
                                    data-value="${s}"
                                    style="
                                        padding:10px 16px;
                                        border:1px solid #ddd;
                                        border-radius:10px;
                                        background:${index === 0 ? "#6c4cff" : "white"};
                                        color:${index === 0 ? "white" : "#222"};
                                        cursor:pointer;
                                    "
                                >
                                    ${s}
                                </button>

                            `).join("")}

                        </div>

                    </div>


                    <!-- الكمية -->

                    <div style="margin-top:25px">

                        <strong>
                            الكمية:
                        </strong>

                        <input
                            id="product-quantity"
                            type="number"
                            min="1"
                            value="1"
                            style="
                                width:100px;
                                padding:10px;
                                margin-right:10px;
                                border:1px solid #ddd;
                                border-radius:10px;
                            "
                        >

                    </div>


                    <button
                        id="confirm-add"
                        style="
                            width:100%;
                            margin-top:25px;
                            padding:16px;
                            border-radius:13px;
                            background:#6c4cff;
                            color:white;
                            font-weight:900;
                            font-size:17px;
                            cursor:pointer;
                        "
                    >
                        🛒 أضف إلى السلة
                    </button>

                </div>

            </div>

        </div>
    `;


    document.body.appendChild(overlay);


    // ==================================================
    // اختيار اللون
    // ==================================================

    overlay
        .querySelectorAll(".option-color")
        .forEach(button => {

            button.addEventListener("click", function () {

                color =
                    this.dataset.value;


                overlay
                    .querySelectorAll(".option-color")
                    .forEach(btn => {

                        btn.style.background =
                            btn === this
                                ? "#6c4cff"
                                : "white";

                        btn.style.color =
                            btn === this
                                ? "white"
                                : "#222";

                    });

            });

        });


    // ==================================================
    // اختيار المقاس
    // ==================================================

    overlay
        .querySelectorAll(".option-size")
        .forEach(button => {

            button.addEventListener("click", function () {

                size =
                    this.dataset.value;


                overlay
                    .querySelectorAll(".option-size")
                    .forEach(btn => {

                        btn.style.background =
                            btn === this
                                ? "#6c4cff"
                                : "white";

                        btn.style.color =
                            btn === this
                                ? "white"
                                : "#222";

                    });

            });

        });


    // ==================================================
    // إضافة إلى السلة
    // ==================================================

    overlay
        .querySelector("#confirm-add")
        .addEventListener("click", function () {

            const quantityInput =
                overlay.querySelector(
                    "#product-quantity"
                );


            const quantity =
                Math.max(
                    1,
                    parseInt(
                        quantityInput.value
                    ) || 1
                );


            addToCart(
                product,
                color,
                size,
                quantity
            );


            overlay.remove();

        });


    // ==================================================
    // إغلاق المنتج
    // ==================================================

    overlay
        .querySelector("#close-product")
        .addEventListener("click", function () {

            overlay.remove();

        });


    overlay.addEventListener(
        "click",
        function (event) {

            if (event.target === overlay) {

                overlay.remove();

            }

        }
    );

}


// ======================================================
// إضافة المنتج إلى السلة
// ======================================================

function addToCart(
    product,
    color,
    size,
    quantity
) {

    const existing =
        cart.find(item =>
            item.id === product.id &&
            item.color === color &&
            item.size === size
        );


    if (existing) {

        existing.quantity += quantity;

    } else {

        cart.push({

            id: product.id,

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

    openCart();


    alert(
        "تمت إضافة المنتج إلى السلة ✅"
    );

}


// ======================================================
// فتح السلة
// ======================================================

function openCart() {

    if (!cartWindow) return;

    cartWindow.classList.add("active");

}


// ======================================================
// إغلاق السلة
// ======================================================

function closeCart() {

    if (!cartWindow) return;

    cartWindow.classList.remove("active");

}


// ======================================================
// تحديث السلة
// ======================================================

function updateCart() {

    if (!cartItems) return;


    cartItems.innerHTML = "";


    let total = 0;

    let count = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p>
                السلة فارغة 🛒
            </p>
        `;

    }


    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;

        count += item.quantity;


        const element =
            document.createElement("div");


        element.className =
            "cart-item";


        element.innerHTML = `

            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <p>
                    اللون: ${item.color}
                    <br>
                    المقاس: ${item.size}
                    <br>
                    ${item.price} DH ×
                    ${item.quantity}
                </p>

            </div>


            <div class="cart-item-actions">

                <button
                    type="button"
                    onclick="changeQuantity(${index},1)"
                >
                    +
                </button>


                <span>
                    ${item.quantity}
                </span>


                <button
                    type="button"
                    onclick="changeQuantity(${index},-1)"
                >
                    −
                </button>


                <button
                    type="button"
                    class="remove-item"
                    onclick="removeFromCart(${index})"
                >
                    🗑️
                </button>

            </div>

        `;


        cartItems.appendChild(element);

    });


    if (cartCount) {

        cartCount.textContent =
            count;

    }


    if (cartTotal) {

        cartTotal.textContent =
            total.toLocaleString("fr-MA") +
            " DH";

    }

}


// ======================================================
// تغيير الكمية
// ======================================================

function changeQuantity(index, amount) {

    if (!cart[index]) return;


    cart[index].quantity += amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    saveCart();

    updateCart();

}


// ======================================================
// حذف المنتج
// ======================================================

function removeFromCart(index) {

    if (!cart[index]) return;


    cart.splice(index, 1);


    saveCart();

    updateCart();

}


// ======================================================
// البحث
// ======================================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        function () {

            const text =
                this.value
                    .toLowerCase()
                    .trim();


            const filtered =
                products.filter(product =>

                    product.name
                        .toLowerCase()
                        .includes(text)

                    ||

                    product.category
                        .toLowerCase()
                        .includes(text)

                    ||

                    product.description
                        .toLowerCase()
                        .includes(text)

                );


            renderProducts(filtered);

        }
    );

}


// ======================================================
// زر السلة
// ======================================================

if (cartButton) {

    cartButton.addEventListener(
        "click",
        openCart
    );

}


if (closeCartButton) {

    closeCartButton.addEventListener(
        "click",
        closeCart
    );

}


if (cartWindow) {

    cartWindow.addEventListener(
        "click",
        function (event) {

            if (
                event.target === cartWindow
            ) {

                closeCart();

            }

        }
    );

}


// ======================================================
// WhatsApp
// ======================================================

if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        function () {

            if (cart.length === 0) {

                alert(
                    "السلة فارغة. أضيفي منتجاً أولاً."
                );

                return;

            }


            let message =
                "السلام عليكم، أريد طلب المنتجات التالية:\n\n";


            let total = 0;


            cart.forEach(item => {

                const itemTotal =
                    item.price *
                    item.quantity;


                total += itemTotal;


                message +=
                    "• " +
                    item.name +
                    "\n" +

                    "اللون: " +
                    item.color +
                    "\n" +

                    "المقاس: " +
                    item.size +
                    "\n" +

                    "الكمية: " +
                    item.quantity +
                    "\n" +

                    "السعر: " +
                    itemTotal +
                    " DH\n\n";

            });


            message +=
                "المجموع: " +
                total +
                " DH\n\n" +

                "طريقة الدفع: الدفع عند الاستلام";


            const url =
                "https://wa.me/" +
                WHATSAPP_NUMBER +
                "?text=" +
                encodeURIComponent(
                    message
                );


            window.open(
                url,
                "_blank"
            );

        }
    );

}


// ======================================================
// تشغيل المتجر
// ======================================================

renderProducts();

updateCart();
