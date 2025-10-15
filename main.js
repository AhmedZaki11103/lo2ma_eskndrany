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
                <div class="item-img"> <img src="${
                  item.img
                }" alt="item-image" /> </div>
                
                <div class="text">
                  <h3>${item.name}</h3>
                  <p>
                    ${item.description}
                  </p>
                  ${
                    item.type === "sandwich"
                      ? `<div class="additions">
              <label>
                <input type="radio"name="addition-${item.id}" value="طحينة" checked />
                طحينة.
              </label>
              <label>
                <input type="radio"name="addition-${item.id}" value="كاتشب" />
                كاتشب.
              </label>
              <label>
                <input type="radio"name="addition-${item.id}" value="مخلل" />
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
          break;

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
const shopMorebtn = document.querySelector(".cart .cart-feet-two .shop-more");
const cart = document.querySelector(".cart");

cartIcon.addEventListener("click", () => {
  cart.classList.toggle("show");
});
cartIconClose.addEventListener("click", () => {
  cart.classList.toggle("show");
});
shopMorebtn.addEventListener("click", () => {
  cart.classList.toggle("show");
  if (window.location.href.includes("cart.html")) {
    window.location.href = "index.html";
  }
});

// Add To Cart
function AddToCart(arr) {
  let addBtns = document.querySelectorAll(".items .text .box-feet .add-item");
  disabledbtuns(addBtns);

  addBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const itemId = e.currentTarget.id;
      const selectedItem = arr.find((i) => i.id === itemId);
      let selectedAddition = "";
      if (selectedItem.type === "sandwich") {
        const itemBox = e.currentTarget.closest(".item-box");
        const checkedAddition = itemBox.querySelector(
          ".additions input:checked"
        );
        selectedAddition = checkedAddition
          ? checkedAddition.value
          : "بدون إضافات";
      }
      showInCart(selectedItem, selectedAddition);

      cart.classList.add("show");
      e.currentTarget.classList.add("done");

      removeFromCart();

      let cartLS = JSON.parse(localStorage.getItem("cartLS")) || [];
      cartLS.push({ ...selectedItem, addition: selectedAddition, quantity: 1 });
      localStorage.setItem("cartLS", JSON.stringify(cartLS));
      Itemscount();
      //
    });
  });
}
// Show In Cart
function showInCart(selectedItem, selectedAddition = "") {
  let itemsInCart = document.querySelector(".cart .items-in-cart");

  itemsInCart.innerHTML += `
      <div class="item-box-in-cart">
          <img src="${selectedItem.img}" alt="iamge" />
          <div class="text">
            <h4> ${selectedItem.name} <br />${
    selectedItem.type === "sandwich"
      ? `<span>+ بطاطس + ${selectedAddition}</span>`
      : ""
  } </h4>
            <span class="price-in-cart">${selectedItem.price} EGP</span>
            <div class="number-of-item">
              <button class="decrease" data-id="${selectedItem.id}">-</button
              ><span class="quantity">${selectedItem.quantity || 1}</span
              ><button class="increase" data-id="${selectedItem.id}" >+</button>
            </div>
          </div>
          <div class="trash" id="${
            selectedItem.id
          }"><i class="fa-solid fa-trash-can"></i></div>
        </div>`;
}

window.addEventListener("load", () => {
  let cartLS = JSON.parse(localStorage.getItem("cartLS")) || [];
  cartLS.forEach((item) => showInCart(item, item.addition));
  removeFromCart();
  Itemscount();
  disabledbtuns(document.querySelectorAll(".items .text .box-feet .add-item"));
});

function disabledbtuns(btns) {
  let cartLS = JSON.parse(localStorage.getItem("cartLS")) || [];
  if (cartLS.length > 0) {
    let disabledbtuns = [];
    cartLS.forEach((itemInCart) => {
      btns.forEach((btn) => {
        if (btn.id === itemInCart.id) disabledbtuns.push(btn);
      });
    });
    disabledbtuns.forEach((btn) => {
      btn.classList.add("done");
    });
  } else return;
}
// Remove From Cart
function removeFromCart() {
  const cartContainer = document.querySelector(".cart .items-in-cart");
  cartContainer.addEventListener("click", function (e) {
    const trash = e.target.closest(".trash");
    if (!trash) return;

    const itemId = trash.id;
    trash.parentElement.remove();

    let cartLS = JSON.parse(localStorage.getItem("cartLS")) || [];
    let newcartLS = cartLS.filter((item) => item.id !== itemId);
    localStorage.setItem("cartLS", JSON.stringify(newcartLS));

    Itemscount();
    const addBtn = document.getElementById(itemId);
    if (addBtn) addBtn.classList.remove("done");
  });
}

// function removeFromCart() {
//   let trashbtns = document.querySelectorAll(
//     ".cart .items-in-cart .item-box-in-cart .trash"
//   );
//   trashbtns.forEach((btn) => {
//     btn.addEventListener("click", function (e) {
//       // =========
//       this.parentElement.remove();
//       let cartLS = JSON.parse(localStorage.getItem("cartLS")) || [];
//       let newcartLS = cartLS.filter((item) => item.id !== this.id);
//       localStorage.setItem("cartLS", JSON.stringify(newcartLS));
//       Itemscount();
//       const addBtn = document.getElementById(this.id);
//       if (addBtn) addBtn.classList.remove("done");
//     });
//   });
// }

// Start Cart
function Itemscount() {
  let cartLS = JSON.parse(localStorage.getItem("cartLS")) || [];

  // تحديث العدادات
  updateCartCounters(cartLS);

  // إضافة event listeners للأزرار مرة واحدة فقط
  setupQuantityButtons();
}

function setupQuantityButtons() {
  const cartContainer = document.querySelector(".cart .items-in-cart");

  // إزالة ال event listeners القديمة
  cartContainer.replaceWith(cartContainer.cloneNode(true));
  removeFromCart();
  const newContainer = document.querySelector(".cart .items-in-cart");

  newContainer.addEventListener("click", function (e) {
    const itemId = e.target.dataset.id;
    if (!itemId) return;

    let cartLS = JSON.parse(localStorage.getItem("cartLS")) || [];
    const itemIndex = cartLS.findIndex((item) => item.id === itemId);
    if (itemIndex === -1) return;

    if (e.target.classList.contains("increase")) {
      cartLS[itemIndex].quantity++;
      updateQuantityDisplay(
        e.target.previousElementSibling,
        cartLS[itemIndex].quantity
      );
    } else if (
      e.target.classList.contains("decrease") &&
      cartLS[itemIndex].quantity > 1
    ) {
      cartLS[itemIndex].quantity--;
      updateQuantityDisplay(
        e.target.nextElementSibling,
        cartLS[itemIndex].quantity
      );
    } else {
      return;
    }

    localStorage.setItem("cartLS", JSON.stringify(cartLS));
    updateCartCounters(cartLS);
  });
}

function updateQuantityDisplay(element, quantity) {
  element.innerHTML = quantity;
}

function updateCartCounters(cartLS) {
  let countCartIcon = document.querySelector("header .icons .cart-icon span");
  let itemsCountEl = document.querySelector(".cart .cart-items-counter");

  let countQuantity = 0;
  cartLS.forEach((item) => {
    countQuantity += item.quantity;
  });

  countCartIcon.innerHTML = cartLS.length;
  itemsCountEl.innerHTML = countQuantity;
  updateSubTotal(cartLS);
}
import { showInCartkkk } from "./cart.js";
function updateSubTotal(cartLS) {
  let subTotal = document.querySelector(".cart .cart-feet-one .sub-total");

  let totalPrice = 0;
  cartLS.forEach((item) => {
    totalPrice += +item.price * item.quantity;
  });
  subTotal.innerHTML = `EGP ${totalPrice}`;
  showInCartkkk();
}

const checkOutBtn = document.querySelector(".check-out-in-cart");
checkOutBtn.addEventListener("click", () => {
  window.location.href = "cart.html";
});
// End Cart
// function Itemscount() {
//   let cartLS = JSON.parse(localStorage.getItem("cartLS"));
//   let countCartIcon = document.querySelector("header .icons .cart-icon span");
//   countCartIcon.innerHTML = cartLS.length;
//   // =======
//   let itemsCountEl = document.querySelector(".cart .cart-items-counter");
//   let countQuantity = 0;
//   cartLS.forEach((item) => {
//     countQuantity += item.quantity;
//   });
//   itemsCountEl.innerHTML = countQuantity;
//   // =======

//   // let decreaseBtn = document.querySelectorAll(".cart button.decrease");
//   // let increaseBtn = document.querySelectorAll(".cart button.increase");
//   // decreaseBtn.forEach((btn) => {
//   //   btn.addEventListener("click", function (e) {
//   //     cartLS.forEach((item) => {
//   //       if (this.dataset.id === item.id) {
//   //         if (item.quantity > 1) {
//   //           item.quantity--;
//   //           itemsCountEl.innerHTML = +itemsCountEl.innerHTML - 1;
//   //           updateSubTotal(cartLS);
//   //         }
//   //         let quantity = this.nextElementSibling;
//   //         quantity.innerHTML = item.quantity;
//   //       }
//   //     });
//   //     localStorage.setItem("cartLS", JSON.stringify(cartLS));
//   //   });
//   // });
//   // increaseBtn.forEach((btn) => {
//   //   btn.addEventListener("click", function (e) {
//   //     cartLS.forEach((item) => {
//   //       if (this.dataset.id === item.id) {
//   //         item.quantity++;
//   //         itemsCountEl.innerHTML = +itemsCountEl.innerHTML + 1;
//   //         updateSubTotal(cartLS);
//   //       }
//   //       let quantity = this.previousElementSibling;
//   //       quantity.innerHTML = item.quantity;
//   //     });
//   //     localStorage.setItem("cartLS", JSON.stringify(cartLS));
//   //   });
//   // });
//   // =======
//   updateSubTotal(cartLS);
// }
// function updateSubTotal(cartLS) {
//   let subTotal = document.querySelector(".cart .cart-feet-one .sub-total");
//   let totalPrice = 0;
//   cartLS.forEach((item) => {
//     totalPrice += +item.price * item.quantity;
//   });
//   subTotal.innerHTML = `EGP ${totalPrice}`;
// }

// End Cart
let copy = document.querySelector(".copy");
copy.innerHTML = new Date().getFullYear();
// =============
