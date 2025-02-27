import { defineStore } from "pinia";

const useProductionsStore = defineStore("productions", {
    state: () => ({
        productions: [],
        shopCart: []
    }),
    actions: {
        addProduction(id, name, description, price, image, stock, keyword, state) {
            this.productions.push({
                id: id,
                name: name,
                description: description,
                price: price,
                image: image,
                stock: stock,
                keyword: keyword,
                state: state
            })
        },
        addShopCart(id) {
            this.shopCart.push(id)
        }
    }
})

export default useProductionsStore