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
                  <div class="box-feet">
                    <span class="price">${item.price} EGP</span>
                    <button class="add-item">
                      <i class="fa-regular fa-square-plus"></i>
                    </button>
                  </div>
                </div>
              </div>`;
  });
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
