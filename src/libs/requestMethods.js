import axios from "axios"

export const BASE_URL = "http://62.72.59.14/api"
export const publicRequest = axios.create({
    baseURL: BASE_URL
})

