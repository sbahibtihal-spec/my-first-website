document.addEventListener("DOMContentLoaded", () => {

    let cart =
        JSON.parse(localStorage.getItem("sabihCart") || "[]");


    const $ = (selector) =>
        document.querySelector(selector);

    const $$ = (selector) =>
        [...document.querySelectorAll(selector)];


    const cartOverlay = $("#cart");
    const cartItems = $("#cart-items");
    const cartCount = $("#cart-count");
    const cartTotal = $("#cart-total");


    function saveCart(){

        localStorage.setItem(
            "sabihCart",
            JSON.stringify(cart)
        );

    }


    function renderCart(){

        if(!cart.length){

            cartItems.innerHTML =
                '<p style="text-align:center;color:#888;padding:35px 0">السلة فارغة 🛒</p>';

            cartCount.textContent = "0";
            cartTotal.textContent = "0 DH";

            return;
        }


        let total = 0;
        let count = 0;


        cartItems.innerHTML =
            cart.map((item, index) => {

                const sum =
                    item.price * item.quantity;

                total += sum;
                count += item.quantity;


                return `
                    <div class="cart-item">

                        <div>

                            <h4>
                                ${item.name}
                            </h4>

                            <p>
                                ${item.price} DH × ${item.quantity}
                            </p>

                        </div>


                        <div class="cart-actions">

                            <button
                                data-i="${index}"
                                data-act="minus">
                                −
                            </button>


                            <b>
                                ${item.quantity}
                            </b>


                            <button
                                data-i="${index}"
                                data-act="plus">
                                +
                            </button>


                            <button
                                class="remove"
                                data-i="${index}"
                                data-act="remove">
                                ×
                            </button>

                        </div>

                    </div>
                `;

            }).join("");


        cartCount.textContent = count;

        cartTotal.textContent =
            total + " DH";

    }



    $$(".add-cart").forEach(button => {

        button.addEventListener("click", () => {

            const name =
                button.dataset.name;

            const price =
                Number(button.dataset.price);


            const found =
                cart.find(item =>
                    item.name === name
                );


            if(found){

                found.quantity++;

            }else{

                cart.push({
                    name: name,
                    price: price,
                    quantity: 1
                });

            }


            saveCart();
            renderCart();
            openCart();

            toast(
                "تمت إضافة المنتج إلى السلة 🛍️"
            );

        });

    });



    cartItems.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "button[data-act]"
                );


            if(!button) return;


            const index =
                Number(button.dataset.i);

            const action =
                button.dataset.act;


            if(action === "plus"){

                cart[index].quantity++;

            }


            if(action === "minus"){

                cart[index].quantity--;

                if(
                    cart[index].quantity <= 0
                ){

                    cart.splice(index,1);

                }

            }


            if(action === "remove"){

                cart.splice(index,1);

            }


            saveCart();
            renderCart();

        }
    );



    function openCart(){

        cartOverlay.classList.add("active");

        cartOverlay.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    function closeCart(){

        cartOverlay.classList.remove("active");

        cartOverlay.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    $("#cart-button")
        .addEventListener(
            "click",
            openCart
        );


    $("#close-cart")
        .addEventListener(
            "click",
            closeCart
        );


    cartOverlay.addEventListener(
        "click",
        event => {

            if(
                event.target === cartOverlay
            ){

                closeCart();

            }

        }
    );



    /* WHATSAPP */

    $("#checkout")
        .addEventListener(
            "click",
            () => {

                if(!cart.length){

                    alert(
                        "السلة فارغة. أضيفي منتجًا أولاً."
                    );

                    return;
                }


                let total = 0;


                let lines = [

                    "🛍️ *طلب جديد من SABIH STORE*",

                    ""

                ];


                cart.forEach(item => {

                    const sum =
                        item.price *
                        item.quantity;


                    total += sum;


                    lines.push(
                        `📦 ${item.name}`,
                        `الكمية: ${item.quantity}`,
                        `الثمن: ${item.price} DH`,
                        `المجموع: ${sum} DH`,
                        ""
                    );

                });


                lines.push(
                    `💰 *المجموع النهائي: ${total} DH*`,
                    "",
                    "مرحبًا، أريد تأكيد هذا الطلب."
                );


                const whatsappURL =
                    "https://wa.me/212703166572?text=" +
                    encodeURIComponent(
                        lines.join("\n")
                    );


                window.open(
                    whatsappURL,
                    "_blank"
                );

            }
        );



    /* SEARCH */

    const search =
        $("#search-input");

    const products =
        $$(".product-card");

    const noResults =
        $("#no-results");


    function filterProducts(
        category = "all"
    ){

        const term =
            search.value
                .trim()
                .toLowerCase();


        let visible = 0;


        products.forEach(product => {

            const correctCategory =
                category === "all" ||
                product.dataset.category ===
                category;


            const correctText =
                !term ||
                product.dataset.name
                    .toLowerCase()
                    .includes(term);


            const show =
                correctCategory &&
                correctText;


            product.style.display =
                show ? "" : "none";


            if(show){

                visible++;

            }

        });


        noResults.hidden =
            visible !== 0;

    }



    function activateFilter(
        category
    ){

        $$(".filter-pill,.category-card")
            .forEach(element => {

                element.classList.toggle(
                    "active",
                    element.dataset.filter ===
                    category
                );

            });


        filterProducts(category);

    }



    $$(".filter-pill,.category-card")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    activateFilter(
                        button.dataset.filter
                    );


                    if(
                        button.classList.contains(
                            "category-card"
                        )
                    ){

                        document
                            .querySelector("#products")
                            .scrollIntoView({
                                behavior:"smooth"
                            });

                    }

                }
            );

        });



    search.addEventListener(
        "input",
        () => {

            const active =
                $(".filter-pill.active")
                    ?.dataset.filter ||
                "all";


            filterProducts(active);

        }
    );



    /* FAVORITES */

    $$(".quick")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    button.textContent =
                        button.textContent === "♥"
                            ? "♡"
                            : "♥";

                }
            );

        });



    /* MOBILE MENU */

    $("#menu-toggle")
        .addEventListener(
            "click",
            () => {

                $("#main-nav")
                    .classList.toggle("open");

            }
        );



    /* LANGUAGE */

    $("#language-toggle")
        .addEventListener(
            "click",
            () => {

                const isArabic =
                    document.documentElement.lang ===
                    "ar";


                document.documentElement.lang =
                    isArabic
                        ? "en"
                        : "ar";


                document.documentElement.dir =
                    isArabic
                        ? "ltr"
                        : "rtl";


                toast(
                    isArabic
                        ? "English mode"
                        : "تم الرجوع للعربية"
                );

            }
        );



    /* NOTIFICATION */

    function toast(text){

        const old =
            $(".toast");


        if(old){

            old.remove();

        }


        const notification =
            document.createElement("div");


        notification.className =
            "toast";


        notification.textContent =
            text;


        Object.assign(
            notification.style,
            {
                position:"fixed",
                bottom:"22px",
                right:"22px",
                zIndex:"9999",
                background:"#1c1917",
                color:"#fff",
                padding:"12px 17px",
                borderRadius:"7px",
                fontSize:"12px",
                boxShadow:
                    "0 12px 30px rgba(0,0,0,.2)"
            }
        );


        document.body.appendChild(
            notification
        );


        setTimeout(
            () => notification.remove(),
            2200
        );

    }



    /* START */

    renderCart();

});
