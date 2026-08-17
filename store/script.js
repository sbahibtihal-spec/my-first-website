// =====================================================
// NAIMA STORE - SCRIPT.JS
// =====================================================

// =====================================================
// SETTINGS
// =====================================================

const WHATSAPP_NUMBER = "212703166572";
const STORE_EMAIL = "sbahibtihal@gmail.com";


// =====================================================
// PRODUCTS
// =====================================================

const products = [

    {
        id: 1,
        name: "حقيبة نسائية أنيقة",
        nameEn: "Elegant Women's Bag",
        category: "الحقائب",
        categoryEn: "Bags",
        price: 250,
        image: "https://placehold.co/800x800/e9ddff/5b3ee4?text=Bag",
        description: "حقيبة أنيقة وعملية للاستعمال اليومي.",
        descriptionEn: "Elegant and practical bag for everyday use.",
        colors: ["أسود", "بني", "بيج"],
        colorsEn: ["Black", "Brown", "Beige"],
        sizes: ["صغير", "متوسط", "كبير"],
        sizesEn: ["Small", "Medium", "Large"]
    },

    {
        id: 2,
        name: "حذاء رياضي مريح",
        nameEn: "Comfortable Sneakers",
        category: "الأحذية",
        categoryEn: "Shoes",
        price: 350,
        image: "https://placehold.co/800x800/dff3ff/1769aa?text=Shoes",
        description: "حذاء رياضي عصري ومريح للاستعمال اليومي.",
        descriptionEn: "Modern and comfortable sneakers for everyday use.",
        colors: ["أبيض", "أسود", "وردي"],
        colorsEn: ["White", "Black", "Pink"],
        sizes: ["36", "37", "38", "39", "40", "41"],
        sizesEn: ["36", "37", "38", "39", "40", "41"]
    },

    {
        id: 3,
        name: "ساعة ذكية",
        nameEn: "Smart Watch",
        category: "الإكسسوارات",
        categoryEn: "Accessories",
        price: 399,
        image: "https://placehold.co/800x800/fff1c7/9a6500?text=Watch",
        description: "ساعة ذكية أنيقة مناسبة للاستعمال اليومي.",
        descriptionEn: "Elegant smart watch for everyday use.",
        colors: ["أسود", "فضي", "وردي"],
        colorsEn: ["Black", "Silver", "Pink"],
        sizes: ["موحد"],
        sizesEn: ["One Size"]
    },

    {
        id: 4,
        name: "نظارات شمسية عصرية",
        nameEn: "Modern Sunglasses",
        category: "الإكسسوارات",
        categoryEn: "Accessories",
        price: 180,
        image: "https://placehold.co/800x800/e1f8e9/25834a?text=Glasses",
        description: "نظارات شمسية عصرية وأنيقة.",
        descriptionEn: "Modern and stylish sunglasses.",
        colors: ["أسود", "بني"],
        colorsEn: ["Black", "Brown"],
        sizes: ["موحد"],
        sizesEn: ["One Size"]
    },

    {
        id: 5,
        name: "فستان أنيق",
        nameEn: "Elegant Dress",
        category: "الملابس",
        categoryEn: "Clothing",
        price: 299,
        image: "https://placehold.co/800x800/fce4ec/ad1457?text=Dress",
        description: "فستان أنيق مناسب للمناسبات والإطلالات اليومية.",
        descriptionEn: "Elegant dress for occasions and everyday looks.",
        colors: ["أسود", "أحمر", "وردي"],
        colorsEn: ["Black", "Red", "Pink"],
        sizes: ["S", "M", "L", "XL"],
        sizesEn: ["S", "M", "L", "XL"]
    },

    {
        id: 6,
        name: "حقيبة ظهر",
        nameEn: "Backpack",
        category: "الحقائب",
        categoryEn: "Bags",
        price: 220,
        image: "https://placehold.co/800x800/e8eaf6/3949ab?text=Backpack",
        description: "حقيبة ظهر عملية وأنيقة.",
        descriptionEn: "Practical and stylish backpack.",
        colors: ["أسود", "أزرق", "رمادي"],
        colorsEn: ["Black", "Blue", "Gray"],
        sizes: ["متوسط", "كبير"],
        sizesEn: ["Medium", "Large"]
    }

];


// =====================================================
// VARIABLES
// =====================================================

let cart = [];

