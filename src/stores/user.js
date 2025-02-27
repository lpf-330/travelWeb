import { defineStore } from "pinia";

const useUserInfoStore = defineStore("userInfor", {
    state: () => ({
        uname: "",
        password: "",
        email: "",
        phone: "",
        avatar: Blob,
    }),
    actions: {
        setUser(uname, password, email, phone, avatar,) {
            this.uname = uname,
                this.password = password,
                this.email = email,
                this.phone = phone,
                this.avatar = avatar
        }
    }
})

export default useUserInfoStore