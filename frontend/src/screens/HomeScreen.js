import { getProducts } from '../api.js';
import { parseRequestURL } from '../utils.js';
import Rating from '../components/Rating.js';

const HomeScreen = {
  render: async () => {
    const { value } = parseRequestURL();
    const products = await getProducts({ searchKeyword: value });
    if (!products.length) {
      return '<div class="message">No product found.</div>';
    }
    const view = `
    <ul class="products">
            ${products
              .map(
                (product) => `<li key=${product._id}>
                <div class="product">
                  <a href="#/product/${product._id}">
                    <img class="product-image" src="${product.image}" alt="${
                  product.name
                }" />

                  </a>
                  <div class="product-name">
                    <a href="#/product/${product._id}">${product.name}</a>
                  </div>
                  <div class="product-rating">
                  ${Rating.render({
                    value: product.rating,
                    text: `${product.numReviews} reviews`,
                  })}
                  </div>
                  <div class="product-brand">${product.brand}</div>
                  <div class="product-price">$${product.price}</div>
                  
                </div>
              </li>`
              )
              .join('\n')}
        </ul>
        `;
    return view;
  },
  after_render: async () => {},
};

export default HomeScreen;
