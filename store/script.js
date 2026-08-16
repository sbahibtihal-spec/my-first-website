// ======================================================
// NAIMA STORE - SCRIPT.JS
// ======================================================

// ===============================
// إعدادات المتجر
// ===============================

const WHATSAPP_NUMBER = "212703166572";
const STORE_EMAIL = "sbahibtihal@gmail.com";


// ===============================
// اللغة
// ===============================

let currentLanguage = "ar";

const languageToggle = document.getElementById("language-toggle");

if (languageToggle) {
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

        updateLanguage();
        updateSearchPlaceholder();
        updateCart();
    });
}


// ===============================
// تغيير النصوص
// ===============================

function updateLanguage() {

    document.querySelectorAll("[data-ar]").forEach(function (element) {

        if (currentLanguage === "ar") {
            element.textContent =
                element.getAttribute("data-ar");
        } else {
            element.textContent =
                element.getAttribute("data-en");
        }

    });

}


// ===============================
// البحث
// ===============================

const searchInput =
    document.getElementById("search-input");

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const searchText =
            searchInput.value.toLowerCase().trim();

        const products =
            document.querySelectorAll(".product-card");

        products.forEach(function (product) {

            const name =
                product.getAttribute("data-name") || "";

            const text =
                product.textContent || "";

            const nameMatch =
                name.toLowerCase().includes(searchText);

            const textMatch =
                text.toLowerCase().includes(searchText);

            if (nameMatch || textMatch) {
                product.style.display = "";
            } else {
                product.style.display = "none";
            }

        });

    });

}


function updateSearchPlaceholder() {

    if (!searchInput) return;

    if (currentLanguage === "ar") {

        searchInput.placeholder =
            "🔎 ابحثي عن منتج...";

    } else {

        searchInput.placeholder =
            "🔎 Search for a product...";

    }

}


// ======================================================
// السلة
// ======================================================

let cart = [];


// تحميل السلة من المتصفح

try {

    const savedCart =
        localStorage.getItem("naima_cart");

    if (savedCart) {
        cart = JSON.parse(savedCart);
    }

} catch (error) {

    cart = [];

}


// عناصر السلة

const cartButton =
    document.getElementById("cart-button");

const cartWindow =
    document.getElementById("cart");

const closeCartButton =
    document.getElementById("close-cart");

const cartItems =
    document.getElementById("cart-items");

const cartCount =
    document.getElementById("cart-count");

const cartTotal =
    document.getElementById("cart-total");


// ===============================
// فتح السلة
// ===============================

if (cartButton) {

    cartButton.addEventListener("click", function () {

        if (cartWindow) {
            cartWindow.classList.add("active");
        }

        updateCart();

    });

}


// ===============================
// إغلاق السلة
// ===============================

if (closeCartButton) {

    closeCartButton.addEventListener("click", function () {

        if (cartWindow) {
            cartWindow.classList.remove("active");
        }

    });

}


// ===============================
// إغلاق عند الضغط خارج السلة
// ===============================

if (cartWindow) {

    cartWindow.addEventListener("click", function (event) {

        if (event.target === cartWindow) {

            cartWindow.classList.remove("active");

        }

    });

}


// ======================================================
// اختيار اللون والمقاس
// ======================================================

let selectedColor = null;
let selectedSize = null;


// ===============================
// إنشاء نافذة اختيار المنتج
// ===============================

function openProductOptions(button) {

    const productCard =
        button.closest(".product-card");

    if (!productCard) return;


    const name =
        productCard.getAttribute("data-name") || "منتج";

    const price =
        Number(productCard.getAttribute("data-price")) || 0;


    const colorsString =
        productCard.getAttribute("data-colors") || "";

    const sizesString =
        productCard.getAttribute("data-sizes") || "";


    const colors =
        colorsString
            .split(",")
            .map(color => color.trim())
            .filter(Boolean);


    const sizes =
        sizesString
            .split(",")
            .map(size => size.trim())
            .filter(Boolean);


    selectedColor =
        colors.length > 0 ? colors[0] : "موحد";

    selectedSize =
        sizes.length > 0 ? sizes[0] : "موحد";


    createProductModal(
        name,
        price,
        colors,
        sizes
    );

}