let currentLanguage = "ar";

let selectedProduct = null;

let selectedColor = "";

let selectedSize = "";

let selectedQuantity = 1;


// =====================================================
// ELEMENTS
// =====================================================

const languageToggle =
    document.getElementById("language-toggle");

const searchInput =
    document.getElementById("search-input");

const productsGrid =
    document.getElementById("products-grid");

const categoriesContainer =
    document.getElementById("categories");

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

const checkoutButton =
    document.getElementById("checkout");

const productModal =
    document.getElementById("product-modal");

const closeProductModal =
    document.getElementById("close-product-modal");

const modalProductImage =
    document.getElementById("modal-product-image");

const modalProductName =
    document.getElementById("modal-product-name");

const modalProductDescription =
    document.getElementById("modal-product-description");

const modalProductPrice =
    document.getElementById("modal-product-price");

const modalProductCategory =
    document.getElementById("modal-product-category");

const colorOptions =
    document.getElementById("color-options");

const sizeOptions =
    document.getElementById("size-options");

const selectedColorText =
    document.getElementById("selected-color");

const selectedSizeText =
    document.getElementById("selected-size");

const quantityText =
    document.getElementById("product-quantity");

const quantityMinus =
    document.getElementById("quantity-minus");

const quantityPlus =
    document.getElementById("quantity-plus");

const modalAddCart =
    document.getElementById("modal-add-cart");


// =====================================================
// LOCAL STORAGE
// =====================================================

function saveCart() {

    localStorage.setItem(
        "naimaStoreCart",
        JSON.stringify(cart)
    );

}


function loadCart() {

    try {

        const saved =
            localStorage.getItem("naimaStoreCart");

        if (saved) {

            cart = JSON.parse(saved);

        }

    } catch (error) {

        cart = [];

    }

}


// =====================================================
// LANGUAGE
// =====================================================

function updateLanguage() {

    document.documentElement.lang =
        currentLanguage;

    document.documentElement.dir =
        currentLanguage === "ar"
            ? "rtl"
            : "ltr";


    if (languageToggle) {

        languageToggle.textContent =
            currentLanguage === "ar"
                ? "EN"
                : "AR";

    }


    if (searchInput) {

        searchInput.placeholder =
            currentLanguage === "ar"
                ? "🔎 ابحثي عن منتج..."
                : "🔎 Search for a product...";

    }


    renderCategories();

    renderProducts();

    updateCart();

}


// =====================================================
// LANGUAGE BUTTON
// =====================================================

if (languageToggle) {

    languageToggle.addEventListener(
        "click",
        function () {

            currentLanguage =
                currentLanguage === "ar"
                    ? "en"
                    : "ar";

            updateLanguage();

        }
    );

}


// =====================================================
// CATEGORIES
// =====================================================

function getCategories() {

    const categories = [];

    products.forEach(function (product) {

        if (!categories.includes(product.category)) {

            categories.push(product.category);

        }

    });

    return categories;

}


