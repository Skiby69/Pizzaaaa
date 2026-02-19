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
const cartItems = document.getElementById("cartItems");
const sizeSelect = document.getElementById("sizes");
const sauceSelect = document.getElementById("sauceSelect");
const toppingsContainer = document.getElementById("toppings");
const sauceError = document.getElementById("sauce-error");
const toppingsError = document.getElementById("toppings-error");
const totalPrice = document.getElementById("totalPrice");
const priceDisplay = document.getElementById("priceDisplay");
const quantityInput = document.getElementById("quantity");

function calculateTotal() {
    /*
    cartItems.forEach(item => {
        const sizeId = parseInt(item.querySelector('input[name="size"]:checked')?.value);
        const sauceId = parseInt(item.querySelector('input[name="sauce"]:checked')?.value);
        const toppingIds = Array.from(item.querySelectorAll('input[name="topping"]:checked')).map(t => parseInt(t.value));
        let total = 0;
        total = total + calculateSingle(sizeId, sauceId, toppingIds);
        totalPrice.textContent = `Total: ${total} Ft`;
    });*/
}

function addToCart(sizeId, sauceId, toppingIds) {
  const cartItems = document.getElementById("cartItems");
  const total = calculateSingle(sizeId, sauceId, toppingIds)*quantityInput.value;
  cartItems.innerHTML += `
    <div class="cart-item">
      <p>Size: ${pizzaData.sizes.find(s => s.id === sizeId)?.nev}</p>
      <p>Sauce: ${pizzaData.sauces.find(s => s.id === sauceId)?.nev}</p>
      <p>Toppings: ${toppingIds.map(id => pizzaData.toppings.find(t => t.id === id)?.nev).join(', ')}</p>
      <p>Price: ${total} Ft</p>
      <button class="remove-btn" onclick="this.parentElement.remove();calculateTotal()">Remove</button>
    </div>
  `;
}

function calculateSingle(sizeId, sauceId, toppingIds) {
  let total = pizzaData.basePrice;

  const size = pizzaData.sizes.find(s => s.id === sizeId);
  if (size) {
    total += size.ar;
  }

  const sauce = pizzaData.sauces.find(s => s.id === sauceId);
  if (sauce) {
    total += sauce.ar;
  }

  toppingIds.forEach(id => {
    const topping = pizzaData.toppings.find(t => t.id === id);
    if (topping) {
      total += topping.ar;
    }
  });

  return total;
}

function loadPizzaOptions() {
    pizzaData.sizes.forEach(size => {
        sizeSelect.innerHTML += `
        <input type="radio" name="size" value="${size.id}" id="size-${size.id}" onchange="updatePriceDisplay()">
        <label for="size-${size.id}">${size.nev} - ${2000+size.ar} Ft</label>
        `;
    });

    pizzaData.sauces.forEach(sauce => {
        sauceSelect.innerHTML += `
        <input type="radio" name="sauce" value="${sauce.id}" id="sauce-${sauce.id}" onchange="updatePriceDisplay()">
        <label for="sauce-${sauce.id}">${sauce.nev} - ${sauce.ar} Ft</label>
        `;
    });

    pizzaData.toppings.forEach(topping => {
        toppingsContainer.innerHTML += `
        <label>
        <input type="checkbox" name="topping-${topping.ar}" value="${topping.id}" onchange="updatePriceDisplay()">
        ${topping.nev} - ${topping.ar} Ft
        </label>
        `;
    });
}

function updatePriceDisplay() {
  const sizeId = parseInt(document.querySelector('input[name^="size"]:checked')?.value);
  const sauceId = parseInt(document.querySelector('input[name^="sauce"]:checked')?.value);
  const toppingIds = Array.from(document.querySelectorAll('input[name^="topping-"]:checked')).map(t => parseInt(t.value));

  const total = calculateSingle(sizeId, sauceId, toppingIds)*quantityInput.value;
  priceDisplay.textContent = `${total} Ft`;
}

loadPizzaOptions();