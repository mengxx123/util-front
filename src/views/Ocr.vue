<template>
    <my-page title="图片转文字" :page="page">
        <div class="common-container container">
            <form action="http://localhost:1026/net/files" method="post" enctype="multipart/form-data">
                <div class="form-group">
                    <input id="file" type="file" name="logo" class="from-control">
                </div>
                <div class="btns">
                    <ui-raised-button class="btn" label="识别" primary @click="upload" />
                </div>
                <div class="ui-loading" v-if="loading">
                    <ui-circular-progress :size="24"/>
                </div>

                <pre v-if="result">{{ result }}</pre>
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
                result: '',
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            href: 'https://project.yunser.com/products/6a11ff30570811e9973aa373f4f636b0',
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
                        text: '请选择图片文件'
                    })
                    return
                }
                this.loading = true
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
                        this.$http.get(`/ai/orc?path=${result}`).then(
                            response => {
                                let data = response.data
                                console.log('结果2')
                                console.log(data)
                                this.result = data.join('\n')
                                this.loading = false
                            },
                            response => {
                                console.log(response)
                                this.loading = false
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
</style>
