function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,
   
    loadFromStorage() {
     this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
   
   if (!this.cartItems) {
     this.cartItems = [{
       productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
       quantity: 2,
       deliveryOptionId: '1'
     }, {
       productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
       quantity: 1,
       deliveryOptionId: '2'
     }];
   };
   }, 
   
   saveToStorage() {
     localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
   },
   
   addtoCart(productId) {
     let matchingItem;
   
     this.cartItems.forEach((cartItem) => {
       if (productId === cartItem.productId) {
         matchingItem = cartItem;
       }
     });
   
     if (matchingItem) {
       matchingItem.quantity += 1;
     } else {
       this.cartItems.push({
         productId: productId,
         quantity: 1,
         deliveryOptionId: '1'
       });
     }
   
     this.saveToStorage();
   },
   
   removeFromCart(productId) {
     const newCart = [];
   
     this.cartItems.forEach((cartItem) => {
       if (cartItem.productId !== productId) {
         newCart.push(cartItem);
       }
     });
     this.cartItems = newCart
     this.saveToStorage();
   },
   
   calculateCartQuantity() {
     let cartQuantity = 0;
   
     this.cartItems.forEach((cartItem) => {
       cartQuantity += cartItem.quantity;
     });
   
     const cartQuantityElement = document.querySelector('.js-cart-quantity');
     if (cartQuantityElement) {
       cartQuantityElement.innerHTML = cartQuantity;
     };
   
     const checkoutQuantityElement = document.querySelector('.js-checkout-quantity');
     if (checkoutQuantityElement) {
       checkoutQuantityElement.innerHTML = `${cartQuantity} items`;
     };
     return cartQuantity;
   },
   updateQuantity(productId, newQuantity) {
     let matchingItem;
   
     this.cartItems.forEach((cartItem) => {
       if (productId === cartItem.productId) {
         matchingItem = cartItem;
       }
     });
   
     matchingItem.quantity = newQuantity;
   
     this.saveToStorage();
   },
   
   updateDeliveryOption(productId, deliveryOptionId) {
     let matchingItem;
   
     this.cartItems.forEach((cartItem) => {
       if (productId === cartItem.productId) {
         matchingItem = cartItem;
       }
     });
   
     matchingItem.deliveryOptionId = deliveryOptionId;
   
     this.saveToStorage();
   },
   };

   return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');



cart.loadFromStorage();
 
 businessCart.loadFromStorage();
 console.log(cart);
 console.log(businessCart);





// export function addtoCart(productId) {
//   let matchingItem;

//       cart.forEach((cartItem) => {
//         if (productId === cartItem.productId) {
//           matchingItem = cartItem;
//         }
//       });
//       const quantitySelector = document.        querySelector(`.js-quantity-selector-${productId} select`);
//       console.log(quantitySelector.value);
//         const quantity = Number(quantitySelector.value);
//         console.log(quantity);

//       if (matchingItem) {
//         matchingItem.quantity += quantity;
//       } else {
//         cart.push({
//           productId,
//           quantity,//shorthand property
//           deliveryOptionId: '1'
//         });
//       };

//     saveToStorage();
// };