function renderCategories() {

    if (!categoriesContainer) return;

    const categories =
        getCategories();


    categoriesContainer.innerHTML = "";


    categories.forEach(function (category) {

        const product =
            products.find(
                p => p.category === category
            );


        const button =
            document.createElement("button");

        button.className =
            "category-card";


        button.type = "button";


        button.innerHTML = `

            <span>
                ${getCategoryIcon(category)}
            </span>

            <h3>
                ${
                    currentLanguage === "ar"
                        ? category
                        : product.categoryEn
                }
            </h3>

        `;


        button.addEventListener(
            "click",
            function () {

                if (searchInput) {

                    searchInput.value = "";

                }

                renderProducts(category);

                document
                    .getElementById("products-section")
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );


        categoriesContainer.appendChild(button);

    });

}


function getCategoryIcon(category) {

    if (category === "الحقائب")
        return "👜";

    if (category === "الأحذية")
        return "👟";

    if (category === "الملابس")
        return "👗";

    if (category === "الإكسسوارات")
        return "💎";

    return "🛍️";

}


// =====================================================
// PRODUCTS
// =====================================================

function renderProducts(category = null) {

    if (!productsGrid) return;


    const searchText =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";


    let filteredProducts =
        products.filter(function (product) {

            const name =
                currentLanguage === "ar"
                    ? product.name
                    : product.nameEn;

            const description =
                currentLanguage === "ar"
                    ? product.description
                    : product.descriptionEn;


            const matchesSearch =
                name
                    .toLowerCase()
                    .includes(searchText)

                ||

                description
                    .toLowerCase()
                    .includes(searchText);


            const matchesCategory =
                !category ||
                product.category === category;


            return (
                matchesSearch &&
                matchesCategory
            );

        });


    productsGrid.innerHTML = "";


    if (filteredProducts.length === 0) {

        productsGrid.innerHTML = `

            <div class="no-products">

                ${
                    currentLanguage === "ar"
                        ? "لم نجد أي منتج 🔎"
                        : "No products found 🔎"
                }

            </div>

        `;

        return;

    }


    filteredProducts.forEach(function (product) {

        const card =
            document.createElement("article");


        card.className =
            "product-card";


        const name =
            currentLanguage === "ar"
                ? product.name
                : product.nameEn;


        const description =
            currentLanguage === "ar"
                ? product.description
                : product.descriptionEn;


        const category =
            currentLanguage === "ar"
                ? product.category
                : product.categoryEn;


        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${name}"
                    loading="lazy"
                >

            </div>


            <div class="product-info">

                <span class="product-badge">
                    ${category}
                </span>


                <h3>
                    ${name}
                </h3>


                <p>
                    ${description}
                </p>


                <div class="product-bottom">

                    <strong>
                        ${product.price} DH
                    </strong>


                    <button
                        type="button"
                        class="add-cart"
                    >
                        🛒 ${
                            currentLanguage === "ar"
                                ? "اختيار"
                                : "Choose"
                        }
                    </button>

                </div>

            </div>

        `;


        // الضغط على الصورة أو المنتج

        card.addEventListener(
            "click",
            function () {

                openProduct(product.id);

            }
        );


        // زر اختيار المنتج

        const addButton =
            card.querySelector(".add-cart");


        addButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                openProduct(product.id);

            }
        );


        productsGrid.appendChild(card);

    });

}


// =====================================================
// SEARCH
// =====================================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        function () {

            renderProducts();

        }
    );

}


// =====================================================
// OPEN PRODUCT
// =====================================================

function openProduct(productId) {

    selectedProduct =
        products.find(
            product =>
                product.id === productId
        );


    if (!selectedProduct) return;


    selectedColor =
        selectedProduct.colors.length > 0
            ? selectedProduct.colors[0]
            : "";


    selectedSize =
        selectedProduct.sizes.length > 0
            ? selectedProduct.sizes[0]
            : "";


    selectedQuantity = 1;


    const product =
        selectedProduct;


    const name =
        currentLanguage === "ar"
            ? product.name
            : product.nameEn;


    const description =
        currentLanguage === "ar"
            ? product.description
            : product.descriptionEn;


    const category =
        currentLanguage === "ar"
            ? product.category
            : product.categoryEn;


    modalProductImage.src =
        product.image;


    modalProductImage.alt =
        name;


    modalProductName.textContent =
        name;


    modalProductDescription.textContent =
        description;


    modalProductPrice.textContent =
        product.price + " DH";


    modalProductCategory.textContent =
        category;


    quantityText.textContent =
        selectedQuantity;


    renderColorOptions();

    renderSizeOptions();


    productModal.classList.add("active");

}


// =====================================================
// CLOSE PRODUCT
// =====================================================

if (closeProductModal) {

    closeProductModal.addEventListener(
        "click",
        function () {

            productModal.classList.remove("active");

        }
    );

}


if (productModal) {

    productModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === productModal
            ) {

                productModal.classList.remove(
                    "active"
                );

            }

        }
    );

}


// =====================================================
// COLORS
// =====================================================

function renderColorOptions() {

    colorOptions.innerHTML = "";


    if (
        !selectedProduct ||
        selectedProduct.colors.length === 0
    ) {

        document
            .getElementById("color-section")
            .style.display = "none";

        return;

    }


    document
        .getElementById("color-section")
        .style.display = "block";


    selectedProduct.colors.forEach(
        function (color, index) {

            const button =
                document.createElement("button");


            button.type = "button";


            button.className =
                "option-button";


            if (
                color === selectedColor
            ) {

                button.classList.add(
                    "selected"
                );

            }


            const colorIndex =
                index;


            const displayColor =
                currentLanguage === "ar"
                    ? color
                    : selectedProduct.colorsEn[
                        colorIndex
                    ];


            button.textContent =
                displayColor;


            button.addEventListener(
                "click",
                function () {

                    selectedColor =
                        color;

                    selectedColorText.textContent =
                        currentLanguage === "ar"
                            ? color
                            : selectedProduct.colorsEn[
                                colorIndex
                            ];


                    renderColorOptions();

                }
            );


            colorOptions.appendChild(button);

        }
    );


    selectedColorText.textContent =
        currentLanguage === "ar"
            ? selectedColor
            : selectedProduct.colorsEn[
                selectedProduct.colors.indexOf(
                    selectedColor
                )
            ];

}


// =====================================================
// SIZES
// =====================================================

function renderSizeOptions() {

    sizeOptions.innerHTML = "";


    if (
        !selectedProduct ||
        selectedProduct.sizes.length === 0
    ) {

        document
            .getElementById("size-section")
            .style.display = "none";

        return;

    }


    document
        .getElementById("size-section")
        .style.display = "block";


    selectedProduct.sizes.forEach(
        function (size, index) {

            const button =
                document.createElement("button");


            button.type = "button";


            button.className =
                "option-button";


            if (
                size === selectedSize
            ) {

                button.classList.add(
                    "selected"
                );

            }


            button.textContent =
                currentLanguage === "ar"
                    ? size
                    : selectedProduct.sizesEn[
                        index
                    ];


            button.addEventListener(
                "click",
                function () {

                    selectedSize =
                        size;


                    selectedSizeText.textContent =
                        currentLanguage === "ar"
                            ? size
                            : selectedProduct.sizesEn[
                                index
                            ];


                    renderSizeOptions();

                }
            );


            sizeOptions.appendChild(button);

        }
    );


    selectedSizeText.textContent =
        currentLanguage === "ar"
            ? selectedSize
            : selectedProduct.sizesEn[
                selectedProduct.sizes.indexOf(
                    selectedSize
                )
            ];

}


// =====================================================
// QUANTITY
// =====================================================

if (quantityPlus) {

    quantityPlus.addEventListener(
        "click",
        function () {

            selectedQuantity++;

            quantityText.textContent =
                selectedQuantity;

        }
    );

}


if (quantityMinus) {

    quantityMinus.addEventListener(
        "click",
        function () {

            if (selectedQuantity > 1) {

                selectedQuantity--;

            }

            quantityText.textContent =
                selectedQuantity;

        }
    );

}


// =====================================================
// ADD TO CART FROM PRODUCT
// =====================================================

if (modalAddCart) {

    modalAddCart.addEventListener(
        "click",
        function () {

            if (!selectedProduct) return;


            const existingItem =
                cart.find(function (item) {

                    return (
                        item.productId ===
                            selectedProduct.id

                        &&

                        item.color ===
                            selectedColor

                        &&

                        item.size ===
                            selectedSize
                    );

                });


            if (existingItem) {

                existingItem.quantity +=
                    selectedQuantity;

            } else {

                cart.push({

                    productId:
                        selectedProduct.id,

                    name:
                        selectedProduct.name,

                    price:
                        selectedProduct.price,

                    image:
                        selectedProduct.image,

                    color:
                        selectedColor,

                    size:
                        selectedSize,

                    quantity:
                        selectedQuantity

                });

            }


            saveCart();

            updateCart();


            productModal.classList.remove(
                "active"
            );


            cartWindow.classList.add(
                "active"
            );

        }
    );

}


// =====================================================
// OPEN CART
// =====================================================

if (cartButton) {

    cartButton.addEventListener(
        "click",
        function () {

            updateCart();

            cartWindow.classList.add(
                "active"
            );

        }
    );

}


// =====================================================
// CLOSE CART
// =====================================================

if (closeCartButton) {

    closeCartButton.addEventListener(
        "click",
        function () {

            cartWindow.classList.remove(
                "active"
            );

        }
    );

}


if (cartWindow) {

    cartWindow.addEventListener(
        "click",
        function (event) {

            if (
                event.target === cartWindow
            ) {

                cartWindow.classList.remove(
                    "active"
                );

            }

        }
    );

}


// =====================================================
// UPDATE CART
// =====================================================

function updateCart() {

    if (!cartItems) return;


    cartItems.innerHTML = "";


    let total = 0;

    let count = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <p class="empty-cart">

                ${
                    currentLanguage === "ar"
                        ? "السلة فارغة 🛒"
                        : "Your cart is empty 🛒"
                }

            </p>

        `;

    }


    cart.forEach(
        function (item, index) {

            const itemTotal =
                item.price *
                item.quantity;


            total += itemTotal;

            count += item.quantity;


            const product =
                products.find(
                    p =>
                        p.id ===
                        item.productId
                );


            const itemElement =
                document.createElement("div");


            itemElement.className =
                "cart-item";


            itemElement.innerHTML = `

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    class="cart-item-image"
                >


                <div class="cart-item-info">

                    <h4>
                        ${
                            currentLanguage === "ar"
                                ? item.name
                                : product?.nameEn ||
                                  item.name
                        }
                    </h4>


                    <p>
                        ${item.price} DH
                    </p>


                    <small>

                        ${
                            currentLanguage === "ar"
                                ? "اللون"
                                : "Color"
                        }:

                        ${item.color}

                        |

                        ${
                            currentLanguage === "ar"
                                ? "المقاس"
                                : "Size"
                        }:

                        ${item.size}

                    </small>

                </div>


                <div class="cart-item-actions">

                    <button
                        type="button"
                        class="quantity-btn"
                        data-index="${index}"
                        data-action="plus"
                    >
                        +
                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        type="button"
                        class="quantity-btn"
                        data-index="${index}"
                        data-action="minus"
                    >
                        −
                    </button>


                    <button
                        type="button"
                        class="remove-item"
                        data-index="${index}"
                    >
                        🗑️
                    </button>

                </div>

            `;


            cartItems.appendChild(
                itemElement
            );

        }
    );


    cartCount.textContent =
        count;


    cartTotal.textContent =
        total.toLocaleString("fr-MA") +
        " DH";


    // QUANTITY BUTTONS

    document
        .querySelectorAll(".quantity-btn")
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                button.dataset.index
                            );


                        const action =
                            button.dataset.action;


                        if (action === "plus") {

                            cart[index].quantity++;

                        } else {

                            cart[index].quantity--;

                            if (
                                cart[index].quantity <= 0
                            ) {

                                cart.splice(
                                    index,
                                    1
                                );

                            }

                        }


                        saveCart();

                        updateCart();

                    }
                );

            }
        );


    // REMOVE BUTTONS

    document
        .querySelectorAll(".remove-item")
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                button.dataset.index
                            );


                        cart.splice(
                            index,
                            1
                        );


                        saveCart();

                        updateCart();

                    }
                );

            }
        );

}


