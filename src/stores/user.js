import { defineStore } from "pinia";

const useUserInfoStore = defineStore("userInfor", {
    state: () => ({
        user_id: null,
        username: "",
        email: "",
        phone: "",
        avatar: "",
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