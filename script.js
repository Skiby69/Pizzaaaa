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


function calculateTotal(sizeId, sauceId, toppingIds) {
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

const sizeSelect = document.getElementById("sizes");
const sauceSelect = document.getElementById("sauces");
const toppingsContainer = document.getElementById("toppings");
function loadPizzaOptions() {
    pizzaData.sizes.forEach(size => {
        sizeSelect.innerHTML += `
        <input type="radio" name="size" value="${size.id}" id="size-${size.id}">
        <label for="size-${size.id}">${size.nev} - ${size.ar} Ft</label>
        `;
    });

    pizzaData.sauces.forEach(sauce => {
        sauceSelect.innerHTML += `
        <input type="radio" name="sauce" value="${sauce.id}" id="sauce-${sauce.id}">
        <label for="sauce-${sauce.id}">${sauce.nev} - ${sauce.ar} Ft</label>
        `;
    });

    pizzaData.toppings.forEach(topping => {
        toppingsContainer.innerHTML += `
        <input type="checkbox" name="topping" value="${topping.id}">
        <label for="topping-${topping.id}">${topping.nev} - ${topping.ar} Ft</label>
        `;
    });
}