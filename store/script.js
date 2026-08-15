// =========================
// NAIMA STORE - JAVASCRIPT
// =========================


// =========================
// LANGUAGE
// =========================

const languageToggle = document.getElementById("language-toggle");

let currentLanguage = "ar";

languageToggle.addEventListener("click", function () {

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

    document.querySelectorAll("[data-ar]").forEach(function (element) {

        if (currentLanguage === "ar") {
            element.textContent = element.getAttribute("data-ar");
        } else {
            element.textContent = element.getAttribute("data-en");
        }

    });

    updateSearchPlaceholder();
    updateCart();

});


// =========================
// SEARCH
// =========================

const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", function () {

    const searchText = searchInput.value.toLowerCase().trim();

    const products = document.querySelectorAll(".product-card");

    products.forEach(function (product) {

        const productName =
            product.getAttribute("data-name").toLowerCase();

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

});


function updateSearchPlaceholder() {

    if (currentLanguage === "ar") {
        searchInput.placeholder = "🔎 ابحثي عن منتج...";
    } else {
        searchInput.placeholder = "🔎 Search for a product...";
    }

}


// =========================
// CART
// =========================

let cart = [];

const cartButton = document.getElementById("cart-button");
const cartWindow = document.getElementById("cart");
const closeCartButton = document.getElementById("close-cart");

const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");


// OPEN CART

cartButton.addEventListener("click", function () {

    cartWindow.classList.add("active");

});


// CLOSE CART

closeCartButton.addEventListener("click", function () {

    cartWindow.classList.remove("active");

});


// CLOSE WHEN CLICKING OUTSIDE

cartWindow.addEventListener("click", function (event) {

    if (event.target === cartWindow) {
        cartWindow.classList.remove("active");
    }

});


// =========================
// ADD TO CART
// =========================

const addCartButtons =
    document.querySelectorAll(".add-cart");

addCartButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const name = button.getAttribute("data-name");
        const price = Number(button.getAttribute("data-price"));

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

        updateCart();

        cartWindow.classList.add("active");

    });

});


// =========================
// UPDATE CART
// =========================

function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {

        const emptyMessage = document.createElement("p");

        emptyMessage.className = "empty-cart";

        if (currentLanguage === "ar") {
            emptyMessage.textContent = "السلة فارغة";
        } else {
            emptyMessage.textContent = "Your cart is empty";
        }

        cartItems.appendChild(emptyMessage);

    }


    cart.forEach(function (item, index) {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;
        count += item.quantity;


        const itemElement =
            document.createElement("div");

        itemElement.className = "cart-item";


        itemElement.innerHTML = `

            <div class="cart-item-info">

                <h4>${item.name}</h4>

                <p>
                    ${item.price} DH × ${item.quantity}
                </p>

            </div>


            <div class="cart-item-actions">

                <button
                    type="button"
                    onclick="changeQuantity(${index}, 1)">
                    +
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    type="button"
                    onclick="changeQuantity(${index}, -1)">
                    -
                </button>

                <button
                    type="button"
                    class="remove-item"
                    onclick="removeFromCart(${index})">
                    🗑️
                </button>

            </div>

        `;


        cartItems.appendChild(itemElement);

    });


    cartCount.textContent = count;

    cartTotal.textContent =
        total.toLocaleString() + " DH";

}


// =========================
// CHANGE QUANTITY
// =========================

function changeQuantity(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();

}


// =========================
// REMOVE PRODUCT
// =========================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


// =========================
// WHATSAPP ORDER
// =========================

const checkoutButton =
    document.getElementById("checkout");


checkoutButton.addEventListener("click", function () {

    if (cart.length === 0) {

        if (currentLanguage === "ar") {
            alert("السلة فارغة. أضيفي منتجاً أولاً.");
        } else {
            alert("Your cart is empty. Please add a product first.");
        }

        return;
    }


    let message = "";

    if (currentLanguage === "ar") {

        message += "السلام عليكم، أريد طلب المنتجات التالية:%0A%0A";

    } else {

        message += "Hello, I would like to order:%0A%0A";

    }


    let total = 0;


    cart.forEach(function (item) {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;

        message +=
            "• " +
            item.name +
            " × " +
            item.quantity +
            " = " +
            itemTotal +
            " DH%0A";

    });


    message +=
        "%0A" +
        (currentLanguage === "ar"
            ? "المجموع: "
            : "Total: ") +
        total +
        " DH";


    const whatsappNumber =
        "212703166572";


    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        message;


    window.open(
        whatsappURL,
        "_blank"
    );

});


// =========================
// INITIAL CART
// =========================

updateCart();
updateSearchPlaceholder();
