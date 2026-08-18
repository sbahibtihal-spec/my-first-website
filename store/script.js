const WHATSAPP_NUMBER="212703166572";

const products=[
{id:1,name:"عطر SABIH Signature",category:"beauty",price:690,image:"images/perfume.svg",badge:"مميز"},
{id:2,name:"أحمر شفاه فاخر",category:"beauty",price:280,image:"images/lipstick.svg",badge:"رائج"},
{id:3,name:"فستان بيج أنيق",category:"fashion",price:550,image:"images/dress.svg",badge:"جديد"},
{id:4,name:"بليزر نسائي كلاسيك",category:"fashion",price:450,image:"images/blazer.svg",badge:"الأكثر مبيعاً"},
{id:5,name:"كريم ترطيب فاخر",category:"beauty",price:950,image:"images/cream.svg",badge:"مميز"}
];

let cart=JSON.parse(localStorage.getItem("sabihCart")||"[]");
let favorites=JSON.parse(localStorage.getItem("sabihFavorites")||"[]");
let currentFilter="all";

const money=n=>Number(n).toLocaleString("fr-MA")+" MAD";
const escapeHTML=t=>{const d=document.createElement("div");d.textContent=t;return d.innerHTML};

function saveCart(){localStorage.setItem("sabihCart",JSON.stringify(cart))}
function saveFavorites(){localStorage.setItem("sabihFavorites",JSON.stringify(favorites))}

function addProduct(id){
 const p=products.find(x=>x.id===id); if(!p)return;
 const item=cart.find(x=>x.id===id);
 if(item)item.quantity++;else cart.push({...p,quantity:1});
 saveCart();updateCart();openCart();
}
function removeProduct(id){cart=cart.filter(x=>x.id!==id);saveCart();updateCart()}
function increaseQuantity(id){const x=cart.find(i=>i.id===id);if(x){x.quantity++;saveCart();updateCart()}}
function decreaseQuantity(id){const x=cart.find(i=>i.id===id);if(!x)return;if(x.quantity>1)x.quantity--;else removeProduct(id);saveCart();updateCart()}

function updateCart(){
 const count=document.getElementById("cartCount"),items=document.getElementById("cartItems"),totalEl=document.getElementById("cartTotal");
 const qty=cart.reduce((s,x)=>s+x.quantity,0),total=cart.reduce((s,x)=>s+x.price*x.quantity,0);
 if(count)count.textContent=qty;
 if(totalEl)totalEl.textContent="المجموع: "+money(total);
 if(!items)return;
 if(!cart.length){items.innerHTML='<div class="empty-cart"><p>السلة فارغة</p><small>أضيفي منتجاتك المفضلة إلى السلة</small></div>';return}
 items.innerHTML=cart.map(x=>`<div class="cart-item"><div class="cart-item-info"><strong>${escapeHTML(x.name)}</strong><span>${money(x.price*x.quantity)}</span></div><div class="quantity-controls"><button onclick="decreaseQuantity(${x.id})">−</button><span>${x.quantity}</span><button onclick="increaseQuantity(${x.id})">+</button></div><button class="remove-product" onclick="removeProduct(${x.id})">×</button></div>`).join("");
}
function openCart(){const o=document.getElementById("cartOverlay");if(o){o.style.display="block";document.body.style.overflow="hidden";updateCart()}}
function closeCart(){const o=document.getElementById("cartOverlay");if(o){o.style.display="none";document.body.style.overflow=""}}
document.addEventListener("click",e=>{if(e.target.id==="cartOverlay")closeCart()});

function renderProducts(list=products){
 const c=document.getElementById("productList");if(!c)return;
 if(!list.length){c.innerHTML='<p class="no-products">لا توجد منتجات مطابقة.</p>';return}
 c.innerHTML=list.map(p=>`<article class="product"><button class="favorite ${favorites.includes(p.id)?"active":""}" onclick="toggleFavorite(${p.id})">${favorites.includes(p.id)?"♥":"♡"}</button>${p.badge?`<span class="badge">${p.badge}</span>`:""}<div class="product-image"><img src="${p.image}" alt="${escapeHTML(p.name)}" loading="lazy"></div><div class="product-info"><h3>${escapeHTML(p.name)}</h3><div class="price">${money(p.price)}</div><button class="add-cart" onclick="addProduct(${p.id})">أضف للسلة</button></div></article>`).join("");
}
function setFilter(category,btn){
 currentFilter=category;
 document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
 if(btn)btn.classList.add("active");
 applyFilters();
}
function applyFilters(){
 const q=(document.getElementById("searchInput")?.value||"").trim().toLowerCase();
 let list=products;
 if(currentFilter!=="all")list=list.filter(p=>p.category===currentFilter);
 if(q)list=list.filter(p=>p.name.toLowerCase().includes(q));
 renderProducts(list);
}
function searchProducts(){applyFilters()}
function filterAndScroll(category){
 currentFilter=category;
 document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b.textContent.includes(category==="beauty"?"الجمال":"الأزياء")));
 applyFilters();scrollToProducts();
}
function showOffers(){renderProducts(products.filter(p=>p.badge==="رائج"||p.badge==="جديد"));scrollToProducts()}
function showBestSellers(){renderProducts(products.filter(p=>p.badge==="الأكثر مبيعاً"));scrollToProducts()}
function toggleFavorite(id){
 favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];
 saveFavorites();applyFilters();
}
function showFavorites(){
 const list=products.filter(p=>favorites.includes(p.id));
 if(!list.length){alert("لم تضيفي أي منتج إلى المفضلة بعد.");return}
 renderProducts(list);scrollToProducts();
}
function scrollToProducts(){document.getElementById("products")?.scrollIntoView({behavior:"smooth"})}

function checkoutWhatsApp(){
 if(!cart.length){alert("السلة فارغة. أضيفي منتجاً أولاً.");return}
 let msg="مرحباً SABIH 👋\n\nأرغب في طلب المنتجات التالية:\n\n";
 cart.forEach(x=>{msg+=`• ${x.name}\nالكمية: ${x.quantity}\nالسعر: ${money(x.price*x.quantity)}\n\n`});
 const total=cart.reduce((s,x)=>s+x.price*x.quantity,0);
 msg+="━━━━━━━━━━━━\nالمجموع: "+money(total)+"\n\nالاسم:\nالمدينة:\nالعنوان:\nرقم الهاتف:";
 window.open("https://wa.me/"+WHATSAPP_NUMBER+"?text="+encodeURIComponent(msg),"_blank");
}

document.addEventListener("DOMContentLoaded",()=>{renderProducts();updateCart()});
