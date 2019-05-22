<template>
    <my-page title="语音转文字" :page="page">
        <div class="common-container container">
            <form action="http://localhost:1026/net/files" method="post" enctype="multipart/form-data">
                <div class="form-group">
                    <input id="file" type="file" name="logo" class="from-control">
                </div>
                <br>
                <ui-select-field v-model="devPid" label="类型">
                    <ui-menu-item :value="1536" title="普通话（支持简单的英文）"/>
                    <ui-menu-item :value="1537" title="普通话（纯中文）"/>
                    <ui-menu-item :value="1737" title="英语"/>
                    <ui-menu-item :value="1637" title="粤语"/>
                    <ui-menu-item :value="1837" title="四川话"/>
                    <ui-menu-item :value="1936" title="普通话（远距离录音）"/>
                </ui-select-field>
                <div class="btns">
                    <ui-raised-button class="btn" label="识别" primary @click="upload" />
                </div>
                <div class="ui-loading" v-if="loading">
                    <ui-circular-progress :size="24"/>
                </div>

                <div class="result" v-if="result">
                    <h2 class="title">{{ result }}</h2>
                </div>
            </form>
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
                result: null,
                devPid: 1537,
                // result: [
                //     {
                //         keyword: "太阳花",
                //         root: "植物-花",
                //         score: 0.320941
                //     }
                // ],
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            href: 'https://project.yunser.com/products/0e61f550570311e9973aa373f4f636b0',
                            target: '_blank',
                            title: '帮助'
                        }
                    ]
                }
            }
        },
        methods: {
            upload() {
                let file = document.getElementById('file').files[0];
                if (!file) {
                    this.$message({
                        type: 'danger',
                        text: '请选择音频文件'
                    })
                    return
                }

                console.log(file)

                let arr = file.name.split('.')
                let ext = arr[arr.length - 1]
                if ('wav,amr,mp3'.indexOf(ext) === -1) {
                    this.$message({
                        type: 'danger',
                        text: '只支持 wav、amr、mp3 格式'
                    })
                    return
                }

                if (file.size > 10 * 1024 * 1024) {
                    this.$message({
                        type: 'danger',
                        text: '音频文件不能大于 10M'
                    })
                    return
                }

                this.loading = true
                this.result = null
                let param = new FormData(); //创建form对象
                param.append('logo',file,file.name);//通过append向form对象添加数据
                param.append('chunk','0');//添加form表单中其他数据
                console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
                let config = {
                    headers:{'Content-Type':'multipart/form-data'}
                };  //添加请求头
                this.$http.post(domain.imgApi + '/net/files',param,config)
                .then(response=>{
                    console.log(response.data);
                    let result = response.data.data.path.replace('public', '').replace(/\\/g, '/').replace(/^\//, '')
                    console.log('结果')
                    console.log(result)
                    this.$http.get(`/audio/audio2text?format=${ext}&dev_pid=${this.devPid}&path=${result}`).then(
                        response => {
                            let data = response.data
                            console.log('结果2')
                            console.log(data)
                            this.result = data
                            this.loading = false
                        },
                        response => {
                            console.log(response)
                            this.loading = false
                            this.result = response.msg
                        })
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
.result {
    .title {
        font-size: 20px;
        margin-bottom: 24px;
    }
}
.result-list {
    .item {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
    }
    .name {
        width: 160px;
        margin-right: 16px;
    }
    .progress {
        width: 80px;
    }
}
</style>