// ======================================================
// نافذة المنتج
// ======================================================

function createProductModal(
    name,
    price,
    colors,
    sizes
) {

    // حذف نافذة قديمة

    const oldModal =
        document.getElementById("product-options-modal");

    if (oldModal) {
        oldModal.remove();
    }


    const modal =
        document.createElement("div");

    modal.id =
        "product-options-modal";


    modal.style.position = "fixed";
    modal.style.inset = "0";
    modal.style.background = "rgba(0,0,0,.65)";
    modal.style.zIndex = "9999";
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.padding = "20px";


    const box =
        document.createElement("div");

    box.style.background = "#fff";
    box.style.width = "100%";
    box.style.maxWidth = "500px";
    box.style.borderRadius = "22px";
    box.style.padding = "25px";
    box.style.position = "relative";
    box.style.maxHeight = "90vh";
    box.style.overflowY = "auto";


    // زر الإغلاق

    const close =
        document.createElement("button");

    close.type = "button";
    close.textContent = "✕";

    close.style.position = "absolute";
    close.style.left = "15px";
    close.style.top = "15px";
    close.style.width = "38px";
    close.style.height = "38px";
    close.style.borderRadius = "50%";
    close.style.background = "#eee";
    close.style.cursor = "pointer";


    close.addEventListener("click", function () {
        modal.remove();
    });


    box.appendChild(close);


    // اسم المنتج

    const title =
        document.createElement("h2");

    title.textContent = name;
    title.style.marginBottom = "10px";


    box.appendChild(title);


    // السعر

    const priceElement =
        document.createElement("p");

    priceElement.textContent =
        price + " DH";

    priceElement.style.color = "#6c4cff";
    priceElement.style.fontSize = "22px";
    priceElement.style.fontWeight = "900";


    box.appendChild(priceElement);


    // ===============================
    // اللون
    // ===============================

    if (colors.length > 0) {

        const colorTitle =
            document.createElement("h3");

        colorTitle.textContent =
            currentLanguage === "ar"
                ? "اختاري اللون"
                : "Choose color";

        colorTitle.style.marginTop = "20px";


        box.appendChild(colorTitle);


        const colorContainer =
            document.createElement("div");

        colorContainer.style.display = "flex";
        colorContainer.style.flexWrap = "wrap";
        colorContainer.style.gap = "8px";


        colors.forEach(function (color, index) {

            const colorButton =
                document.createElement("button");

            colorButton.type = "button";
            colorButton.textContent = color;

            colorButton.style.padding =
                "10px 15px";

            colorButton.style.borderRadius =
                "10px";

            colorButton.style.cursor =
                "pointer";

            colorButton.style.border =
                "1px solid #ddd";


            if (index === 0) {

                colorButton.style.background =
                    "#6c4cff";

                colorButton.style.color =
                    "#fff";

            }


            colorButton.addEventListener(
                "click",
                function () {

                    selectedColor = color;


                    colorContainer
                        .querySelectorAll("button")
                        .forEach(function (button) {

                            button.style.background =
                                "#fff";

                            button.style.color =
                                "#17152a";

                        });


                    colorButton.style.background =
                        "#6c4cff";

                    colorButton.style.color =
                        "#fff";

                }
            );


            colorContainer.appendChild(
                colorButton
            );

        });


        box.appendChild(colorContainer);

    }


    // ===============================
    // المقاس
    // ===============================

    if (sizes.length > 0) {

        const sizeTitle =
            document.createElement("h3");

        sizeTitle.textContent =
            currentLanguage === "ar"
                ? "اختاري المقاس"
                : "Choose size";

        sizeTitle.style.marginTop = "20px";


        box.appendChild(sizeTitle);


        const sizeContainer =
            document.createElement("div");

        sizeContainer.style.display = "flex";
        sizeContainer.style.flexWrap = "wrap";
        sizeContainer.style.gap = "8px";


        sizes.forEach(function (size, index) {

            const sizeButton =
                document.createElement("button");

            sizeButton.type = "button";
            sizeButton.textContent = size;


            sizeButton.style.padding =
                "10px 15px";

            sizeButton.style.borderRadius =
                "10px";

            sizeButton.style.cursor =
                "pointer";

            sizeButton.style.border =
                "1px solid #ddd";


            if (index === 0) {

                sizeButton.style.background =
                    "#6c4cff";

                sizeButton.style.color =
                    "#fff";

            }


            sizeButton.addEventListener(
                "click",
                function () {

                    selectedSize = size;


                    sizeContainer
                        .querySelectorAll("button")
                        .forEach(function (button) {

                            button.style.background =
                                "#fff";

                            button.style.color =
                                "#17152a";

                        });


                    sizeButton.style.background =
                        "#6c4cff";

                    sizeButton.style.color =
                        "#fff";

                }
            );


            sizeContainer.appendChild(
                sizeButton
            );

        });


        box.appendChild(sizeContainer);

    }


    // ===============================
    // الكمية
    // ===============================

    const quantityTitle =
        document.createElement("h3");

    quantityTitle.textContent =
        currentLanguage === "ar"
            ? "الكمية"
            : "Quantity";

    quantityTitle.style.marginTop = "20px";


    box.appendChild(quantityTitle);


    const quantityInput =
        document.createElement("input");

    quantityInput.type = "number";
    quantityInput.min = "1";
    quantityInput.value = "1";

    quantityInput.style.width = "100%";
    quantityInput.style.padding = "12px";
    quantityInput.style.border =
        "1px solid #ddd";
    quantityInput.style.borderRadius =
        "10px";


    box.appendChild(quantityInput);


    // ===============================
    // زر إضافة إلى السلة
    // ===============================

    const addButton =
        document.createElement("button");

    addButton.type = "button";

    addButton.textContent =
        currentLanguage === "ar"
            ? "🛒 أضف إلى السلة"
            : "🛒 Add to cart";


    addButton.style.width = "100%";
    addButton.style.marginTop = "20px";
    addButton.style.padding = "15px";
    addButton.style.borderRadius = "12px";
    addButton.style.background = "#6c4cff";
    addButton.style.color = "#fff";
    addButton.style.fontWeight = "900";
    addButton.style.cursor = "pointer";


    addButton.addEventListener(
        "click",
        function () {

            const quantity =
                Math.max(
                    1,
                    Number(quantityInput.value) || 1
                );


            addProductToCart(
                name,
                price,
                selectedColor,
                selectedSize,
                quantity
            );


            modal.remove();

        }
    );


    box.appendChild(addButton);


    modal.appendChild(box);

    document.body.appendChild(modal);


    // إغلاق عند الضغط خارج النافذة

    modal.addEventListener(
        "click",
        function (event) {

            if (event.target === modal) {
                modal.remove();
            }

        }
    );

}


