<template>
    <div title="分词">
        测试接口
    </div>
</template>


<script>
    /* eslint-disable */
    import {domain} from '@/config'

    export default {
        data () {
            return {
                loading: false,
                text: '',
                result: '',
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            to: '/help'
                        }
                    ]
                }
            }
        },
        mounted() {
            this.handle()
        },
        methods: {
            handle() {
                this.$http.get('http://www.nicetool.net/yunser_wx_status').then(
                    response => {
                        let data = response.data
                        console.log('结果2')
                        console.log(data)
                    },
                    response => {
                        console.log(response)
                        this.loading = false
                    })     
            }
        }
    }
</script>

<style lang="scss" scoped>
.btns {
    margin-top: 16px;
    margin-bottom: 16px;
}
</style>
