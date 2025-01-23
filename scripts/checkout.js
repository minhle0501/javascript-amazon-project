import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/OrderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
//import '../data/cart-class.js';
//import '../data/backend-practice.js';
import { loadCart } from "../data/cart.js";

/* new Promise((resolve) => {
    loadProducts(() => {
        resolve();
    });
}).then(() => {
    renderCheckoutHeader()
    renderOrderSummary();
    renderPaymentSummary();
}) */
Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
        loadCart(() => {
          resolve();
        });
      }),
]).then(() => {
    renderCheckoutHeader()
    renderOrderSummary();
    renderPaymentSummary();
})
/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1');
  });

}).then((value) => {
  console.log(value);

  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

}).then(() => {
    renderCheckoutHeader()
    renderOrderSummary();
    renderPaymentSummary();
});
*/
/*
loadProducts(() => {
    renderCheckoutHeader()
    renderOrderSummary();
    renderPaymentSummary();
}); */