// ======================================================
// أزرار أضف للسلة
// ======================================================

function setupAddCartButtons() {

    const buttons =
        document.querySelectorAll(".add-cart");


    buttons.forEach(function (button) {

        // منع تكرار الأحداث

        if (button.dataset.ready === "true") {
            return;
        }

        button.dataset.ready = "true";


        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();

                openProductOptions(button);

            }
        );

    });

}


setupAddCartButtons();


// ======================================================
// إضافة المنتج للسلة
// ======================================================

function addProductToCart(
    name,
    price,
    color,
    size,
    quantity
) {

    const existingProduct =
        cart.find(function (item) {

            return (
                item.name === name &&
                item.color === color &&
                item.size === size
            );

        });


    if (existingProduct) {

        existingProduct.quantity += quantity;

    } else {

        cart.push({

            name: name,

            price: price,

            color: color,

            size: size,

            quantity: quantity

        });

    }


    saveCart();

    updateCart();


    if (cartWindow) {

        cartWindow.classList.add("active");

    }

}


// ======================================================
// حفظ السلة
// ======================================================

function saveCart() {

    try {

        localStorage.setItem(
            "naima_cart",
            JSON.stringify(cart)
        );

    } catch (error) {

        console.log(
            "تعذر حفظ السلة"
        );

    }

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

        const empty =
            document.createElement("p");

        empty.className =
            "empty-cart";


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


        const element =
            document.createElement("div");

        element.className =
            "cart-item";


        element.innerHTML = `

            <div class="cart-item-info">

                <h4>
                    ${escapeHTML(item.name)}
                </h4>

                <p>
                    ${item.price} DH × ${item.quantity}
                </p>

                <small>
                    ${currentLanguage === "ar"
                        ? "اللون"
                        : "Color"}:
                    ${escapeHTML(item.color)}
                    <br>

                    ${currentLanguage === "ar"
                        ? "المقاس"
                        : "Size"}:
                    ${escapeHTML(item.size)}
                </small>

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
                    −
                </button>

                <button
                    type="button"
                    class="remove-item"
                    onclick="removeFromCart(${index})">

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

function changeQuantity(
    index,
    amount
) {

    if (!cart[index]) return;


    cart[index].quantity += amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    saveCart();

    updateCart();

}


// ======================================================
// حذف منتج
// ======================================================

function removeFromCart(index) {

    if (!cart[index]) return;


    cart.splice(index, 1);


    saveCart();

    updateCart();

}


// ======================================================
// زر الطلب عبر WhatsApp
// ======================================================

const checkoutButton =
    document.getElementById("checkout");


if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        function () {

            if (cart.length === 0) {

                alert(
                    currentLanguage === "ar"
                        ? "السلة فارغة. أضيفي منتجاً أولاً."
                        : "Your cart is empty."
                );

                return;

            }


            let message = "";


            if (currentLanguage === "ar") {

                message =
                    "السلام عليكم، أريد طلب المنتجات التالية:\n\n";

            } else {

                message =
                    "Hello, I would like to order:\n\n";

            }


            let total = 0;


            cart.forEach(function (item) {

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
                "----------------\n";


            message +=
                currentLanguage === "ar"
                    ? "المجموع: "
                    : "Total: ";


            message +=
                total + " DH";


            const whatsappURL =
                "https://wa.me/" +
                WHATSAPP_NUMBER +
                "?text=" +
                encodeURIComponent(message);


            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );

}


// ======================================================
// روابط البريد الإلكتروني
// ======================================================

const emailLinks =
    document.querySelectorAll(
        'a[href^="mailto:"]'
    );


emailLinks.forEach(function (link) {

    link.addEventListener(
        "click",
        function () {

            // نترك الهاتف يفتح تطبيق البريد

        }
    );

});


// ======================================================
// جعل المنتجات قابلة للضغط
// ======================================================

document
    .querySelectorAll(".product-card")
    .forEach(function (card) {

        card.style.cursor = "pointer";


        card.addEventListener(
            "click",
            function (event) {

                // إذا ضغط المستخدم على زر السلة
                // لا نفتح نافذة ثانية

                if (
                    event.target.closest(".add-cart")
                ) {

                    return;

                }


                const button =
                    card.querySelector(".add-cart");


                if (button) {

                    openProductOptions(button);

                }

            }
        );

    });


// ======================================================
// حماية النصوص
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
// تشغيل المتجر
// ======================================================

updateLanguage();

updateSearchPlaceholder();

updateCart();

setupAddCartButtons();
