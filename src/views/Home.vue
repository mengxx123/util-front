<template>
    <my-page title="智能平台" :page="page">
        <app-list :data="groups" />

        <div class="tool-list">
            <div class="mu-paper list-item mu-paper-round mu-paper-1" 
                v-for="app in apps">
                <router-link class="link" :to="app.to" :href="app.href" :target="app.target">
                    <img :src="app.icon" class="img">
                    <div class="info">
                        <h3 class="text">{{ app.name }}</h3>
                        <div class="desc">{{ app.desc }}</div>
                    </div>
                    <i class="icon icon-heart"></i>
                </router-link>
            </div>
        </div>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                groups: [
                    {
                        name: '文本处理',
                        apps: [
                            {
                                name: '文本纠错',
                                desc: '',
                                icon: '/static/img/build.svg',
                                to: '/textCheck'
                            },
                        ]
                    },
                    {
                        name: '基础工具',
                        apps: [
                            {
                                name: '图片转文字',
                                desc: '',
                                icon: '/static/img/build.svg',
                                to: '/ocr'
                            },
                            {
                                name: '中文分词',
                                desc: '',
                                icon: '/static/img/build.svg',
                                to: '/nlp'
                            },
                            {
                                name: '图像识别',
                                desc: '',
                                icon: '/static/img/build.svg',
                                to: '/image_recognition'
                            },
                            {
                                name: '语音转文字',
                                desc: '',
                                icon: '/static/img/build.svg',
                                to: '/audio_to_text'
                            },
                            {
                                name: 'UUID 生成器',
                                desc: '',
                                icon: '/static/img/build.svg',
                                to: '/uuid'
                            },
                            {
                                name: '高校查询',
                                desc: '',
                                icon: '/static/img/build.svg',
                                to: '/school'
                            },
                            {
                                name: '色盲色弱测试',
                                desc: '',
                                icon: '/static/img/build.svg',
                                to: '/blind'
                            },
                            {
                                name: '车牌号码查询',
                                desc: '',
                                icon: '/static/img/build.svg',
                                to: '/car'
                            }
                        ]
                    }
                ],
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'apps',
                            href: 'https://app.yunser.com/',
                            target: '_blank',
                            title: '应用'
                        }
                    ]
                }
            }
        },
        computed: {
        },
        mounted() {
        },
        methods: {
            init() {
            },
            fileChange(e) {
            },
            sizeStr: function (size) {
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '../scss/var';

.tool-list {
    max-width: 840px;
    margin: 0 auto;
    @include clearfix;
    .list-item {
        position: relative;
        float: left;
        width: 260px;
        height: 96px;
        padding: 8px;
        margin: 2px 16px 16px 2px;
        background-color: #fff;
        cursor: pointer;
        //border: 1px solid #ccc;
        &:hover {
            background-color: #f9f9f9;
            // box-shadow: 0 3px 10px rgba(0,0,0,.156863), 0 3px 10px rgba(0,0,0,.227451);
            //border-color: #09c;
            .icon {
                display: block;
            }
        }
        &.active {
            border: 1px solid #f00;
        }
    }
    a {
        display: block;
        height: 100%;
        color: #666;
    }
    .img {
        float: left;
        width: 72px;
        height: 72px;
        margin-right: 16px;
        background-color: #fff;
        border: 1px solid #e9e9e9;
        border-radius: 8px;
    }
    .info {
        float: left;
    }
    .text {
        font-size: 18px;
        color: #000;
    }
    .header {
        overflow: hidden;
    }
    .desc {
        max-width: 150px;
        margin-top: 8px;
    }
    .icon-heart {
        display: none;
        position: absolute;
        top: 8px;
        right: 8px;
        &:hover {
            color: #f00;
        }
    }
    .icon-close {
        display: none;
        position: absolute;
        top: 32px;
        right: 8px;
        &:hover {
            color: #f00;
        }
    }
}
@media all and (max-width: 400px){
    .tool-list {
        .list-item {
            width: 100%;
            margin-right: 0;
        }
    }
}
</style>
