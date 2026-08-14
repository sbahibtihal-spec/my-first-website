<!DOCTYPE html>
<html lang="ar" dir="rtl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>متجري الإلكتروني | NAIMA</title>

    <link rel="stylesheet" href="style.css">
</head>

<body>

    <!-- HEADER -->
    <header class="header">

        <div class="container">

            <h1 class="logo">
                🛍️ متجري
            </h1>

            <nav>
                <a href="#home">الرئيسية</a>
                <a href="#products">المنتجات</a>
                <a href="#about">من نحن</a>
                <a href="#contact">تواصل معنا</a>
            </nav>

            <button id="cart-button" class="cart-button">
                🛒 السلة
                <span id="cart-count">0</span>
            </button>

        </div>

    </header>


    <!-- HERO -->
    <section id="home" class="hero">

        <div class="container">

            <h2>مرحباً بك في متجري الإلكتروني</h2>

            <p>
                اكتشفي منتجاتنا واختاري ما يناسبك بسهولة.
            </p>

            <a href="#products" class="hero-button">
                تصفح المنتجات
            </a>

        </div>

    </section>


    <!-- PRODUCTS -->
    <section id="products" class="products-section">

        <div class="container">

            <h2 class="section-title">
                منتجاتنا
            </h2>

            <div class="products-grid">


                <!-- PRODUCT 1 -->
                <div class="product-card">

                    <div class="product-image">
                        👗
                    </div>

                    <h3>
                        فستان أنيق
                    </h3>

                    <p>
                        فستان نسائي بتصميم عصري وأنيق.
                    </p>

                    <strong class="price">
                        250 درهم
                    </strong>

                    <button
                        class="add-cart"
                        data-name="فستان أنيق"
                        data-price="250">

                        أضف إلى السلة 🛒

                    </button>

                </div>


                <!-- PRODUCT 2 -->
                <div class="product-card">

                    <div class="product-image">
                        👟
                    </div>

                    <h3>
                        حذاء رياضي
                    </h3>

                    <p>
                        حذاء مريح مناسب للاستعمال اليومي.
                    </p>

                    <strong class="price">
                        300 درهم
                    </strong>

                    <button
                        class="add-cart"
                        data-name="حذاء رياضي"
                        data-price="300">

                        أضف إلى السلة 🛒

                    </button>

                </div>


                <!-- PRODUCT 3 -->
                <div class="product-card">

                    <div class="product-image">
                        👜
                    </div>

                    <h3>
                        حقيبة نسائية
                    </h3>

                    <p>
                        حقيبة أنيقة وعملية للاستخدام اليومي.
                    </p>

                    <strong class="price">
                        200 درهم
                    </strong>

                    <button
                        class="add-cart"
                        data-name="حقيبة نسائية"
                        data-price="200">

                        أضف إلى السلة 🛒

                    </button>

                </div>


                <!-- PRODUCT 4 -->
                <div class="product-card">

                    <div class="product-image">
                        ⌚
                    </div>

                    <h3>
                        ساعة أنيقة
                    </h3>

                    <p>
                        ساعة بتصميم بسيط وعصري.
                    </p>

                    <strong class="price">
                        180 درهم
                    </strong>

                    <button
                        class="add-cart"
                        data-name="ساعة أنيقة"
                        data-price="180">

                        أضف إلى السلة 🛒

                    </button>

                </div>


            </div>

        </div>

    </section>


    <!-- ABOUT -->
    <section id="about" class="about">

        <div class="container">

            <h2 class="section-title">
                من نحن؟
            </h2>

            <p>
                نحن متجر إلكتروني تدريبي تم تطويره باستعمال
                HTML و CSS و JavaScript.
                هدفنا تقديم تجربة تسوق بسيطة وسهلة الاستخدام.
            </p>

        </div>

    </section>


    <!-- CONTACT -->
    <section id="contact" class="contact">

        <div class="container">

            <h2 class="section-title">
                تواصل معنا
            </h2>

            <p>
                📧 البريد الإلكتروني:
                example@gmail.com
            </p>

            <p>
                📱 الهاتف:
                0600000000
            </p>

        </div>

    </section>


    <!-- CART -->
    <div id="cart" class="cart">

        <div class="cart-content">

            <button id="close-cart" class="close-cart">
                ✖
            </button>

            <h2>
                🛒 سلة المشتريات
            </h2>

            <div id="cart-items">
                <p>
                    السلة فارغة
                </p>
            </div>

            <div class="cart-total">

                <strong>
                    المجموع:
                </strong>

                <span id="cart-total">
                    0
                </span>

                درهم

            </div>

            <button id="checkout" class="checkout">
                إتمام الطلب
            </button>

        </div>

    </div>


    <!-- FOOTER -->
    <footer>

        <p>
            © 2026 NAIMA - جميع الحقوق محفوظة
        </p>

    </footer>


    <!-- JAVASCRIPT -->
    <script src="script.js"></script>

</body>

</html>
