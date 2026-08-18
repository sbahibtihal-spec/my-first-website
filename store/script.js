/* =====================================================
   SABIH BEAUTY & FASHION
   MAIN JAVASCRIPT
===================================================== */

const WHATSAPP_NUMBER = "212703166572";

/* ================= PRODUCTS ================= */

const products = [
    {
        id: 1,
        name: "عطر SABIH Signature",
        category: "beauty",
        price: 690,
        currency: "MAD"
    },
    {
        id: 2,
        name: "أحمر شفاه فاخر",
        category: "beauty",
        price: 280,
        currency: "MAD"
    },
    {
        id: 3,
        name: "فستان بيج أنيق",
        category: "fashion",
        price: 550,
        currency: "MAD"
    },
    {
        id: 4,
        name: "بليزر نسائي كلاسيك",
        category: "fashion",
        price: 450,
        currency: "MAD"
    },
    {
        id: 5,
        name: "كريم ترطيب فاخر",
        category: "beauty",
        price: 950,
        currency: "MAD"
    }
];

/* ================= CART ================= */

let cart = JSON.parse(
    localStorage.getItem("sabihCart")
) || [];


/* ================= FAVORITES ================= */

let favorites = JSON.parse(
    localStorage.getItem("sabihFavorites")
) || [];


/* =====================================================
   FORMAT PRICE
===================================================== */

function formatPrice(price) {
    return Number(price).toLocaleString("fr-MA") + " MAD";
}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
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
   ADD PRODUCT
===================================================== */

function addProduct(productId) {

    const product = products.find(
        item => item.id === Number(productId)
    );

    if (!product) return;


    const existingProduct = cart.find(
        item => item.id === product.id
    );


    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }


    saveCart();

    updateCart();

    openCart();

}


/* =====================================================
   REMOVE PRODUCT
===================================================== */

function removeProduct(productId) {

    cart = cart.filter(
        item => item.id !== Number(productId)
    );

    saveCart();

    updateCart();

}


/* =====================================================
   INCREASE QUANTITY
===================================================== */

function increaseQuantity(productId) {

    const item = cart.find(
        product => product.id === Number(productId)
    );

    if (!item) return;

    item.quantity++;

    saveCart();

    updateCart();

}


/* =====================================================
   DECREASE QUANTITY
===================================================== */

function decreaseQuantity(productId) {

    const item = cart.find(
        product => product.id === Number(productId)
    );

    if (!item) return;


    if (item.quantity > 1) {

        item.quantity--;

    } else {

        removeProduct(productId);

        return;

    }


    saveCart();

    updateCart();

}


