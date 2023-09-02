import axios from "axios"

export const BASE_URL = "https://infrakeysapp.in/api"
export const publicRequest = axios.create({
    baseURL: BASE_URL
})

