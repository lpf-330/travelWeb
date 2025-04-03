import { defineStore } from "pinia";

const useUserInfoStore = defineStore("userInfor", {
    state: () => ({
        user_id: "",
        username: "",
        email: "",
        phone: "",
        avatar: "",
        address: [],
        nowAddr: 0
    }),
    actions: {
        setUser(uname, password, email, phone, avatar) {
            this.uname = uname,
                this.password = password,
                this.email = email,
                this.phone = phone,
                this.avatar = avatar
        }
    }
})

export default useUserInfoStore