import { cart } from "../../data/cart.js";

import { getProduct } from "../../data/products.js";

import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";

import { formatCurrency } from "../utils/money.js";

import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary(){
    let productPriceCents = 0; 
    let shippingPriceCents = 0;

    cart.forEach((cartItem) => {
        //cập nhật giá summary
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;
        //phí ship summary
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
    });
    //phí trước tax
    const totalBeforeTax = productPriceCents + shippingPriceCents;
    //tax ước tính 
    const estimatedTax = totalBeforeTax * ( 10 / 100 );
    //tổng chi phí
    const totalCents = totalBeforeTax + estimatedTax;
    //update number in item from order summary 
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    const paymentSummaryHTML = `
    <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">$
            ${formatCurrency(productPriceCents)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$
            ${formatCurrency(shippingPriceCents)}
            </div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$
            ${formatCurrency(totalBeforeTax)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$
            ${formatCurrency(estimatedTax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$
            ${formatCurrency(totalCents)}
            </div>
          </div>

          <button class="place-order-button button-primary
          js-place-order">
            Place your order
          </button>
    `;
    document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;

    document.querySelector('.js-place-order')
    .addEventListener('click', async() => {
     try{
      const response =await fetch('https://supersimplebackend.dev/orders', {
        //update thông tin
        method: 'POST',
        //cho chúng ta thêm thông tin của request header của network
        //trong F12 
        headers: {
          //daady là loại data ta thấy ở phần 
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          cart: cart
        })
      });
      const order = await response.json();
      addOrder(order);
     }catch(error){
      alert('Có lỗi xảy ra, vui lòng thử lại');
     }
     //
     window.location.href = 'orders.html';
    });
}

