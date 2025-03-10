import { defineStore } from "pinia";

const useShopCartStore = defineStore("shopCart", {
    state: () => ({
        shopCart: []
    }),
    actions: {
        add(product_id, quantity) {
            let flag = true
            for (let i = 0; i < this.shopCart.length; i++) {
                if (this.shopCart[i].product_id === product_id) {
                    this.shopCart[i].quantity += quantity
                    flag = false
                    break
                }
            }

            if (flag) {
                this.shopCart.push({
                    product_id: product_id,
                    quantity: quantity
                })
            }
        },
        reduce(product_id) {
            for (let i = 0; i < this.shopCart.length; i++) {
                if (this.shopCart[i].product_id === product_id) {
                    this.shopCart[i].quantity--
                    if (this.shopCart[i].quantity === 0) {
                        this.shopCart.splice(i, 1)
                    }
                    break
                }
            }
        }
    }
})

export default useShopCartStore