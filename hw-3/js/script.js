'use strict';

const API = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/";



class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.products = [];
        // this._fetchProducts();
        this.render();
        // this.sumProducts();
        this._getProducts()
            .then(data => {
                this.products = data;
                console.log(data);
                this.render()
            });
    }

    // _fetchProducts() {
    //     this.products = [{
    //             id: 1,
    //             title: 'Notebook',
    //             price: 2000,
    //             img: 'http://artinblog.ru/uploads/posts/2013-04/1367159240_300x200.jpg'
    //         },
    //         {
    //             id: 2,
    //             title: 'Mouse',
    //             price: 20,
    //             img: 'http://artinblog.ru/uploads/posts/2013-04/1367159240_300x200.jpg'
    //         },
    //         {
    //             id: 3,
    //             title: 'Keyboard',
    //             price: 200,
    //             img: 'http://artinblog.ru/uploads/posts/2013-04/1367159240_300x200.jpg'
    //         },
    //         {
    //             id: 4,
    //             title: 'Gamepad',
    //             price: 50,
    //             img: 'http://artinblog.ru/uploads/posts/2013-04/1367159240_300x200.jpg'
    //         },
    //     ];
    // }


    _getProducts() {

        return fetch(`${API}catalogData.json`)
            .then(result => result.json())
            .catch(error => console.log(error));
    }


    render() {
        const productList = document.querySelector(this.container);
        for (let product of this.products) {
            const productItem = new ProductItem(product);
            productList.insertAdjacentHTML('beforeend', productItem.render());
        }
    }
}


class ProductItem {
    constructor(product, img = 'http://artinblog.ru/uploads/posts/2013-04/1367159240_300x200.jpg') {
        this.id = product.id;
        this.title = product.product_name;
        this.price = product.price;
        this.img = img;
    }

    render() {
        return `<div class="product-item" id='${this.id}'>
                    <img src="${this.img}">
                    <h3>${this.title}</h3>
                    <p>${this.price}</p>
                    <button class="buy-btn">Купить</button>
                </div>`
    }
}

class Basket {
    constructor(basket = '.basket__title-list') {
        this.basket = basket;
        this.basketList = [];
        this._showBasket();
        this.render();
        this._getBasket()
            .then(data => {
                this.basketList = data.contents;
                console.log(data.contents);
                this.render()
            });
        this._sumProducts();
    }

    _showBasket() {
        document.querySelector('.btn-cart').addEventListener('click', (event) => {
            if (event.target.classList.contains('btn-cart')) {
                document.querySelector('.basket').classList.toggle('hidden');
            }
        })
    }

    add() {}

    remove() {}

    delete() {}

    _sumProducts() {
        return this.basketList.reduce((acc, product) => acc + product.price, 0);
    }

    _getBasket() {

        return fetch(`${API}getBasket.json`)
            .then(result => result.json())
            .catch(error => console.log(error));
    }

    render() {
        const basketList = document.querySelector(this.basket);
        for (let products of this.basketList) {
            const basketItem = new BasketItem(products);
            basketList.insertAdjacentHTML('afterend', basketItem.render());
        }
        document.querySelector('.basket-footer-span').innerHTML = this._sumProducts();
    }
}

class BasketItem {
    constructor(product, img = 'http://artinblog.ru/uploads/posts/2013-04/1367159240_300x200.jpg') {
        this.title = product.product_name;
        this.price = product.price;
        this.img = img;
        this.count = product.quantity;
        this.render();
    }
    render() {
        return `<ul class="basket__product-list">
                <li class="basket__product-item">${this.title}</li>
                <li class="basket__product-item">${this.count}</li>
                <li class="basket__product-item">${this.price}</li>
                <li class="basket__product-item">${this.price*this.count}</li>
                </ul>`
    }
}


const productList = new ProductList();
const basket = new Basket();