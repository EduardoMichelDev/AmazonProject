export const cart = [];

export function addtoCart(productId) {
  let matchingItem;

      cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cart;
        }
      });
      const quantitySelector = document.        querySelector(`.js-quantity-selector-${productId} select`);
      console.log(quantitySelector);
        const quantity = Number(quantitySelector.value);
        console.log(quantity);

      if (matchingItem) {
        matchingItem.quantity += quantity;
      } else {
        cart.push({
          productId,
          quantity//shorthand property
        });
      };
};