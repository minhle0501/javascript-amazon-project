export const cart = [];

export function addToCart(productId){
    /*  trong 1 sản phẩm thương mại thì có nhiều sản phẩm có cùng tên với nhau nhưng khác hãng 
        để giải quyết vấn đề này ta dùng id
        const productName = button.dataset.productName; */
       //loop dữ liệu qua cart để không bị trùng sản phẩm mà chỉ thêm quantity
       //lưu biến item dưới dạng biến để t dùng nó sau này và cho nó underfield
       let matchingItem;
       //dùng for each
       cart.forEach((item) => {
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