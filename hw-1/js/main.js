const products = [{
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
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = product => {
    return `<div class="product-item">
                <img src="${product.img}" alt="">
                <h3>${product.title}</h3>
                <p>${product.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    document.querySelector('.products').innerHTML = list.map(product => renderProduct(product)).join('');

};

renderPage(products);