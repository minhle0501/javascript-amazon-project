
//tạo mảng vì mảng đại diện cho danh sách
//dùng object đẻ đại diện cho mỗi sản phẩm
//object cho phép ta nhóm lại nhiều giá khác nhau 
import {cart} from '../data/cart.js';

import { products } from '../data/products.js';

//1.tạo ra biên global
let productsHTML = '';
//dùng forEach để loop qua từng object trên(lưu object dưới parem product chay function)
products.forEach((product) => {
  //và chuyển nó qua html bằng cách lưu ở biến html
  //để lưu đc nhiều giá trị ta dùng object syntax

  //2.dùng mẫu tích lũy (accumulator Pattern) ta lặp qua mảng
  //và mỗi lần đó chúng ta thêm vào kết quả +=
  productsHTML += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
           ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
            ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id = "${product.id}">
            Add to Cart
          </button>
        </div>
    `;
})

//kết hơp các html này và put nó lên web
document.querySelector('.js-products-grid')
  .innerHTML = productsHTML;

//Chúng ta sẽ sử dụng một đối tượng để lưu các id thời gian chờ.
// Lý do chúng ta sử dụng một đối tượng là vì mỗi sản phẩm
// sẽ có timeoutId riêng. Vì vậy, một đối tượng cho phép chúng ta
//Lưu nhiều ID thời gian chờ cho các sản phẩm khác nhau.
// For example:
// {
//   'product-id1': 2,
//   'product-id2': 5,
//   ...
// }
// 2 và 5 là các id được trả về khi chúng ta gọi setTimeout).
const addedMessageTimeouts = {};

// làm việc với Add to Cart lưu dưới file cart sau đó
//đặt tên data attribute
//  data-product-name = "${product.name}
document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      //dùng data set để chuyển dữ liệu (chuyển thừ kebab to camel)
      //short cut destructuring
      const { productId } = button.dataset;
      /*  trong 1 sản phẩm thương mại thì có nhiều sản phẩm có cùng tên với nhau nhưng khác hãng 
       để giải quyết vấn đề này ta dùng id
       const productName = button.dataset.productName; */
      //loop dữ liệu qua cart để không bị trùng sản phẩm mà chỉ thêm quantity
      //lưu biến item dưới dạng biến để t dùng nó sau này và cho nó underfield
      let matchingItem;
      //dùng for each
      cart.forEach((item) => {
        //nếu như cart trùng 
        if (productId === item.productId) {
          matchingItem = item;
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

      //cho giá trị của cart hiện tại bằng 0
      let cartQuantity = 0;

      cart.forEach((item) => {
        //tính số lượng product thêm vao cart
        cartQuantity += item.quantity;
      })

      document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;

      //message added div 
      const addedMessage =
      document.querySelector(
        `.js-added-to-cart-${productId}`
      );

      addedMessage.classList.add('added-to-cart-visible');
      setTimeout(() => {
        console.log(addedMessage.classList.remove('added-to-cart-visible'));
      }, 2000);
      //  Kiểm tra xem có thời gian chờ trước đó cho việc này hay không
      //  Nếu có, chúng ta nên ngăn chặn nó.
      const previousTimeoutId = addedMessageTimeouts[productId];
      if (previousTimeoutId) {
        clearTimeout(previousTimeoutId);
      }

      const timeoutId = setTimeout(() => {
        addedMessage.classList.remove('added-to-cart-visible');
      }, 2000);

      // Save the timeoutId for this product
      // so we can stop it later if we need to.
      addedMessageTimeouts[productId] = timeoutId;
    });
  });
