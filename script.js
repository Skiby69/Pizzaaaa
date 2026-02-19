const pizzaData = {
  sizes: [
    { id: 1, nev: "Kicsi", meret: "S", ar: 0 },
    { id: 2, nev: "Közepes", meret: "M", ar: 800 },
    { id: 3, nev: "Nagy", meret: "L", ar: 1500 }
  ],
  basePrice: 2000,
  sauces: [
    { id: 1, nev: "Paradicsomos", ar: 300 },
    { id: 2, nev: "Tejfölös", ar: 400 }
  ],
  toppings: [
    { id: 1, nev: "Sajt", ar: 500 },
    { id: 2, nev: "Sonka", ar: 600 },
    { id: 3, nev: "Gomba", ar: 450 }
  ]
};

let cart = [];

const sizeSelect = document.getElementById("sizeSelect");
const sauceSelect = document.getElementById("sauceSelect");
const toppingsContainer = document.getElementById("toppings");
const totalPrice = document.getElementById("totalPrice");
const priceDisplay = document.getElementById("priceDisplay");
const quantityInput = document.getElementById("quantity");
const cartItems = document.getElementById("cartItems");
const osszegzes = document.getElementById("osszegzes");


// ====== Opciók betöltése ======
function loadPizzaOptions() {

  pizzaData.sizes.forEach(size => {
    sizeSelect.innerHTML += `
      <label>
        <input type="radio" name="size" value="${size.id}" onchange="updatePriceDisplay()">
        ${size.nev} - ${pizzaData.basePrice + size.ar} Ft
      </label><br>
    `;
  });

  pizzaData.sauces.forEach(sauce => {
    sauceSelect.innerHTML += `
      <label>
        <input type="radio" name="sauce" value="${sauce.id}" onchange="updatePriceDisplay()">
        ${sauce.nev} - ${sauce.ar} Ft
      </label><br>
    `;
  });

  pizzaData.toppings.forEach(topping => {
    toppingsContainer.innerHTML += `
      <label>
        <input type="checkbox" name="topping" value="${topping.id}" onchange="updatePriceDisplay()">
        ${topping.nev} - ${topping.ar} Ft
      </label><br>
    `;
  });
}


// ====== Egy pizza ár számítása ======
function calculateSingle(sizeId, sauceId, toppingIds) {

  let total = pizzaData.basePrice;

  const size = pizzaData.sizes.find(s => s.id === sizeId);
  if (size) total += size.ar;

  const sauce = pizzaData.sauces.find(s => s.id === sauceId);
  if (sauce) total += sauce.ar;

  toppingIds.forEach(id => {
    const topping = pizzaData.toppings.find(t => t.id === id);
    if (topping) total += topping.ar;
  });

  return total;
}


// ====== Ár automatikus frissítés ======
function updatePriceDisplay() {

  const sizeId = parseInt(document.querySelector('input[name="size"]:checked')?.value);
  const sauceId = parseInt(document.querySelector('input[name="sauce"]:checked')?.value);
  const toppingIds = Array.from(document.querySelectorAll('input[name="topping"]:checked'))
    .map(t => parseInt(t.value));

  if (!sizeId || !sauceId) {
    priceDisplay.textContent = "0";
    return;
  }

  const total = calculateSingle(sizeId, sauceId, toppingIds) * quantityInput.value;
  priceDisplay.textContent = total;
}


// ====== Kosárba helyezés ======
function calculateTotal() {

  const sizeId = parseInt(document.querySelector('input[name="size"]:checked')?.value);
  const sauceId = parseInt(document.querySelector('input[name="sauce"]:checked')?.value);
  const toppingIds = Array.from(document.querySelectorAll('input[name="topping"]:checked'))
    .map(t => parseInt(t.value));

  if (!sauceId) {
    alert("Kötelező szószt választani!");
    return;
  }

  const quantity = parseInt(quantityInput.value);
  const singlePrice = calculateSingle(sizeId, sauceId, toppingIds);
  const total = singlePrice * quantity;

  const order = {
    sizeId,
    sauceId,
    toppingIds,
    quantity,
    total
  };

  cart.push(order);

  renderCart();
}


// ====== Kosár kirajzolás ======
function renderCart() {

  cartItems.innerHTML = "";
  let sum = 0;

  cart.forEach((item, index) => {

    const size = pizzaData.sizes.find(s => s.id === item.sizeId);
    const sauce = pizzaData.sauces.find(s => s.id === item.sauceId);
    const toppings = item.toppingIds.map(id =>
      pizzaData.toppings.find(t => t.id === id)?.nev
    ).join(", ");

    sum += item.total;

    cartItems.innerHTML += `
      <div class="cart-item">
        <p>Méret: ${size?.nev}</p>
        <p>Szósz: ${sauce?.nev}</p>
        <p>Feltétek: ${toppings || "Nincs"}</p>
        <p>Darab: ${item.quantity}</p>
        <p>Ár: ${item.total} Ft</p>
        <button onclick="removeItem(${index})">Törlés</button>
        <hr>
      </div>
    `;
  });

  totalPrice.textContent = sum;
}


// ====== Törlés ======
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

function placeOrder() {

  if (cart.length === 0) {
    alert("A kosár üres! Nem tudsz rendelést leadni.");
    return;
  }

  const orderId = Math.floor(Math.random() * 100000);

  osszegzes.innerHTML = `
    <h2>✅ Rendelés sikeresen leadva!</h2>
    <p>Rendelési azonosító: <strong>#${orderId}</strong></p>
    <p>Fizetendő összeg: <strong>${totalPrice.textContent} Ft</strong></p>
    <p>Köszönjük a rendelést! 🍕</p>
  `;

  // Kosár ürítése
  cart = [];
  cartItems.innerHTML = "";
  totalPrice.textContent = "0";
  priceDisplay.textContent = "0";
}


loadPizzaOptions();