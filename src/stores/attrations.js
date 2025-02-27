import { defineStore } from "pinia";

const useAttractionStore = defineStore("userInfor", {
    state: () => ({
        attractions: [],
    }),
    actions: {
        addAttraction(id, name, description, image, opening_hours, transportation, keyword, likes) {
            this.attractions.push({
                id: id,
                name: name,
                description: description,
                image: image,
                opening_hours: opening_hours,
                transportation: transportation,
                keyword: keyword,
                like: likes
            })
        }
    }
})

export default useAttractionStore