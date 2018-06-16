<template>
    <my-page title="图像识别">
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

            <div class="result" v-if="result">
                <h2 class="title">识别结果</h2>
                <ul class="result-list">
                    <li class="item" v-for="item of result">
                        <div class="name">{{ item.keyword }}</div>
                        <ui-linear-progress class="progress" mode="determinate" :value="item.score * 100"/>
                    </li>
                </ul>
            </div>
        </form>
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
                            to: '/help'
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
                    this.$http.get('/image_recognition?path=' + result).then(
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
