import Axios from 'axios'
import { API_URL } from '../consts'

export const axios = Axios.create({
    baseURL: API_URL,
    "Content-Type": "application/json"
})