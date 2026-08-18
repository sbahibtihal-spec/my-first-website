/* =========================================================
   SABIH STORE — Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const menuToggle = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");

  /* =========================
     MOBILE MENU
  ========================= */

  if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {
      mainNav.classList.toggle("open");

      const opened = mainNav.classList.contains("open");

      menuToggle.setAttribute(
        "aria-expanded",
        opened ? "true" : "false"
      );
    });

    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
      });
    });
  }


  /* =========================
     PRODUCT FILTER
  ========================= */

  const filterButtons =
    document.querySelectorAll("[data-filter]");

  const products =
    document.querySelectorAll(".product-card");

  const searchInput =
    document.getElementById("search-input");

  let currentFilter = "all";


  function filterProducts() {

    const search =
      searchInput
        ? searchInput.value.trim().toLowerCase()
        : "";

    let visible = 0;

    products.forEach(product => {

      const category =
        product.dataset.category;

      const name =
        product.dataset.name.toLowerCase();

      const categoryMatch =
        currentFilter === "all" ||
        category === currentFilter;

      const searchMatch =
        !search ||
        name.includes(search);

      if (categoryMatch && searchMatch) {
        product.style.display = "";
        visible++;
      } else {
        product.style.display = "none";
      }

    });


    const noResults =
      document.getElementById("no-results");

    if (noResults) {
      noResults.hidden = visible !== 0;
    }
  }


  filterButtons.forEach(button => {

    button.addEventListener("click", () => {

      const filter =
        button.dataset.filter;

      currentFilter = filter;

      document
        .querySelectorAll(".filter-pill")
        .forEach(btn => {
          btn.classList.remove("active");
        });

      document
        .querySelectorAll(
          `.filter-pill[data-filter="${filter}"]`
        )
        .forEach(btn => {
          btn.classList.add("active");
        });

      document
        .querySelectorAll(".category-card")
        .forEach(btn => {
          btn.classList.toggle(
            "active",
            btn.dataset.filter === filter
          );
        });

      filterProducts();

      if (
        button.classList.contains("category-card")
      ) {
        document
          .getElementById("products")
          ?.scrollIntoView({
            behavior: "smooth"
          });
      }

    });

  });


  if (searchInput) {
    searchInput.addEventListener(
      "input",
      filterProducts
    );
  }


  /* =========================
     CART
  ========================= */

  const cartButton =
    document.getElementById("cart-button");

  const cartOverlay =
    document.getElementById("cart");

  const closeCart =
    document.getElementById("close-cart");

  const cartCount =
    document.getElementById("cart-count");

  const cartItems =
    document.getElementById("cart-items");

  const cartTotal =
    document.getElementById("cart-total");

  const checkout =
    document.getElementById("checkout");


  let cart = [];


  function saveCart() {
    localStorage.setItem(
      "sabih_cart",
      JSON.stringify(cart)
    );
  }


  function loadCart() {

    try {

      const saved =
        localStorage.getItem("sabih_cart");

      if (saved) {
        cart = JSON.parse(saved);
      }

    } catch {
      cart = [];
    }

    renderCart();
  }


  function openCart() {

    if (!cartOverlay) return;

    cartOverlay.classList.add("open");

    cartOverlay.setAttribute(
      "aria-hidden",
      "false"
    );
  }


  function closeCartPanel() {

    if (!cartOverlay) return;

    cartOverlay.classList.remove("open");

    cartOverlay.setAttribute(
      "aria-hidden",
      "true"
    );
  }


  function addToCart(name, price) {

    const existing =
      cart.find(item => item.name === name);

    if (existing) {

      existing.quantity++;

    } else {

      cart.push({
        name,
        price: Number(price),
        quantity: 1
      });

    }

    saveCart();
    renderCart();
    openCart();

  }


  function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();
    renderCart();

  }


  function renderCart() {

    if (!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;


    cart.forEach((item, index) => {

      total +=
        item.price * item.quantity;

      count += item.quantity;


      const row =
        document.createElement("div");

      row.style.display = "flex";
      row.style.justifyContent = "space-between";
      row.style.alignItems = "center";
      row.style.gap = "10px";
      row.style.padding = "15px 0";
      row.style.borderBottom =
        "1px solid #e7dfd5";


      row.innerHTML = `
        <div>
          <strong>${item.name}</strong>
          <small style="display:block;color:#777">
            ${item.quantity} × ${item.price} DH
          </small>
        </div>

        <button
          type="button"
          data-remove="${index}"
          style="
            background:none;
            color:#9a3b3b;
            font-size:18px;
          "
        >
          ×
        </button>
      `;


      cartItems.appendChild(row);

    });


    cartCount.textContent = count;

    cartTotal.textContent =
      `${total} DH`;


    cartItems
      .querySelectorAll("[data-remove]")
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            removeFromCart(
              Number(button.dataset.remove)
            );

          }
        );

      });

  }


  document
    .querySelectorAll(".add-cart")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          addToCart(
            button.dataset.name,
            button.dataset.price
          );

        }
      );

    });


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

        if (event.target === cartOverlay) {
          closeCartPanel();
        }

      }
    );

  }


  /* =========================
     WHATSAPP CHECKOUT
  ========================= */

  if (checkout) {

    checkout.addEventListener(
      "click",
      () => {

        if (!cart.length) {

          alert("السلة فارغة.");

          return;
        }


        let message =
          "مرحباً SABIH، أريد تأكيد طلبي:%0A%0A";

        let total = 0;


        cart.forEach(item => {

          const subtotal =
            item.price * item.quantity;

          total += subtotal;

          message +=
            `• ${item.name} — ${item.quantity} × ${item.price} DH%0A`;

        });


        message +=
          `%0Aالمجموع: ${total} DH`;


        window.open(
          `https://wa.me/212703166572?text=${message}`,
          "_blank"
        );

      }
    );

  }


  /* =========================
     FAVORITES
  ========================= */

  document
    .querySelectorAll(".quick")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          if (
            button.textContent.trim() === "♡"
          ) {

            button.textContent = "♥";
            button.style.color =
              "#b08a4a";

          } else {

            button.textContent = "♡";
            button.style.color = "";

          }

        }
      );

    });


  /* =========================
     INITIALIZE
  ========================= */

  loadCart();
  filterProducts();

});
/* =========================================
   SABIH STORE - MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       VARIABLES
    =============================== */

    const menuToggle = document.getElementById("menu-toggle");
    const mainNav = document.getElementById("main-nav");

    const cartButton = document.getElementById("cart-button");
    const cartOverlay = document.getElementById("cart");
    const closeCart = document.getElementById("close-cart");

    const cartItemsContainer = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    const checkoutButton = document.getElementById("checkout");

    const searchInput = document.getElementById("search-input");
    const noResults = document.getElementById("no-results");

    const products = [...document.querySelectorAll(".product-card")];

    const filterButtons = [
        ...document.querySelectorAll(".filter-pill")
    ];

    const categoryButtons = [
        ...document.querySelectorAll(".category-card")
    ];

    let currentFilter = "all";

    let cart = JSON.parse(
        localStorage.getItem("sabihCart")
    ) || [];


    /* ===============================
       MOBILE MENU
    =============================== */

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            mainNav.classList.toggle("open");

            const isOpen =
                mainNav.classList.contains("open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

            menuToggle.textContent =
                isOpen ? "×" : "☰";
        });


        mainNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("open");

                menuToggle.textContent = "☰";

            });

        });

    }


    /* ===============================
       FILTER PRODUCTS
    =============================== */

    function filterProducts(category) {

        currentFilter = category;

        const searchValue =
            searchInput
                ? searchInput.value
                    .trim()
                    .toLowerCase()
                : "";

        let visibleProducts = 0;


        products.forEach(product => {

            const productCategory =
                product.dataset.category || "";

            const productName =
                product.dataset.name || "";

            const matchesCategory =
                category === "all" ||
                productCategory === category;

            const matchesSearch =
                productName
                    .toLowerCase()
                    .includes(searchValue);

            if (
                matchesCategory &&
                matchesSearch
            ) {

                product.style.display = "";

                visibleProducts++;

            } else {

                product.style.display = "none";

            }

        });


        if (noResults) {

            noResults.hidden =
                visibleProducts !== 0;

        }


        /* Update filter buttons */

        filterButtons.forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.filter === category
            );

        });


        /* Update category cards */

        categoryButtons.forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.filter === category
            );

        });

    }


    /* ===============================
       FILTER BUTTONS
    =============================== */

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const category =
                button.dataset.filter;

            filterProducts(category);

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


    /* ===============================
       CATEGORY CARDS
    =============================== */

    categoryButtons.forEach(button => {

        button.addEventListener("click", () => {

            const category =
                button.dataset.filter;

            filterProducts(category);

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


    /* ===============================
       SEARCH
    =============================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            () => {

                filterProducts(currentFilter);

            }
        );

    }


    /* ===============================
       CART FUNCTIONS
    =============================== */

    function saveCart() {

        localStorage.setItem(
            "sabihCart",
            JSON.stringify(cart)
        );

    }


    function getCartCount() {

        return cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    }


    function getCartTotal() {

        return cart.reduce(
            (total, item) =>
                total +
                item.price * item.quantity,
            0
        );

    }


    function updateCartCounter() {

        if (cartCount) {

            cartCount.textContent =
                getCartCount();

        }

    }


    function renderCart() {

        if (!cartItemsContainer) {
            return;
        }


        if (cart.length === 0) {

            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <div style="font-size:45px;margin-bottom:10px;">
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

            cartItemsContainer.innerHTML =
                cart.map((item, index) => `

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

                `).join("");

        }


        if (cartTotal) {

            cartTotal.textContent =
                `${getCartTotal()} DH`;

        }


        updateCartCounter();

        saveCart();

    }


    /* ===============================
       ESCAPE HTML
    =============================== */

    function escapeHTML(value) {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    }


    /* ===============================
       ADD TO CART
    =============================== */

    document
        .querySelectorAll(".add-cart")
        .forEach(button => {

            button.addEventListener("click", () => {

                const name =
                    button.dataset.name;

                const price =
                    Number(button.dataset.price);


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


                /* فتح السلة */

                openCart();

            });

        });


    /* ===============================
       CART ACTIONS
    =============================== */

    if (cartItemsContainer) {

        cartItemsContainer.addEventListener(
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


                if (
                    button.classList.contains(
                        "increase"
                    )
                ) {

                    cart[index].quantity++;

                }


                if (
                    button.classList.contains(
                        "decrease"
                    )
                ) {

                    cart[index].quantity--;

                    if (
                        cart[index].quantity <= 0
                    ) {

                        cart.splice(index, 1);

                    }

                }


                if (
                    button.classList.contains(
                        "remove"
                    )
                ) {

                    cart.splice(index, 1);

                }


                renderCart();

            }
        );

    }


    /* ===============================
       OPEN CART
    =============================== */

    function openCart() {

        if (!cartOverlay) return;

        cartOverlay.classList.add("active");

        cartOverlay.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";

    }


    /* ===============================
       CLOSE CART
    =============================== */

    function closeCartPanel() {

        if (!cartOverlay) return;

        cartOverlay.classList.remove("active");

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


    /* إغلاق عند الضغط خارج السلة */

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


    /* ===============================
       ESC KEY
    =============================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeCartPanel();

            }

        }
    );


    /* ===============================
       WHATSAPP CHECKOUT
    =============================== */

    if (checkoutButton) {

        checkoutButton.addEventListener(
            "click",
            () => {

                if (cart.length === 0) {

                    showNotification(
                        "السلة فارغة، أضيفي منتجًا أولاً."
                    );

                    return;

                }


                let message =
                    "السلام عليكم، أريد الطلب من SABIH STORE%0A%0A";


                cart.forEach(item => {

                    message +=
                        `• ${encodeURIComponent(item.name)} × ${item.quantity} — ${item.price * item.quantity} DH%0A`;

                });


                message +=
                    `%0Aالمجموع: ${getCartTotal()} DH%0A%0A`;

                message +=
                    "الاسم:%0A";

                message +=
                    "المدينة:%0A";

                message +=
                    "العنوان:%0A";

                message +=
                    "رقم الهاتف:%0A";


                const phone =
                    "212703166572";


                const whatsappURL =
                    `https://wa.me/${phone}?text=${message}`;


                window.open(
                    whatsappURL,
                    "_blank"
                );

            }
        );

    }


    /* ===============================
       FAVORITES
    =============================== */

    const favoriteButtons =
        document.querySelectorAll(".quick");


    let favorites =
        JSON.parse(
            localStorage.getItem(
                "sabihFavorites"
            )
        ) || [];


    favoriteButtons.forEach(button => {

        const card =
            button.closest(".product-card");

        if (!card) return;


        const name =
            card.dataset.name;


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


    /* ===============================
       NOTIFICATION
    =============================== */

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

            notification.classList.add(
                "show"
            );

        }, 20);


        setTimeout(() => {

            notification.classList.remove(
                "show"
            );


            setTimeout(() => {

                notification.remove();

            }, 300);

        }, 2200);

    }


    /* ===============================
       HEADER SHADOW ON SCROLL
    =============================== */

    const header =
        document.querySelector(".header");


    window.addEventListener(
        "scroll",
        () => {

            if (!header) return;


            if (window.scrollY > 20) {

                header.classList.add(
                    "scrolled"
                );

            } else {

                header.classList.remove(
                    "scrolled"
                );

            }

        },
        { passive: true }
    );


    /* ===============================
       REVEAL ANIMATION
    =============================== */

    const revealElements =
        document.querySelectorAll(
            ".product-card, .category-card, .about-grid, .contact-cards a"
        );


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

        element.classList.add(
            "reveal"
        );

        observer.observe(element);

    });


    /* ===============================
       INITIALIZE
    =============================== */

    renderCart();

    filterProducts("all");

});
