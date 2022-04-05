Vue.component('products', {
    data() {
        return {
            filtered: [],
            products: [],
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.name));
        }
    },
    template: `<ul class="products__list">
                     <product v-for="item of filtered"
                         :key="item.id_product"
                         :img="item.img"
                         :product="item"
                         @add-product="$parent.$refs.cart.addProduct"></product>
                </ul>`
});
Vue.component('product', {
    props: ['product', "img"],
    template: `<li class="products__item">
                        <div class="cart">
                            <div class="cart-wrapper-overlay">
                                <div class="products-img"><img class="products__img" :src="img"></div>
                                <button class="cart-button" @click="$emit('add-product', product)">Add to Cart</button>
                            </div>
                        </div>
                        <div class="products__item-container">
                            <h3 class="products__item-title">{{product.name}}</h3>
                            <p class="products__text">known for her sculptural takes on traditional tailoring,
                                australian
                                arbiter of cool kym ellery teams up with moda operandi.</p>
                            <p class="products__text-pink">$ {{product.price}}</p>
                        </div>
                    </li>`
})