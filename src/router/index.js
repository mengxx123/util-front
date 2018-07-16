import Vue from 'vue'
import Router from 'vue-router'

const Ocr = resolve => require(['@/views/Ocr'], resolve)
const Nlp = resolve => require(['@/views/Nlp'], resolve)
const ImageRecognition = resolve => require(['@/views/ImageRecognition'], resolve)
const About = resolve => require(['@/views/About'], resolve)
const Uuid = resolve => require(['@/views/Uuid'], resolve)
const School = resolve => require(['@/views/School'], resolve)
const Blind = resolve => require(['@/views/Blind'], resolve)
const Car = resolve => require(['@/views/Car'], resolve)
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
        path: '/school',
        component: School
    },
    {
        path: '/blind',
        component: Blind
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/car',
        component: Car
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