// =====================================================
// CHECKOUT / WHATSAPP
// =====================================================

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


            let message =
                currentLanguage === "ar"

                    ? "السلام عليكم، أريد طلب المنتجات التالية:\n\n"

                    : "Hello, I would like to order:\n\n";


            let total = 0;


            cart.forEach(
                function (item) {

                    const itemTotal =
                        item.price *
                        item.quantity;


                    total += itemTotal;


                    message +=

                        "🛍️ " +

                        item.name +

                        "\n" +

                        (
                            currentLanguage === "ar"
                                ? "اللون: "
                                : "Color: "
                        ) +

                        item.color +

                        "\n" +

                        (
                            currentLanguage === "ar"
                                ? "المقاس: "
                                : "Size: "
                        ) +

                        item.size +

                        "\n" +

                        (
                            currentLanguage === "ar"
                                ? "الكمية: "
                                : "Quantity: "
                        ) +

                        item.quantity +

                        "\n" +

                        "السعر: " +

                        itemTotal +

                        " DH\n\n";

                }
            );


            message +=

                "💰 " +

                (
                    currentLanguage === "ar"
                        ? "المجموع: "
                        : "Total: "
                ) +

                total +

                " DH\n\n";


            message +=

                currentLanguage === "ar"

                    ? "💵 طريقة الدفع: الدفع عند الاستلام"

                    : "💵 Payment: Cash on delivery";


            const whatsappURL =

                "https://wa.me/" +

                WHATSAPP_NUMBER +

                "?text=" +

                encodeURIComponent(
                    message
                );


            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );

}


// =====================================================
// ESCAPE HTML
// =====================================================

function escapeHTML(text) {

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// =====================================================
// INITIALIZE
// =====================================================

loadCart();

renderCategories();

renderProducts();

updateCart();

updateLanguage();
