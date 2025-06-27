// Slumtotos-Africa – Clean & Functional JavaScript

const products = [
  {
    id: 1,
    name: "Kente Royal Robe",
    category: "Kente",
    price: 4500,
    image: "https://i.ebayimg.com/images/g/oI4AAOSwhqJYW3E7/s-l1600.webp"
  },
  {
    id: 2,
    name: "Agbada Supreme Set",
    category: "Agbada",
    price: 7000,
    image: "https://otunbastore.com/cdn/shop/products/il_fullxfull.5295786566_n7me.jpg?v=1703837852"
  },
  {
    id: 3,
    name: "Ankara Power Dress",
    category: "Ankara",
    price: 3200,
    image: "https://zanaposh.com/wp-content/uploads/2020/05/naijapartyowanbe_20211013_11.jpg"
  },
    {
    id: 3,
    name: "Ankara Power Dress",
    category: "Ankara",
    price: 3200,
    image: "https://i.etsystatic.com/17150723/r/il/baefde/3889671209/il_794xN.3889671209_qncc.jpg"
  },
    {
    id: 3,
    name: "Ankara Power Dress",
    category: "Ankara",
    price: 3200,
    image: "https://africanfabs.com/cdn/shop/products/unisex-premium-hoodie-black-front-63515e0e6a25b_1024x1024@2x.jpg?v=1666276892"
  },
    {
    id: 3,
    name: "Ankara Power Dress",
    category: "Ankara",
    price: 3200,
    image: "https://m.media-amazon.com/images/I/61lE9hL7+8L._AC_SX679_.jpg"
  },
      {
    id: 2,
    name: "Agbada Supreme Set",
    category: "Agbada",
    price: 7000,
    image: "https://cdn.shopify.com/s/files/1/1736/2051/files/blue_jacket_480x480.png?v=1622121717"
  },
    {
    id: 2,
    name: "Agbada Supreme Set",
    category: "Agbada",
    price: 7000,
    image: "https://i.pinimg.com/736x/30/2b/a0/302ba05ccefffcc0a5b391c3bc3ad311.jpg"
  },
  {
    id: 1,
    name: "Kente Royal Robe",
    category: "Kente",
    price: 4500,
    image: "https://i.pinimg.com/736x/22/25/46/22254673f4ff915f5d6abc9f04cfa948.jpg"
  },
];

let cart = [];
let filteredProducts = [...products];

document.addEventListener("DOMContentLoaded", () => {
  renderProducts(filteredProducts);
  updateCart();
  setupSearch();
  setupCartControls();
});

function renderProducts(data) {
  const list = document.getElementById("product-list");
  list.innerHTML = '';

  data.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>KES ${product.price}</p>
      <button class="add-btn" onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    list.appendChild(card);
  });
}

function addToCart(id) {
  const item = cart.find(p => p.id === id);
  if (item) {
    item.quantity++;
  } else {
    const product = products.find(p => p.id === id);
    if (product) cart.push({ ...product, quantity: 1 });
  }
  updateCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

function updateCart() {
  const count = document.getElementById("cart-count");
  const items = document.getElementById("cart-items");
  const totalBox = document.getElementById("cart-total");

  count.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
  items.innerHTML = '';

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <p>${item.name} x ${item.quantity}</p>
      <p>KES ${item.price * item.quantity}</p>
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;
    items.appendChild(div);
  });

  totalBox.textContent = `KES ${total}`;
}

function setupCartControls() {
  const openBtn = document.querySelector(".cart-display");
  const closeBtn = document.getElementById("close-cart");
  if (openBtn) openBtn.addEventListener("click", () => toggleCart(true));
  if (closeBtn) closeBtn.addEventListener("click", () => toggleCart(false));
}

function toggleCart(show) {
  const sidebar = document.getElementById("cart-sidebar");
  if (sidebar) {
    sidebar.classList.toggle("open", show);
  }
}

function setupSearch() {
  const input = document.getElementById("search");
  if (input) {
    input.addEventListener("keyup", () => {
      const query = input.value.toLowerCase();
      const results = filteredProducts.filter(p =>
        p.name.toLowerCase().includes(query)
      );
      renderProducts(results);
    });
  }
}

function filter(category) {
  filteredProducts = category === 'All'
    ? [...products]
    : products.filter(p => p.category === category);
  renderProducts(filteredProducts);
}
function renderProducts(data) {
  const list = document.getElementById("product-list");
  list.innerHTML = '';

  data.forEach(product => {
    const { id, name, price, image, isNew, rating } = product;
    // Generate stars, e.g. ★★★★☆
    const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);

    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="image-wrapper">
        <img src="${image}" alt="${name}" />
        ${isNew ? `<span class="badge">NEW</span>` : ''}
      </div>
      <div class="product-info">
        <h3 class="product-title">${name}</h3>
        <div class="rating">${stars}</div>
        <div class="price">KES ${price}</div>
        <button class="add-btn" onclick="addToCart(${id})">Add to Cart</button>
      </div>
    `;
    list.appendChild(card);
  });
}

