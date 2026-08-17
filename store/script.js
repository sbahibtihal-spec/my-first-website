/* =====================================================
   SABIH BEAUTY & FASHION
   Main JavaScript
===================================================== */

const WHATSAPP_NUMBER = "212703166572";

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


/* =====================================================
   CART
===================================================== */

let cart = JSON.parse(localStorage.getItem("sabihCart")) || [];


/* إضافة منتج */

function addProduct(productId) {

    const product = products.find(
        item => item.id === productId
    );

    if (!product) return;

    const existingProduct = cart.find(
        item => item.id === productId
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


/* حذف منتج */

function removeProduct(productId) {

    cart = cart.filter(
        item => item.id !== productId
    );

    saveCart();

    updateCart();

}


/* زيادة الكمية */

function increaseQuantity(productId) {

    const product = cart.find(
        item => item.id === productId
    );

    if (!product) return;

    product.quantity++;

    saveCart();

    updateCart();

}


/* تقليل الكمية */

function decreaseQuantity(productId) {

    const product = cart.find(
        item => item.id === productId
    );

    if (!product) return;

    if (product.quantity > 1) {

        product.quantity--;

    } else {

        removeProduct(productId);

        return;

    }

    saveCart();

    updateCart();

}


/* حفظ السلة */

function saveCart() {

    localStorage.setItem(
        "sabihCart",
        JSON.stringify(cart)
    );

}


/* =====================================================
   CART UI
===================================================== */

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const cartTotal =
        document.getElementById("cartTotal");


    const totalQuantity = cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );


    const totalPrice = cart.reduce(
        (total, item) =>
            total + (item.price * item.quantity),
        0
    );


    if (cartCount) {

        cartCount.textContent =
            totalQuantity;

    }


    if (cartTotal) {

        cartTotal.textContent =
            "المجموع: " +
            totalPrice.toLocaleString("fr-MA") +
            " MAD";

    }


    if (!cartItems) return;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <p>السلة فارغة</p>
                <small>
                    أضيفي منتجاتك المفضلة إلى السلة
                </small>
            </div>
        `;

        return;

    }


    cartItems.innerHTML = cart.map(item => `

        <div class="cart-item">

            <div class="cart-item-info">

                <strong>
                    ${escapeHTML(item.name)}
                </strong>

                <span>
                    ${item.price.toLocaleString("fr-MA")}
                    MAD
                </span>

            </div>


            <div class="quantity-controls">

                <button
                    onclick="decreaseQuantity(${item.id})">
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="increaseQuantity(${item.id})">
                    +
                </button>

            </div>


            <button
                class="remove-product"
                onclick="removeProduct(${item.id})">

                ×

            </button>

        </div>

    `).join("");

}


/* =====================================================
   CART OPEN / CLOSE
===================================================== */

function openCart() {

    const cartOverlay =
        document.getElementById("cartOverlay");

    if (cartOverlay) {

        cartOverlay.style.display = "block";

        document.body.style.overflow = "hidden";

    }

}


function closeCart() {

    const cartOverlay =
        document.getElementById("cartOverlay");

    if (cartOverlay) {

        cartOverlay.style.display = "none";

        document.body.style.overflow = "";

    }

}


/* إغلاق عند الضغط خارج السلة */

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
   PRODUCT RENDERING
===================================================== */

function renderProducts(list = products) {

    const container =
        document.getElementById("productList");

    if (!container) return;


    if (list.length === 0) {

        container.innerHTML = `
            <p class="no-products">
                لا توجد منتجات في هذا القسم.
            </p>
        `;

        return;

    }


    container.innerHTML =
        list.map(product => `

        <article
            class="product"
            data-category="${product.category}">

            <button
                class="favorite"
                onclick="toggleFavorite(${product.id})">

                ♡

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

                    ${product.price.toLocaleString("fr-MA")}
                    MAD

                </div>


                <button
                    class="add-cart"
                    onclick="addProduct(${product.id})">

                    أضف للسلة

                </button>

            </div>

        </article>

    `).join("");

}


/* =====================================================
   FILTERS
===================================================== */

function filterProducts(category) {

    if (category === "all") {

        renderProducts(products);

        return;

    }


    const filteredProducts =
        products.filter(
            product =>
                product.category === category
        );


    renderProducts(filteredProducts);

}


/* =====================================================
   SEARCH
===================================================== */

function searchProducts() {

    const searchInput =
        document.getElementById("searchInput");

    if (!searchInput) return;


    const search =
        searchInput.value
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

let favorites =
    JSON.parse(
        localStorage.getItem("sabihFavorites")
    ) || [];


function toggleFavorite(productId) {

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
            (
                item.price *
                item.quantity
            ).toLocaleString("fr-MA") +
            " MAD\n\n";

    });


    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                (item.price * item.quantity),
            0
        );


    message +=
        "━━━━━━━━━━━━\n";

    message +=
        "المجموع: " +
        total.toLocaleString("fr-MA") +
        " MAD\n\n";

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
   SCROLL
===================================================== */

function scrollToProducts() {

    const productsSection =
        document.getElementById("products");

    if (!productsSection) return;


    productsSection.scrollIntoView({
        behavior: "smooth"
    });

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
   CONTACT
===================================================== */

function openWhatsApp() {

    window.open(
        "https://wa.me/" +
        WHATSAPP_NUMBER,
        "_blank"
    );

}


/* =====================================================
   SECURITY
===================================================== */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

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
