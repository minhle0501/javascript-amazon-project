import { cart } from "../../data/cart.js";

import { getProduct } from "../../data/products.js";

import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";

import { formatCurrency } from "../utils/money.js";

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

    const paymentSummaryHTML = `
    <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
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

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `;
    document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;
}