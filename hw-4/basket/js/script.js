'use strict';

const API = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/";



// class ProductList {
//     constructor(container = '.products') {
//         this.container = container;
//         this.products = [];
//         // this._fetchProducts();
//         this.render();
//         // this.sumProducts();
//         this._getProducts()
//             .then(data => {
//                 this.products = data;
//                 this.render()
//             });
//     }

//     // _fetchProducts() {
//     //     this.products = [{
//     //             id: 1,
//     //             title: 'Notebook',
//     //             price: 2000,
//     //             img: 'http://artinblog.ru/uploads/posts/2013-04/1367159240_300x200.jpg'
//     //         },
//     //         {
//     //             id: 2,
//     //             title: 'Mouse',
//     //             price: 20,
//     //             img: 'http://artinblog.ru/uploads/posts/2013-04/1367159240_300x200.jpg'
//     //         },
//     //         {
//     //             id: 3,
//     //             title: 'Keyboard',
//     //             price: 200,
//     //             img: 'http://artinblog.ru/uploads/posts/2013-04/1367159240_300x200.jpg'
//     //         },
//     //         {
//     //             id: 4,
//     //             title: 'Gamepad',
//     //             price: 50,
//     //             img: 'http://artinblog.ru/uploads/posts/2013-04/1367159240_300x200.jpg'
//     //         },
//     //     ];
//     // }


//     _getProducts() {

//         return fetch(`${API}catalogData.json`)
//             .then(result => result.json())
//             .catch(error => console.log(error));
//     }


//     render() {
//         const productList = document.querySelector(this.container);
//         for (let product of this.products) {
//             const productItem = new ProductItem(product);
//             productList.insertAdjacentHTML('beforeend', productItem.render());
//         }
//     }
// }


// class ProductItem {
//     constructor(product, img = 'http://artinblog.ru/uploads/posts/2013-04/1367159240_300x200.jpg') {
//         this.id = product.id;
//         this.title = product.product_name;
//         this.price = product.price;
//         this.img = img;
//     }

//     render() {
//         return `<div class="product-item" id='${this.id}'>
//                     <img src="${this.img}">
//                     <h3>${this.title}</h3>
//                     <p>${this.price}</p>
//                     <button class="buy-btn">Купить</button>
//                 </div>`
//     }
// }

// class Basket {
//     constructor(basket = '.basket__title-list') {
//         this.basket = basket;
//         this.basketList = [];
//         this._showBasket();
//         this.render();
//         this._getBasket()
//             .then(data => {
//                 this.basketList = data.contents;
//                 this.render()
//             });
//         this._sumProducts();
//     }

//     _showBasket() {
//         document.querySelector('.btn-cart').addEventListener('click', (event) => {
//             if (event.target.classList.contains('btn-cart')) {
//                 document.querySelector('.basket').classList.toggle('hidden');
//             }
//         })
//     }

//     add() {}

//     remove() {}

//     delete() {}

//     _sumProducts() {
//         return this.basketList.reduce((acc, product) => acc + product.price, 0);
//     }

//     _getBasket() {

//         return fetch(`${API}getBasket.json`)
//             .then(result => result.json())
//             .catch(error => console.log(error));
//     }

//     render() {
//         const basketList = document.querySelector(this.basket);
//         for (let products of this.basketList) {
//             const basketItem = new BasketItem(products);
//             basketList.insertAdjacentHTML('afterend', basketItem.render());
//         }
//         document.querySelector('.basket-footer-span').innerHTML = this._sumProducts();
//     }
// }

// class BasketItem {
//     constructor(product, img = 'http://artinblog.ru/uploads/posts/2013-04/1367159240_300x200.jpg') {
//         this.title = product.product_name;
//         this.price = product.price;
//         this.img = img;
//         this.count = product.quantity;
//         this.render();
//     }
//     render() {
//         return `<ul class="basket__product-list">
//                     <li class="basket__product-item">${this.title}</li>
//                     <li class="basket__product-item">${this.count}</li>
//                     <li class="basket__product-item">${this.price}</li>
//                     <li class="basket__product-item">${this.price*this.count}</li>
//                 </ul>`
//     }
// }


