import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/views/Home'], resolve)
const Ocr = resolve => require(['@/views/Ocr'], resolve)
const Nlp = resolve => require(['@/views/Nlp'], resolve)
const ImageRecognition = resolve => require(['@/views/ImageRecognition'], resolve)
const About = resolve => require(['@/views/About'], resolve)
const Uuid = resolve => require(['@/views/Uuid'], resolve)
const School = resolve => require(['@/views/School'], resolve)
const Blind = resolve => require(['@/views/Blind'], resolve)
const Car = resolve => require(['@/views/Car'], resolve)
const AudioToText = resolve => require(['@/views/AudioToText'], resolve)
const AudioToTextHelp = resolve => require(['@/views/AudioToTextHelp'], resolve)
const TextCheck = resolve => require(['@/views/TextCheck'], resolve)
const Asd = resolve => require(['@/views/Asd'], resolve)
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
        path: '/audio_to_text',
        component: AudioToText
    },
    {
        path: '/audio_to_text/help',
        component: AudioToTextHelp
    },
    {
        path: '/textCheck',
        component: TextCheck
    },
    {
        path: '/asd',
        component: Asd
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
