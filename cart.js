// // Start Header
// const nav = document.querySelector("nav");
// const navIcon = document.querySelector("header .icons .nav-icon");
// navIcon.addEventListener("click", () => {
//   nav.classList.toggle("hidden");
// });
// End Header
// let copy = document.querySelector(".copy");
// copy.innerHTML = new Date().getFullYear();

export function showInCartkkk() {
  let itemsInCart = document.querySelector(
    ".order .container .items-in-cart-page .items"
  );
  if (!itemsInCart) return;
  let ls = JSON.parse(localStorage.getItem("cartLS")) || [];
  if (ls.length > 0) {
    itemsInCart.innerHTML = "";
    ls.forEach((item) => {
      itemsInCart.innerHTML += `<div class="item">
              <img src="${item.img}" alt="image" />
              <div class="text">
                <h4>${item.name}</h4>
                <div class="quantity">
                  <span>العدد: </span>
                  <span class="num">${item.quantity}</span>
                </div>
                <div class="price">EGP ${item.price * item.quantity}</div>
              </div>
            </div>`;
    });
    let suptotal = document.querySelector(".order .container .feet .total");
    let total = 0;
    ls.forEach((item) => {
      total += +item.price * item.quantity;
    });
    suptotal.innerHTML = `EGP ${total}`;
  }
}
window.addEventListener("load", showInCartkkk);
// ====

// const phone = "201286113602";
// let name = document.querySelector(".inputName");
// let num = document.querySelector(".inputNumber");
// let sub = document.querySelector(".check-out-btn");

// sub.addEventListener("click", (e) => {
//   e.preventDefault();
//   let ls = JSON.parse(localStorage.getItem("cartLS")) || [];
//   let order = ``;
//   if (ls.length > 0) {
//     ls.forEach((item) => {
//       order += `عدد ${item.quantity} ${item.name}: ${
//         item.price * item.quantity
//       } EGP\n`;
//     });
//   }

//   if (order) {
//     let msg = `Name: ${name.value} \nNumber: ${num.value} \nOrder: ${order}`;
//     console.log(msg);
//     // window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`);
//   } else {
//     alert("السلة فاضية، ضيف منتجات قبل الإرسال!");
//   }
// });
const phone = "201554942616";
let name = document.querySelector(".inputName");
let num = document.querySelector(".inputNumber");
let address = document.querySelector(".inputAddress");
let comments = document.querySelector(".comments");
let sub = document.querySelector("form");
if (sub) {
  sub.addEventListener("submit", (e) => {
    e.preventDefault();
    let ls = JSON.parse(localStorage.getItem("cartLS")) || [];
    let order = "";
    let total = 0;

    if (ls.length > 0) {
      ls.forEach((item) => {
        let additionText = "";
        if (item.type === "sandwich" && item.addition) {
          additionText = ` + ${item.addition}`;
        }

        const line = `\u202B• *${item.quantity}* ${item.name}${additionText}: ${
          item.price * item.quantity
        } ج\u202C`;
        order += line + "\n";
        total += item.price * item.quantity;
      });
    }

    if (order) {
      let commentsValue = "";
      comments.value !== ""
        ? (commentsValue = `*ملاحظات:* ${comments.value}`)
        : (commentsValue = "");

      const msg = `\u202B *الاسم:* ${name.value}\n *الرقم:* ${num.value}\n *العنوان:* ${address.value}\n *الطلب:*\n${order}\n *الإجمالي:* ${total} ج\n ${commentsValue} \u202C`;
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`);
      localStorage.removeItem("cartLS");
      window.location.reload();
    } else {
      alert("السلة فاضية، ضيف منتجات قبل الإرسال!");
    }
  });
}
