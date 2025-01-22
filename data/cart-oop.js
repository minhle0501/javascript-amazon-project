import {validDeliveryOption} from './deliveryOptions.js';
//load du lieu
function Cart(localStorageKey){
    const cart = {
        cartItems: undefined,
   
       //loadFromStorage: function() {
       //short cut function inside object
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
           }
         },
   
         //lưu dữ liệu vào card
         saveToStorage(){
           localStorage.setItem(localStorageKey,JSON.stringify(This.cartItem));
         },
         
         addToCart(productId){
             /*  trong 1 sản phẩm thương mại thì có nhiều sản phẩm có cùng tên với nhau nhưng khác hãng 
                 để giải quyết vấn đề này ta dùng id
                 const productName = button.dataset.productName; */
                //loop dữ liệu qua cart để không bị trùng sản phẩm mà chỉ thêm quantity
                //lưu biến item dưới dạng biến để t dùng nó sau này và cho nó underfield
                let matchingItem;
                //dùng for each
                this.cartItems.forEach((CartItem) => {
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
                  this.cartItems.push({
                    productId,
                    quantity,
                    deliveryOptionId : '1'
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
         
           this.cartItems = newCart;
         
           this.saveToStorage();
         
         },
         
         //14e them vao hàm
         calculateCartQuantity() {
           let cartQuantity = 0;
         
           this.cartItems.forEach((cartItem) => {
             cartQuantity += cartItem.quantity;
           });
         
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
         
         //hàm cập nhật tùy chon giao hàng
         updateDeliveryOption(productId, deliveryOptionId) {
           let matchingItem;
         
           this.cartItems.forEach((cartItem) => {
             if (productId === cartItem.productId) {
               matchingItem = cartItem;
             }
           });
           //for testing
           if (!matchingItem) {
             return;
           }
         
           if (!validDeliveryOption(deliveryOptionId)) {
             return;
           }
         
           matchingItem.deliveryOptionId = deliveryOptionId;
         
           this.saveToStorage();
         },
   }
   return cart;
}
//use function for multiple object
const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();

businessCart.loadFromStorage();


console.log(cart);
console.log(businessCart);