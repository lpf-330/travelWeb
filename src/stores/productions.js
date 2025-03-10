import { defineStore } from "pinia";

const useProductionsStore = defineStore("productions", {
    state: () => ({
        productions: []
    }),
    actions: {
        addProduction(id, name, message, price, image, stock, keyword) {
            this.productions.push({
                product_id: id,
                name: name,
                message: message,
                price: price,
                image: image,
                stock: stock,
                keyword: keyword,
            })
        },
    }
})

export default useProductionsStore