import Vue from 'vue'
import Router from 'vue-router'

const Ocr = resolve => require(['@/views/Ocr'], resolve)
const Nlp = resolve => require(['@/views/Nlp'], resolve)
const ImageRecognition = resolve => require(['@/views/ImageRecognition'], resolve)
const About = resolve => require(['@/views/About'], resolve)
const Uuid = resolve => require(['@/views/Uuid'], resolve)
const Error404 = resolve => require(['@/views/error/Error404'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        redirect: '/ocr'
    },
    {
        path: '/ocr',
        component: Ocr
    },
    {
        path: '/nlp',
        component: Nlp
    },
    {
        path: '/image_recognition',
        component: ImageRecognition
    },
    {
        path: '/uuid',
        component: Uuid
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '*',
        component: Error404
    }
]

let router = new Router({
    mode: 'history',
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
})

export default router
