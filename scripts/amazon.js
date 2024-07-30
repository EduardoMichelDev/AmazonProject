import { cart, addtoCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { calculateCartQuantity } from "../data/cart.js";



let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container js-quantity-selector-${product.id}">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart added-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
  `;
  //remember to add select at the end of the cass select

});



document.querySelector('.js-products-grid').innerHTML = productsHTML;

const addedMessageTimeouts = {};

calculateCartQuantity()


document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const { productId } = button.dataset;
      addtoCart(productId);
      calculateCartQuantity();
      document.querySelector(`.added-${productId}`).classList.add('added-on');

        const previousTimeoutId = addedMessageTimeouts[productId];
        if (previousTimeoutId) {
          clearTimeout(previousTimeoutId);
        }
  
        const timeoutId = setTimeout(() => {
          document.querySelector(`.added-${productId}`).classList.remove('added-on');
        }, 2000);
        // Save the timeoutId for this product
        // so we can stop it later if we need to.
        addedMessageTimeouts[productId] = timeoutId;
    });
  });  
