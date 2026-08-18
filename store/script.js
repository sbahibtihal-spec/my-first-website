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
