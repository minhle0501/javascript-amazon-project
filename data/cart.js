export let cart = [{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity : 2,
}, {
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity : 1,
}];

export function addToCart(productId){
    /*  trong 1 sản phẩm thương mại thì có nhiều sản phẩm có cùng tên với nhau nhưng khác hãng 
        để giải quyết vấn đề này ta dùng id
        const productName = button.dataset.productName; */
       //loop dữ liệu qua cart để không bị trùng sản phẩm mà chỉ thêm quantity
       //lưu biến item dưới dạng biến để t dùng nó sau này và cho nó underfield
       let matchingItem;
       //dùng for each
       cart.forEach((CartItem) => {
         //nếu như cart trùng 
         if (productId === CartItem.productId) {
           matchingItem = CartItem;
         }
       });
 
       const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
       const quantity = Number(quantitySelector.value);
 
       if (matchingItem) {
         matchingItem.quantity += quantity;
       } else {
         //push dữ liệu vào cart
         cart.push({
           productId,
           quantity,
         });
       }
 };

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

}