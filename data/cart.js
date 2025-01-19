//load du lieu
export let cart = JSON.parse(localStorage.getItem('cart'));

//nếu k có cart để save thì cho nó default
if(!cart){
  cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity : 2,
    deliveryOptionId : '1'
  }, {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity : 1,
    deliveryOptionId : '2'
  }];
}
//lưu dữ liệu vào card
function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

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
           deliveryOptionId : '1'
         });
       }

       saveToStorage();
 };

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();

}

//14e them vao hàm
export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToStorage();
}

//hàm cập nhật tùy chon giao hàng
export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}