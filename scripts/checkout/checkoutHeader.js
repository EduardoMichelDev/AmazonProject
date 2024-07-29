import { cart } from "../../data/cart.js";

export function renderCheckoutHeader() {

  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });


  const checkoutHeaderHTML = 
  `
    <div class="checkout-header js-checkout-header">
      <div class="header-content">
        <div class="checkout-header-left-section">
          <a href="amazon.html">
            <img class="amazon-logo" src="images/amazon-logo.png">
            <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
          </a>
        </div>

        <div class="checkout-header-middle-section">
          Checkout (<a class="js-return-to-home-link js-checkout-quantity"
            href="amazon.html">${cartQuantity} items</a>)
        </div>

        <div class="checkout-header-right-section">
          <img src="images/icons/checkout-lock-icon.png">
        </div>
      </div>
    </div>

    <div class="main">
      <div class="page-title">Review your order</div>

      <div class="checkout-grid">
        <div class="order-summary js-order-summary">
          
        </div>

        <div class="payment-summary js-payment-summary">
        </div>
      </div>
    </div>
  `;

  document.querySelector('.js-checkout-header')
    .innerHTML = checkoutHeaderHTML;
};