Vue.component('basket', {
    props: ['cartItems', 'img', 'show'],
    template: `
            <div class="cart-block" v-show="show">
            <p class="basket-empty" v-if="!$parent.cartItems.length">Корзина пуста</p>
            <cart-item v-for="item of cartItems" 
            :key="item.id_product" 
            :img="img" 
            :cart-item="item">
            </cart-item>
               <div class="total-sum" v-if="$parent.cartItems.length">Итого: {{$root.calcSum()}} $</div>
        </div>
`
})

Vue.component('cart-item', {
    props: ["img", "cartItem"],
    template: `
    <div class="basket-item">
                        <div class="item">
                            <img :src="img" alt="product">
                            <div class="product">
                                <div class="product-item">{{cartItem.product_name}}</div>
                                <div class="product-quantity">Quantity: {{cartItem.quantity}} </div>
                                <div class="product-price">{{cartItem.price}} $</div>
                            </div>
                            <div class="total">
                                <div class="total-price">{{cartItem.quantity*cartItem.price}} $</div>
                                <button class="remove-product-btn" @click="$root.delProduct(cartItem)">&times;</button>
                            </div>
                        </div>
                    </div>`
})





{
    /* <p class="basket-empty" v-if="!$parent.basket.length">Корзина пуста</p> */
}