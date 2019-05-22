<template>
    <my-page title="分词">
        <div class="common-container container">
            <ui-text-field v-model="text" label="文本" multiLine :rows="3" :rowsMax="6" hintText="" :maxLength="30000" />
            <div class="btns">
                <ui-raised-button class="btn" label="处理" primary @click="handle" />
            </div>
            <div class="ui-loading" v-if="loading">
                <ui-circular-progress :size="24"/>
            </div>
            <pre v-if="result">{{ result }}</pre>
        </div>
    </my-page>
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
        methods: {
            handle() {
                if (!this.text) {
                    this.$message({
                        type: 'danger',
                        text: '请输入内容'
                    })
                    return
                }
                if (this.text.length > 30000) {
                    this.$message({
                        type: 'danger',
                        text: '文本字数不能大于 30000'
                    })
                    return
                }
                this.loading = true
                this.result = null
                this.$http.post('/nlp', {
                    text: this.text
                }).then(
                    response => {
                        let data = response.data
                        console.log('结果2')
                        console.log(data)
                        let arr = []
                        for (let item of data) {
                            arr.push(item.item)
                        }
                        this.result = arr.join(' ')
                        this.loading = false
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