// const productList = new ProductList();
// const basket = new Basket();



class List {
    constructor(url, container, list = list2) {
        this.container = container;
        this.list = list;
        this.url = url;
        this.goods = [];
        this.allProducts = [];
        this.filtered = [];
        this._init();
    }
    getJson(url) {
        return fetch(url ? url : `${API + this.url}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    handleData(data) {
        this.goods = [...data];
        this.render();
    }
    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new this.list[this.constructor.name](product);
            console.log(productObj);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
    filter(value) {
        const regexp = new RegExp(value, 'i');
        this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
        this.allProducts.forEach(el => {
            const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
            if (!this.filtered.includes(el)) {
                block.classList.add('invisible');
            } else {
                block.classList.remove('invisible');
            }
        })
    }
    _init() {
        return false
    }
}

class Item {
    constructor(el, img = 'https://placehold.it/200x150') {
        this.product_name = el.product_name;
        this.price = el.price;
        this.id_product = el.id_product;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id_product}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn"
                    data-id="${this.id_product}"
                    data-name="${this.product_name}"
                    data-price="${this.price}">Купить</button>
                </div>
            </div>`
    }
}

class ProductsList extends List {
    constructor(cart, container = '.products', url = "/catalogData.json") {
        super(url, container);
        this.cart = cart;
        this.getJson()
            .then(data => this.handleData(data));
    }
    _init() {
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('buy-btn')) {
                this.cart.addProduct(e.target);
            }
        });
        document.querySelector('.search-form').addEventListener('input', e => {
            e.preventDefault();
            this.filter(document.querySelector('.search-field').value)
        })
    }
}


class ProductItem extends Item {}

class Cart extends List {
    constructor(container = ".cart-block", url = "/getBasket.json") {
        super(url, container);
        this.getJson()
            .then(data => {
                this.handleData(data.contents);
            });
    }
    addProduct(element) {
        this.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === productId);
                    if (find) {
                        find.quantity++;
                        this._updateCart(find);
                    } else {
                        let product = {
                            id_product: productId,
                            price: +element.dataset['price'],
                            product_name: element.dataset['name'],
                            quantity: 1
                        };
                        this.goods = [product];
                        this.render();
                    }
                } else {
                    alert('Error');
                }
            })
    }
    removeProduct(element) {
        this.getJson(`${API}/deleteFromBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === productId);
                    if (find.quantity > 1) {
                        find.quantity--;
                        this._updateCart(find);
                    } else {
                        this.allProducts.splice(this.allProducts.indexOf(find), 1);
                        document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
                    }
                } else {
                    alert('Error');
                }
            })
    }
    _updateCart(product) {
        let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
        block.querySelector('.product-quantity').textContent = `Quantity: ${product.quantity}`;
        block.querySelector('.product-price').textContent = `$${product.quantity*product.price}`;
    }
    _init() {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
        });
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('del-btn')) {
                this.removeProduct(e.target);
            }
        })
    }

}

class CartItem extends Item {
    constructor(el, img = 'https://placehold.it/50x100') {
        super(el, img);
        this.quantity = el.quantity;
    }
    render() {
        return `<div class="cart-item" data-id="${this.id_product}">
            <div class="product-bio">
            <img src="${this.img}" alt="Some image">
            <div class="product-desc">
            <p class="product-title">${this.product_name}</p>
            <p class="product-quantity">Quantity: ${this.quantity}</p>
        <p class="product-single-price">$${this.price} each</p>
        </div>
        </div>
        <div class="right-block">
            <p class="product-price">$${this.quantity*this.price}</p>
            <button class="del-btn" data-id="${this.id_product}">&times;</button>
        </div>
        </div>`
    }
}
const list2 = {
    ProductsList: ProductItem,
    Cart: CartItem
};

let cart = new Cart();
let products = new ProductsList(cart);
products.getJson(`getProducts.json`).then(data => products.handleData(data));
