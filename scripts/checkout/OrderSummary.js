import { cart, 
    removeFromCart, 
    calculateCartQuantity, 
    updateQuantity,
    updateDeliveryOption } from "../../data/cart.js";
  
  import { products,getProduct } from "../../data/products.js";
  
  import {formatCurrency} from '../utils/money.js';
  
  import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
  
  //import hàm dayjs với default export (cập nhật thời gian thực)
  import  dayjs  from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
  
  import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";

  import { renderPaymentSummary } from "./paymentSummary.js";
  
  
  export function renderOrderSummary(){
  
  let cartSummaryHTML = ``; 
   
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    //dùng hàm get product lay cart giong nhau
    const matchingProduct = getProduct(productId);
  
    //console.log(matchingProduct);

    //delivery date cập nhật ngày
    const deliveryOptionId = cartItem.deliveryOptionId;

    //dung hàm get delivery option
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    
    //sau khi kiểm tra đúng với cartItem.deliveryOptionId;
    //dùng lại để cập nhật ngày giao hàng của function tùy chọn giao hàng
    const today = dayjs();
  
      const deliveryDate = today.add(
        deliveryOption.deliveryDays
      ,'days');
      const dateString = deliveryDate.format('dddd, DD-MM-YYYY' );
  
  
      cartSummaryHTML += `
      <div class="cart-item-container 
      js-cart-item-container
       js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                Ngày giao hàng : ${dateString}
              </div>
  
              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">
  
                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                  </div>
                  <div class="product-quantity 
                   js-product-quantity-${matchingProduct.id}">
                    <span>
                      số lượng: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                    </span> 
                   
                     <span class="update-quantity-link link-primary 
                     js-update-link" data-product-id="${matchingProduct.id}">
                      Cập nhật
                    </span>
                  
                  <input class="quantity-input js-quantity-input-${matchingProduct.id}">  
  
                    <span class="save-quantity-link link-primary js-save-link"
                    data-product-id="${matchingProduct.id}">
                    Lưu
                   </span>
  
  
                    <span class="delete-quantity-link link-primary 
                    js-delete-link  js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                      Xóa
                    </span>
  
                  </div>
                </div>
  
                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionHTML(matchingProduct, cartItem)}
                </div>
              </div>
            </div>
      `
  });
  //hàm tùy chọn giao hàng
  function deliveryOptionHTML(matchingProduct, cartItem){
    let html = ``;
    deliveryOptions.forEach((deliveryOption) =>{
      const today = dayjs();
  
      const deliveryDate = today.add(
        deliveryOption.deliveryDays
      ,'days');
      const dateString = deliveryDate.format(
        'dddd, DD-MM-YYYY'
      );
      const priceString = deliveryOption
      .priceCents === 0 
      ? 'Miễn phí vận chuyển' : `$${formatCurrency(deliveryOption.priceCents)} - Phí `;
  
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
  
      html +=`<div class="delivery-option js-delivery-option"
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
                        ${priceString} 
                      </div>
                    </div>
                  </div>`;                          
    });
    return html;
  }
  
  //console.log(cartSummaryHTML);
  document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;
  
  
  document.querySelectorAll('.js-delete-link')
  .forEach((link)=>{
    link.addEventListener('click', () => {
      const {productId} = link.dataset;
      removeFromCart(productId);

      const container = document.querySelector(`.js-cart-item-container-${productId}`).remove();
      UpdateCartQuantity();
      //khi cập nhật cart đồng thời cập nhât order summary
      renderPaymentSummary();
    });
  })
  
  //hàm cập nhật số lương
  function UpdateCartQuantity(){
    const cartQuantity = calculateCartQuantity();
  
  document.querySelector('.js-return-to-home-link')
  .innerHTML = `${cartQuantity} items`;
  }
  UpdateCartQuantity();
  
  
  document.querySelectorAll('.js-update-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const {productId} = link.dataset;
        //14h
        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.classList.add('is-editing-quantity');
      });
    });
  
  //chuyển đổi giữa save và update
  document.querySelectorAll('.js-save-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const { productId } = link.dataset;
      // Đây là một ví dụ về một tính năng mà chúng ta có thể thêm: xác thực.
      // Lưu ý: chúng ta cần di chuyển đoạn mã liên quan đến số lượng lên trên
      // bởi vì nếu số lượng mới không hợp lệ, chúng ta nên
      // kết thúc sớm và KHÔNG chạy phần còn lại của mã.
      // Kỹ thuật này được gọi là "kết thúc sớm" (early return).
  
        /* const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.classList.remove('is-editing-quantity'); */
  
        //lấy giá trị và chuyển đổi giá trị đó từ (string) sang kiểu (number).
        const quantityInput = document.querySelector(
          `.js-quantity-input-${productId}`
        );
        const newQuantity = Number(quantityInput.value);
  
        if (newQuantity < 0 || newQuantity >= 1000) {
          alert('Số lượng phải lớn hơn 0 > hoặc < 1000');
          return;
        }
        //console.log(newQuantity);
        updateQuantity(productId, newQuantity);
  
        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.classList.remove('is-editing-quantity');
        //hien len html
        const quantityLabel = document.querySelector(
          `.js-quantity-label-${productId}`
        );
        quantityLabel.innerHTML = newQuantity;
        //luu so luong
        updateQuantity(productId, newQuantity);
      });
    });
  
    //cập nhật html cho delivery date kho chọn option
  document.querySelectorAll('.js-delivery-option')
  .forEach((element) => {
    element.addEventListener('click', () => {
  //dùng thuoc tinh data để lấy 2 dữ liêu duoi
    const {productId, deliveryOptionId} = element.dataset;
    updateDeliveryOption(productId, deliveryOptionId);
    //đệ quy 
    renderOrderSummary();
    //khi cập nhật cart đồng thời cập nhât order summary
    renderPaymentSummary();
      });
    });
  }
 