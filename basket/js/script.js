'use strict';

class Basket {
    constructor(basket = '.basket') {
        this.basket = basket;
        this.basketList = [];
        this._showBasket();
        this.render();
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

    render() {
        // const basketList = document.querySelector(this.basket);
        // for (let products of this.basketList) {
        //     const basketItem = new BasketItem(products);
        //     basketList.insertAdjacentHTML('beforeend', basketItem.render());
        // }
    }
}

class BasketItem {
    constructor(product) {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = product.img;
        this.count = 1;
        this.render();
    }
    render() {
        `<ul class="basket__product-list">
                <li class="basket__product-item">${this.img}</li>
                <li class="basket__product-item">${this.name}</li>
                <li class="basket__product-item">${this.count}</li>
                <li class="basket__product-item">${this.price}</li>
                <li class="basket__product-item">${this.price*this.count}</li>
                </ul>`
    }
}

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.products = [];
        this._fetchProducts();
        this.render();
        this.sumProducts();
    }

    _fetchProducts() {
        this.products = [{
                id: 1,
                title: 'Notebook',
                price: 2000,
                img: 'http://artinblog.ru/uploads/posts/2013-04/1367159240_300x200.jpg'
            },
            {
                id: 2,
                title: 'Mouse',
                price: 20,
                img: 'http://artinblog.ru/uploads/posts/2013-04/1367159240_300x200.jpg'
            },
            {
                id: 3,
                title: 'Keyboard',
                price: 200,
                img: 'http://artinblog.ru/uploads/posts/2013-04/1367159240_300x200.jpg'
            },
            {
                id: 4,
                title: 'Gamepad',
                price: 50,
                img: 'http://artinblog.ru/uploads/posts/2013-04/1367159240_300x200.jpg'
            },
        ];
    }

    sumProducts() {
        const totalPrice = this.products.reduce((acc, product) => acc + product.price, 0);
        console.log(totalPrice);
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
    constructor(product) {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = product.img;
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

const productList = new ProductList();
const basket = new Basket();