console.log('hello');
//tạo mảng vì mảng đại diện cho danh sách
//dùng object đẻ đại diện cho mỗi sản phẩm
//object cho phép ta nhóm lại nhiều giá khác nhau 

const products = [{
    image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
    name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
    rating: {
        stars: 4.5,
        count: 87
    },
    priceCents: 1090,
}, {
    image: 'images/products/intermediate-composite-basketball.jpg',
    name: 'Intermediate Size Basketball',
    rating: {
        stars: 4,
        count: 127
    },
    priceCents: 2095,
}, {
    image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
    name: 'Adults Plain Cotton T-Shirt - 2 Pack',
    rating: {
        stars: 4.5,
        count: 56
    },
    priceCents: 799,
}];
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
            <select>
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

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary">
            Add to Cart
          </button>
        </div>
    `;
    //kết hơp các html này và put nó lên web
    document.querySelector('.js-products-grid')
    .innerHTML = productsHTML;
})
