import axios from 'axios'
import {domain} from '@/config'

// axios.defaults.withCredentials = true

const instance = axios.create({
    baseURL: domain.api
})

export default instance
