import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/views/Home'], resolve)
const Ocr = resolve => require(['@/views/Ocr'], resolve)
const Nlp = resolve => require(['@/views/Nlp'], resolve)
const NlpVip = resolve => require(['@/views/NlpVip'], resolve)
const ImageRecognition = resolve => require(['@/views/ImageRecognition'], resolve)
const Uuid = resolve => require(['@/views/Uuid'], resolve)
const School = resolve => require(['@/views/School'], resolve)
const Blind = resolve => require(['@/views/Blind'], resolve)
const Car = resolve => require(['@/views/Car'], resolve)
const AudioToText = resolve => require(['@/views/AudioToText'], resolve)
const AudioToTextHelp = resolve => require(['@/views/AudioToTextHelp'], resolve)
const Error404 = resolve => require(['@/views/error/Error404'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        component: Home
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
        path: '/nlp/vip',
        component: NlpVip
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
        path: '/car',
        component: Car
    },
    {
        path: '/audio_to_text',
        component: AudioToText
    },
    {
        path: '/audio_to_text/help',
        component: AudioToTextHelp
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
