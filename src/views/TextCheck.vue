<template>
    <my-page class="page" title="文本校验" :page="page">
        <div class="common-container container">
            <ui-text-field v-model="text" label="文本" multiLine :rows="3" :rowsMax="6" />
            <div class="tip">
                字数：{{ textTrueLength }} / 510
            </div>
            <div class="btns">
                <ui-raised-button class="btn" label="文本审核" primary @click="check" />
                <ui-raised-button class="btn" label="文本纠错" secondary @click="handle" />
            </div>
            <div class="ui-loading" v-if="loading">
                <ui-circular-progress :size="24"/>
            </div>
            <div v-if="result">
                <div class="success" v-if="success">
                    校验通过
                </div>
                <div v-else>
                    <div class="error">校验不通过</div>
                    <div class="htmlResult" v-html="result"></div>
                </div>
            </div>
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
                // text: '百度是一家人工智能公司,是我国强有力的竞争对手,他昨天早上凌晨走了',
                text: '',
                // text: '如果苟利国家生死以，这是一段文本江泽民123草泥马',
                result: '',
                success: false,
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            href: 'https://project.yunser.com/products/abba637056b111e9973aa373f4f636b0',
                            target: '_blank',
                            title: '帮助'
                        }
                    ]
                }
            }
        },
        computed: {
            textTrueLength() {
                return this.getLength(this.text)
            }
        },
        mounted() {
            // this.dealResult({
            //     "log_id": 6190511910078939000,
            //     "item": {
            //         "vec_fragment": [
            //             {
            //                 "ori_frag": "只能",
            //                 "begin_pos": 14,
            //                 "correct_frag": "智能",
            //                 "end_pos": 18
            //             },
            //             {
            //                 "ori_frag": "利的",
            //                 "begin_pos": 33,
            //                 "correct_frag": "力的",
            //                 "end_pos": 37
            //             },
            //             {
            //                 "ori_frag": "零晨",
            //                 "begin_pos": 56,
            //                 "correct_frag": "凌晨",
            //                 "end_pos": 60
            //             }
            //         ],
            //         "score": 0.986521,
            //         "correct_query": "百度是一家人工智能公司,是我国强有力的竞争对手,他昨天早上凌晨走了"
            //     },
            //     "text": "百度是一家人工只能公司,是我国强有利的竞争对手,他昨天早上零晨走了"
            // })
            // this.dealResult2({
            //     "log_id": 8807647489812745829,
            //     "result": {
            //         "spam": 1,
            //         "review": [],
            //         "reject": [
            //             {
            //                 "score": 1,
            //                 "hit": [
            //                     "江泽民",
            //                     "泽民",
            //                     "苟利国家生死",
            //                     "江泽民"
            //                 ],
            //                 "label": 3
            //             },
            //             {
            //                 "score": 0.875,
            //                 "hit": [
            //                     "草泥",
            //                     "草泥马",
            //                     "泥马"
            //                 ],
            //                 "label": 5
            //             }
            //         ],
            //         "pass": [
            //             {
            //                 "score": 0.14599999785423,
            //                 "hit": [],
            //                 "label": 1
            //             },
            //             {
            //                 "score": 0.030999999493361,
            //                 "hit": [],
            //                 "label": 2
            //             },
            //             {
            //                 "score": 0.1486798013245,
            //                 "hit": [],
            //                 "label": 4
            //             },
            //             {
            //                 "score": 0.0099999997764826,
            //                 "hit": [],
            //                 "label": 5
            //             }
            //         ]
            //     }
            // })
        },
        methods: {
            dealResult(result) {
                this.result = result.text
                let originText = result.text

                console.log('找到', this.charAt(originText, 14))
                console.log('找到', this.charAt2(originText, 18))
                console.log('儿子', originText.substring(7, 8 + 1))
                console.log('测试', this.replace(originText, 2, 3, '==='))
                console.log('测试', this.replace2(originText, 14, 18, '==='))

                let offset = 0
                for (let i = 0; i < result.item.vec_fragment.length; i++) {
                    console.log('处理')
                    let item = result.item.vec_fragment[i]
                    result.item.vec_fragment[i].start = this.trueIndex(originText, item.begin_pos)
                    result.item.vec_fragment[i].end = this.trueIndex2(originText, item.end_pos)
                }
                console.log('处理后', result)
                let totalOffset = 0
                for (let i = 0; i < result.item.vec_fragment.length; i++) {
                    console.log('处理2')
                    let item = result.item.vec_fragment[i]
                    // if (i === 0 || i === 1) {
                        console.log(`${item.ori_frag} 改成 ${item.correct_frag}`)
                        // console.log('啦啦啦', this.replace2(originText, item.begin_pos, item.end_pos, '==='))
                        let { text, offset } = this.replaceAsd(originText, item.start + totalOffset, item.end + totalOffset,
                            `<strong>${item.ori_frag}</strong><span class="success">${item.correct_frag}</span>`)
                        originText = text
                        totalOffset += offset
                        console.log('完成', originText, offset)
                    // }
                }
                // for (let i = 0; i < result.item.length; i++) {
                //     let item = result.item[i]
                // }

                this.result = originText
            },
            trueIndex(text, index) {
                let count = 0
                for (let i = 0; i < text.length; i++) {
                    if (count === index) {
                        return i
                    }
                    if (text.charAt(i).match(/[\u0391-\uFFE5]/)) {
                        count += 2
                    } else {
                        count += 1
                    }
                }
                return -1
            },
            trueIndex2(text, index) {
                let count = 0
                for (let i = 0; i < text.length; i++) {
                    if (text.charAt(i).match(/[\u0391-\uFFE5]/)) {
                        count += 2
                    } else {
                        count += 1
                    }
                    if (count === index) {
                        return i
                    }
                }
                return -1
            },
            charAt(text, index) {
                return text.charAt(this.trueIndex(text, index))
            },
            charAt2(text, index) {
                return text.charAt(this.trueIndex2(text, index))
            },
            replaceAsd(text, start, end, replaceText) {
                console.log('replaceText.length', replaceText.length, end - start)
                return {
                    offset: replaceText.length - (end - start + 1),
                    text: text.substring(0, start) + replaceText + text.substring(end + 1, text.length)
                }
            },
            replace(text, start, end, replaceText) {
                return text.substring(0, start) + replaceText + text.substring(end + 1, text.length)
            },
            replace2(text, start, end, replaceText) {
                return this.replace(text, this.trueIndex(text, start), this.trueIndex2(text, end), replaceText)
            },
            getLength(text) {
                let count = 0
                for (let i = 0; i < text.length; i++) {
                    if (text.charAt(i).match(/[\u0391-\uFFE5]/)) {
                        count += 2
                    } else {
                        count += 1
                    }
                }
                return count
            },
            handle() {
                if (!this.text) {
                    this.$message({
                        type: 'danger',
                        text: '请输入内容'
                    })
                    return
                }
                if (this.getLength(this.text) > 400) {
                    this.$message({
                        type: 'danger',
                        // text: '文本不能大于 510 个字符（中文算两个字符）'
                        text: '文本不能大于 510 个字符'
                    })
                    return
                }
                console.log('==LENGTH', this.text.length, this.getLength(this.text))
                this.loading = true
                this.result = null
                this.$http.get('/ecnet?text=' + encodeURIComponent(this.text.replace(/\n/g, ''))).then(
                    response => {
                        let data = response.data
                        console.log('结果2')
                        console.log(data)
                        if (data.error_code) {
                            this.$message({
                                type: 'danger',
                                text: data.error_msg.replace('input text too long', '文本不能大于 500 字')
                            })
                            
                        }
                        this.dealResult(data)
                        this.loading = false
                        this.success = !data.item.vec_fragment.length
                    },
                    response => {
                        console.log(response)
                        this.loading = false
                    })     
            },
            check() {
                if (!this.text) {
                    this.$message({
                        type: 'danger',
                        text: '请输入内容'
                    })
                    return
                }
                if (this.text.length > 400) {
                    this.$message({
                        type: 'danger',
                        text: '文本不能大于 500 字'
                    })
                    return
                }
                this.loading = true
                this.result = null
                this.$http.get('/text/check?text=' + encodeURIComponent(this.text.replace(/\n/g, ''))).then(
                    response => {
                        let data = response.data
                        console.log('结果2')
                        console.log(data)
                        this.dealResult2(data)
                        this.loading = false
                    },
                    response => {
                        console.log(response)
                        this.loading = false
                    }) 
            },
            dealResult2(data) {
                if (data.result.reject.length) {
                    this.success = false
                    let result = this.text
                    for (let item of data.result.reject) {
                        let hit = item.hit
                        for (let h of hit) {
                            result = result.replace(h, `<span class="red">${h}</span>`)
                        }
                    }
                    this.result = result
                } else {
                    this.success = true
                    this.result = '123'
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.tip {
    color: #999;
}
.page {
    // display: none;
}
.btns {
    margin-top: 16px;
    margin-bottom: 16px;
    .btn {
        margin-right: 8px;
    }
}
.success {
    color: rgb(17, 119, 17);
}
.error {
    color: rgb(230, 31, 64);
}
</style>

<style lang="scss">
.htmlResult {
    margin-top: 16px;
    color: #333;
    font-size: 14px;
    font-family: 'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB','Microsoft YaHei','微软雅黑',Arial,sans-serif;
    strong {
        color: #f00;
        text-decoration: line-through;
    }
    .success {
        color: rgb(17, 119, 17);
        font-weight: bold;
    }
    .red {
        color: #f00;
    }
}
</style>
