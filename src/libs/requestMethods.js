import axios from "axios"

export const BASE_URL = "https://infrakeys-backend-production.up.railway.app"
export const publicRequest = axios.create({
    baseURL: "https://infrakeys-backend-production.up.railway.app/api"
})

