import axios from 'axios'
import {domain} from '@/config'

// axios.defaults.withCredentials = true

const instance = axios.create({
    baseURL: domain.api
})

instance.interceptors.request.use(
    config => {
        console.log('请求')
        // let token = storage.get('accessToken')
        // if (token) {
        //     console.log('有' + token)
        //     config.headers.Authorization = token
        // }
        return config
        // if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
        //     config.headers.Authorization = `token ${store.state.token}`;
        // }
    },
    err => {
        console.log('错误', err)
        return Promise.reject(err)
    })

instance.interceptors.response.use(
    response => {
        console.log('响应')
        console.log(response.data)
        return response
    },
    error => {
        console.log('错误2', error)
        if (error.response) {
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    })

export default instance
