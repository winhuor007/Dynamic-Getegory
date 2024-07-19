const productList = document.querySelector(".container-gategory2");
const cardCount = document.querySelector("span.cart-count");
let incrementNumber = 0;

const jsonFile = "http://localhost:3000/products";

fetch(jsonFile)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.map((product) => {
      const {
        id,
        discount,
        imgSrc,
        category,
        productName,
        currentPrice,
        oldPrice,
        rating,
      } = product;

      const discountText = discount
        ? `<div class="sale-tag">${discount}</div>`
        : "";

      productList.innerHTML += `
        <div class="product-box" data-product-id="${id}">
          ${discountText}
          <img
            src="${imgSrc}"
            alt="Sarasoft AG"
          />
          <h3 class="product-name">${productName}</h3>
          <button class= "addtocard"><i class="fa-regular fa-cart-shopping"></i></button>
          <div class="price-container">
            <span class="sale-price">${currentPrice}</span>
            <span class="original-price">${oldPrice}</span>
          </div>
          <div class="rating">${rating}</div>
          <span>
          <div class='forStar'>${createStar(rating)}</div>
          </span>
        </div>
      `;
    });
    const addToCardBtns = document.querySelectorAll(".addtocard");
    console.log(addToCardBtns);

    addToCardBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        incrementNumber++;
        cardCount.textContent = incrementNumber;
        // save local
        localStorage.setItem("cartCount", incrementNumber);
        btn.style.backgroundColor = "red";
      });
    });
    // Retrieve the cart count from localStorage (if available)
    const storedCartCount = localStorage.getItem("cartCount");
    if (storedCartCount) {
      incrementNumber = parseInt(storedCartCount); // Ensure it's a number
      cardCount.textContent = incrementNumber;
    }
  });
function createStar(rate) {
  //const starList = document.querySelector(".forStar");
  let star = "";
  for (let i = 0; i < 5; i++) {
    // starList.innerHTML += `<i class="fa-solid fa-star"></i>`;
    if (i < rate) {
      star += `<i class="fa-solid fa-star"></i>`;
    } else {
      star += `<i class="fa-regular fa-star"></i>`;
    }
  }
  return star;
}
