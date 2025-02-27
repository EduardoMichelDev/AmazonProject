import { cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption } from '../../data/cart.js';
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import  dayjs  from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate } from '../../data/deliveryOptions.js'
import { renderPaymentSummary } from './paymentSummary.js';



export function renderOrderSummary() {
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);
      

      
  cartSummaryHTML += `
  <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  ${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update"
                  data-product-id="${matchingProduct.id}">
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                  <span class="save-quantity-link link-primary js-save"
                  data-product-id="${matchingProduct.id}"
                  >Save</span>
                  <span class="delete-quantity-link
                  js-delete-link link-primary" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div>
  `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';


    deliveryOptions.forEach((deliveryOption) => {
      
      const dateString = calculateDeliveryDate(deliveryOption);

      const priceString = deliveryOption.priceCents === 0
      ? 'FREE'
      : `${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
  <div class="delivery-option js-delivery-option"
    data-product-id="${matchingProduct.id}"
    data-delivery-option-id="${deliveryOption.id}">
    <input type="radio"
    ${isChecked ? 'checked' : ''}
      class="delivery-option-input"
      name="delivery-option-${matchingProduct.id}">
    <div>
      <div class="delivery-option-date">
        ${dateString}
      </div>
      <div class="delivery-option-price">
        ${priceString} Shipping
      </div>
    </div>
  </div>
  `
    });

    return html;
  }
  

  document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);

        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();

        renderOrderSummary();
        renderPaymentSummary();
        updateCartQuantity();
        
      });

    });

    function updateCartQuantity() {
      const cartQuantity = calculateCartQuantity();
      console.log(cartQuantity);

      document.querySelector('.js-return-to-home-link')
      .innerHTML = `${cartQuantity} items`;

    }
    document.querySelectorAll('.js-update')
      .forEach((update) => {
        update.addEventListener('click', () => {
          const productId = update.dataset.productId;
          console.log(productId);


          const container = document.querySelector(`.js-cart-item-container-${productId}`);

          container.classList.add('is-editing-quantity');
          document.querySelector('.js-update')
            .classList.add('js-update-disappear')
        });
      });
    
      document.querySelectorAll('.js-save')
      .forEach((save) => {
        save.addEventListener('click', () => {
          handleSave(save);
        });
    
        const productId = save.dataset.productId;
        const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
    
        if (quantityInput) {
          quantityInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
              handleSave(save);
            }
          });
        }
      });
    
    function handleSave(save) {
      const productId = save.dataset.productId;
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
    
      container.classList.remove('is-editing-quantity');
      document.querySelector('.js-update').classList.remove('js-update-disappear');
    
      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
      const newQuantity = Number(quantityInput.value);
      console.log(newQuantity);
    
      if (newQuantity >= 0 && newQuantity < 1000) {
        updateQuantity(productId, newQuantity);
      } else {
        alert('pendejo');
      }
    
      renderOrderSummary();
    
      updateCartQuantity();
    };

    document.querySelectorAll('.js-delivery-option')
      .forEach((element) => {
        element.addEventListener('click', () => {
          const {productId, deliveryOptionId} = element.dataset;
          updateDeliveryOption(productId, deliveryOptionId);
          renderOrderSummary();
          renderPaymentSummary();
        })
      })
    };


  

    