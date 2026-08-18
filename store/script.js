document.addEventListener("DOMContentLoaded", () => {

  /* ================= MENU ================= */

  const menuToggle = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");

  if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {
      mainNav.classList.toggle("open");
    });

    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
      });
    });
  }


  /* ================= PRODUCTS ================= */

  const products = [...document.querySelectorAll(".product-card")];
  const filterButtons = [
    ...document.querySelectorAll(".filter-pill"),
    ...document.querySelectorAll(".category-card")
  ];

  const searchInput = document.getElementById("search-input");
  const noResults = document.getElementById("no-results");


  function filterProducts(category = "all") {

    const search =
      searchInput?.value.trim().toLowerCase() || "";

    let visible = 0;

    products.forEach(product => {

      const productCategory =
        product.dataset.category || "";

      const productName =
        product.dataset.name?.toLowerCase() || "";

      const categoryMatch =
        category === "all" ||
        productCategory === category;

      const searchMatch =
        !search ||
        productName.includes(search);

      if (categoryMatch && searchMatch) {

        product.style.display = "";

        visible++;

      } else {

        product.style.display = "none";
      }
    });

    if (noResults) {
      noResults.hidden = visible !== 0;
    }
  }


  function setActiveFilter(category) {

    document
      .querySelectorAll(".filter-pill, .category-card")
      .forEach(button => {

        button.classList.toggle(
          "active",
          button.dataset.filter === category
        );

      });
  }


  filterButtons.forEach(button => {

    button.addEventListener("click", () => {

      const category =
        button.dataset.filter || "all";

      setActiveFilter(category);
      filterProducts(category);

    });

  });


  if (searchInput) {

    searchInput.addEventListener("input", () => {

      const active =
        document.querySelector(
          ".filter-pill.active, .category-card.active"
        );

      const category =
        active?.dataset.filter || "all";

      filterProducts(category);

    });

  }


  /* ================= CART ================= */

  let cart = [];

  const cartButton =
    document.getElementById("cart-button");

  const cartOverlay =
    document.getElementById("cart");

  const closeCart =
    document.getElementById("close-cart");

  const cartItems =
    document.getElementById("cart-items");

  const cartCount =
    document.getElementById("cart-count");

  const cartTotal =
    document.getElementById("cart-total");

  const checkout =
    document.getElementById("checkout");


  function updateCart() {

    if (!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {

      cartItems.innerHTML = `
        <p style="padding:20px 0;color:#777;">
          السلة فارغة حاليًا.
        </p>
      `;

    } else {

      cart.forEach((item, index) => {

        total += item.price * item.quantity;
        count += item.quantity;

        const itemElement =
          document.createElement("div");

        itemElement.className = "cart-item";

        itemElement.innerHTML = `

          <div class="cart-item-info">

            <strong>
              ${item.name}
            </strong>

            <small>
              ${item.price} DH × ${item.quantity}
            </small>

          </div>

          <button
            class="remove-item"
            data-index="${index}">
            حذف
          </button>

        `;

        cartItems.appendChild(itemElement);

      });
    }


    if (cartCount) {
      cartCount.textContent = count;
    }

    if (cartTotal) {
      cartTotal.textContent =
        `${total} DH`;
    }


    document
      .querySelectorAll(".remove-item")
      .forEach(button => {

        button.addEventListener("click", () => {

          const index =
            Number(button.dataset.index);

          cart.splice(index, 1);

          updateCart();

        });

      });
  }


  document
    .querySelectorAll(".add-cart")
    .forEach(button => {

      button.addEventListener("click", () => {

        const name =
          button.dataset.name;

        const price =
          Number(button.dataset.price);


        const existing =
          cart.find(item =>
            item.name === name
          );


        if (existing) {

          existing.quantity++;

        } else {

          cart.push({
            name,
            price,
            quantity: 1
          });

        }


        updateCart();


        button.textContent = "✓ تمت الإضافة";

        setTimeout(() => {
          button.textContent = "أضيفي للسلة";
        }, 1200);

      });

    });


  /* ================= OPEN / CLOSE CART ================= */

  if (cartButton) {

    cartButton.addEventListener("click", () => {

      cartOverlay.classList.add("open");
      cartOverlay.setAttribute(
        "aria-hidden",
        "false"
      );

    });

  }


  if (closeCart) {

    closeCart.addEventListener("click", () => {

      cartOverlay.classList.remove("open");
      cartOverlay.setAttribute(
        "aria-hidden",
        "true"
      );

    });

  }


  if (cartOverlay) {

    cartOverlay.addEventListener("click", event => {

      if (event.target === cartOverlay) {

        cartOverlay.classList.remove("open");

      }

    });

  }


  /* ================= WHATSAPP ================= */

  if (checkout) {

    checkout.addEventListener("click", () => {

      if (cart.length === 0) {

        alert("السلة فارغة. أضيفي منتجًا أولًا.");

        return;
      }


      let message =
        "مرحبًا SABIH، أريد طلب المنتجات التالية:%0A%0A";


      let total = 0;


      cart.forEach(item => {

        const subtotal =
          item.price * item.quantity;

        total += subtotal;

        message +=
          `• ${item.name} × ${item.quantity} = ${subtotal} DH%0A`;

      });


      message +=
        `%0Aالمجموع: ${total} DH%0A%0A`;

      message +=
        "الاسم:%0Aالعنوان:%0Aالهاتف:";


      const whatsappURL =
        `https://wa.me/212703166572?text=${message}`;


      window.open(
        whatsappURL,
        "_blank"
      );

    });

  }


  /* ================= LANGUAGE BUTTON ================= */

  const languageToggle =
    document.getElementById("language-toggle");

  if (languageToggle) {

    languageToggle.addEventListener("click", () => {

      alert(
        "النسخة الإنجليزية يمكن إضافتها لاحقًا بنفس تصميم المتجر."
      );

    });

  }


  /* ================= INITIALIZE ================= */

  updateCart();

  filterProducts("all");

});