/* =====================================================
   UPDATE CART
===================================================== */

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const cartTotal =
        document.getElementById("cartTotal");


    /* عدد المنتجات */

    const totalQuantity = cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );


    /* المجموع */

    const totalPrice = cart.reduce(
        (total, item) =>
            total + (
                item.price *
                item.quantity
            ),
        0
    );


    if (cartCount) {

        cartCount.textContent =
            totalQuantity;

    }


    if (cartTotal) {

        cartTotal.textContent =
            "المجموع: " +
            formatPrice(totalPrice);

    }


    if (!cartItems) return;


    /* السلة فارغة */

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <p>
                    السلة فارغة
                </p>

                <small>
                    أضيفي منتجاتك المفضلة إلى السلة
                </small>

            </div>

        `;

        return;

    }


    /* عرض المنتجات */

    cartItems.innerHTML = cart.map(item => `

        <div class="cart-item">

            <div class="cart-item-info">

                <strong>
                    ${escapeHTML(item.name)}
                </strong>

                <span>
                    ${formatPrice(item.price)}
                </span>

            </div>


            <div class="quantity-controls">

                <button
                    type="button"
                    onclick="decreaseQuantity(${item.id})">

                    −

                </button>


                <span>
                    ${item.quantity}
                </span>


                <button
                    type="button"
                    onclick="increaseQuantity(${item.id})">

                    +

                </button>

            </div>


            <button
                type="button"
                class="remove-product"
                onclick="removeProduct(${item.id})">

                ×

            </button>

        </div>

    `).join("");

}


/* =====================================================
   OPEN CART
===================================================== */

function openCart() {

    const overlay =
        document.getElementById("cartOverlay");


    if (!overlay) return;


    overlay.style.display = "block";

    document.body.style.overflow = "hidden";


    updateCart();

}


/* =====================================================
   CLOSE CART
===================================================== */

function closeCart() {

    const overlay =
        document.getElementById("cartOverlay");


    if (!overlay) return;


    overlay.style.display = "none";

    document.body.style.overflow = "";

}


/* =====================================================
   CLOSE CART WHEN CLICKING OUTSIDE
===================================================== */

document.addEventListener(
    "click",
    function(event) {

        const overlay =
            document.getElementById("cartOverlay");


        if (
            overlay &&
            event.target === overlay
        ) {

            closeCart();

        }

    }
);


/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeCart();

        }

    }
);


/* =====================================================
   RENDER PRODUCTS
===================================================== */

function renderProducts(list = products) {

    const container =
        document.getElementById("productList");


    if (!container) return;


    if (list.length === 0) {

        container.innerHTML = `

            <div class="no-products">

                لا توجد منتجات في هذا القسم.

            </div>

        `;

        return;

    }


    container.innerHTML = list.map(
        product => `

        <article
            class="product"
            data-category="${product.category}">


            <button
                type="button"
                class="favorite
                ${favorites.includes(product.id) ? "active" : ""}"
                onclick="toggleFavorite(${product.id})">

                ${favorites.includes(product.id)
                    ? "♥"
                    : "♡"}

            </button>


            <div class="product-image">

                <span>
                    SABIH
                </span>

            </div>


            <div class="product-info">

                <h3>
                    ${escapeHTML(product.name)}
                </h3>


                <div class="price">

                    ${formatPrice(product.price)}

                </div>


                <button
                    type="button"
                    class="add-cart"
                    onclick="addProduct(${product.id})">

                    أضف للسلة

                </button>

            </div>

        </article>

    `
    ).join("");

}


/* =====================================================
   FILTER PRODUCTS
===================================================== */

function filterProducts(category) {

    if (category === "all") {

        renderProducts(products);

        return;

    }


    const filtered =
        products.filter(
            product =>
                product.category === category
        );


    renderProducts(filtered);

}


/* =====================================================
   SEARCH PRODUCTS
===================================================== */

function searchProducts() {

    const input =
        document.getElementById("searchInput");


    if (!input) return;


    const search =
        input.value
            .trim()
            .toLowerCase();


    if (!search) {

        renderProducts(products);

        return;

    }


    const results =
        products.filter(product =>

            product.name
                .toLowerCase()
                .includes(search)

        );


    renderProducts(results);

}


/* =====================================================
   FAVORITES
===================================================== */

function toggleFavorite(productId) {

    productId = Number(productId);


    if (favorites.includes(productId)) {

        favorites =
            favorites.filter(
                id => id !== productId
            );

    } else {

        favorites.push(productId);

    }


    localStorage.setItem(
        "sabihFavorites",
        JSON.stringify(favorites)
    );


    renderProducts();

}


/* =====================================================
   SCROLL TO PRODUCTS
===================================================== */

function scrollToProducts() {

    const section =
        document.getElementById("products");


    if (!section) return;


    section.scrollIntoView({
        behavior: "smooth"
    });

}


/* =====================================================
   CATEGORY BUTTON
===================================================== */

function showCategory(category) {

    if (
        category === "beauty" ||
        category === "fashion"
    ) {

        filterProducts(category);

    } else {

        renderProducts(products);

    }


    scrollToProducts();

}


/* =====================================================
   WHATSAPP CHECKOUT
===================================================== */

function checkoutWhatsApp() {

    if (cart.length === 0) {

        alert(
            "السلة فارغة. أضيفي منتجاً أولاً."
        );

        return;

    }


    let message =
        "مرحباً SABIH 👋\n\n";


    message +=
        "أرغب في طلب المنتجات التالية:\n\n";


    cart.forEach(item => {

        message +=
            "• " +
            item.name +
            "\n";

        message +=
            "الكمية: " +
            item.quantity +
            "\n";

        message +=
            "السعر: " +
            formatPrice(
                item.price *
                item.quantity
            ) +
            "\n\n";

    });


    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                (
                    item.price *
                    item.quantity
                ),
            0
        );


    message +=
        "━━━━━━━━━━━━\n";

    message +=
        "المجموع: " +
        formatPrice(total) +
        "\n\n";


    message +=
        "الاسم:\n";

    message +=
        "المدينة:\n";

    message +=
        "العنوان:\n";

    message +=
        "رقم الهاتف:";


    const url =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(message);


    window.open(
        url,
        "_blank"
    );

}


/* =====================================================
   OPEN WHATSAPP
===================================================== */

function openWhatsApp() {

    window.open(
        "https://wa.me/" +
        WHATSAPP_NUMBER,
        "_blank"
    );

}


/* =====================================================
   LANGUAGE
===================================================== */

function switchLanguage() {

    const html =
        document.documentElement;


    if (html.lang === "ar") {

        html.lang = "en";

        html.dir = "ltr";

    } else {

        html.lang = "ar";

        html.dir = "rtl";

    }

}


/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderProducts();

        updateCart();

    }
);
