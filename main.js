// const root = document.documentElement;
// let moodBtn = document.querySelector("header .icons .mood");
// moodBtn.addEventListener("click", () => {
//   if (moodBtn.classList.contains("fa-moon")) {
//     moodBtn.classList.replace("fa-moon", "fa-sun");
//   } else {
//     moodBtn.classList.replace("fa-sun", "fa-moon");
//   }
//   root.classList.toggle("dark");
// });

// Start Header
const nav = document.querySelector("nav");
const navIcon = document.querySelector("header .icons .nav-icon");
navIcon.addEventListener("click", () => {
  nav.classList.toggle("hidden");
});
// End Header

// Start categories
const categories = document.querySelectorAll(
  ".categories .container .category"
);
function removeActiveClass() {
  categories.forEach((el) => {
    el.classList.remove("active");
  });
  this.classList.add("active");
}
categories.forEach((e) => {
  e.addEventListener("click", removeActiveClass);
});
// End categories
// Start Items
function showItems(arr) {
  const items = document.querySelector(".items .container");
  items.innerHTML = "";
  arr.forEach((item) => {
    items.innerHTML += `<div class="item-box">
                <img src="${item.img}" alt="item-image" />
                <div class="text">
                  <h3>${item.name}</h3>
                  <p>
                    ${item.description}
                  </p>
                  ${
                    item.type === "sandwich"
                      ? `<div class="additions">
              <label>
                <input type="radio" name="addition" value="طحينة" />
                طحينة.
              </label>
              <label>
                <input type="radio" name="addition" value="كاتشب" />
                كاتشب.
              </label>
              <label>
                <input type="radio" name="addition" value="مخلل" />
                مخلل.
              </label>
            </div>`
                      : ""
                  }
                  <div class="box-feet">
                    <span class="price">${item.price} EGP</span>
                    <button class="add-item" id="${item.id}">
                      <i class="fa-regular fa-square-plus"></i>
                    </button>
                  </div>
                </div>
              </div>`;
  });
  // Add To Cart
  AddToCart(arr);
}
fetch("items.json")
  .then((res) => res.json())
  .then((re) => {
    let sandwichBtn = document.querySelector(".categories .category.sandwich");
    let juiceBtn = document.querySelector(".categories .category.juice");
    let additionBtn = document.querySelector(".categories .category.addition");
    let offersBtn = document.querySelector(".categories .category.offers");
    let sandwich = [],
      juice = [],
      addition = [],
      offers = [];
    re.forEach((item) => {
      switch (item.type) {
        case "sandwich":
          sandwich.push(item);
          break;
        case "juice":
          juice.push(item);
          break;
        case "addition":
          addition.push(item);
          break;
        case "offers":
          offers.push(item);
        default:
          break;
      }
    });
    sandwichBtn.addEventListener("click", () => showItems(sandwich));
    juiceBtn.addEventListener("click", () => showItems(juice));
    additionBtn.addEventListener("click", () => showItems(addition));
    offersBtn.addEventListener("click", () => showItems(offers));
    showItems(sandwich);
  });
// End Items

// Start Cart
// open & Close
const cartIcon = document.querySelector("header .icons .cart-icon");
const cartIconClose = document.querySelector(".cart .cart-head i");
const cart = document.querySelector(".cart");
cartIcon.addEventListener("click", () => {
  cart.classList.toggle("show");
});
cartIconClose.addEventListener("click", () => {
  cart.classList.toggle("show");
});
// Add To Cart
function AddToCart(arr) {
  let addBtns = document.querySelectorAll(".items .text .box-feet .add-item");
  addBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const itemId = e.currentTarget.id;
      const selectedItem = arr.find((i) => i.id === itemId);
      
      showInCart(selectedItem);

      cart.classList.add("show");
      e.currentTarget.classList.add("done");
      let cartLS = JSON.parse(localStorage.getItem("cartLS")) || [];
      cartLS.push({ ...selectedItem, quantity: 1 });
      localStorage.setItem("cartLS", JSON.stringify(cartLS));
    });
  });
}
// Show In Cart
function showInCart(selectedItem) {
  let itemsInCart = document.querySelector(".cart .items-in-cart");
  itemsInCart.innerHTML += `
      <div class="item-box-in-cart">
          <img src="${selectedItem.img}" alt="iamge" />
          <div class="text">
            <h4> ${selectedItem.name} <br />${
    selectedItem.type === "sandwich" ? `<span>+ بطاطس + طحينة</span>` : ""
  } </h4>
            <span class="price-in-cart">${selectedItem.price} EGP</span>
            <div class="number-of-item">
              <button class="decrease">-</button
              ><span class="item-count">0</span
              ><button class="increase">+</button>
            </div>
          </div>
          <div class="trash"><i class="fa-solid fa-trash-can"></i></div>
        </div>`;
}
window.addEventListener("load", () => {
  let itemsInCart = document.querySelector(".cart .items-in-cart");
  let cartLS = JSON.parse(localStorage.getItem("cartLS")) || [];
  cartLS.forEach((item) => showInCart(item));
});
// End Cart
