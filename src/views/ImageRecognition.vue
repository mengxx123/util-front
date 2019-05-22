<template>
    <my-page title="图像识别" :page="page">
        <div class="common-container container">
            <div class="scan-box">
                <div class="img-box">
                    <img class="main-img" :src="imageSrc">
                </div>
                <!--
                <dvi class="scan">
                <img class="scan-img" src="/static/img/scan.png">
                <img class="line" src="/static/img/line.png">
                </dvi> -->
                <canvas class="canvas" width="400" height="250" id="canvas"></canvas>
                <div class="best" v-if="result && best">最佳猜测：{{ best }}</div>
            </div>
            <div class="form-group">
                <input id="file" type="file" name="logo" class="from-control" @change="onFileChange">
            </div>
            <ui-radio label="通用识别" name="group" nativeValue="common" v-model="type" @change="onTypeChange" class="demo-radio"/> <br/>
            <ui-radio label="菜品识别" name="group" nativeValue="food" v-model="type"  class="demo-radio"  @change="onTypeChange"/> <br/>
            <ui-radio label="车辆识别" name="group" nativeValue="car" v-model="type"  class="demo-radio"  @change="onTypeChange"/> <br/>
            <div class="btns">
                <ui-raised-button class="btn" label="识别" primary @click="upload" />
            </div>
            <div class="ui-loading" v-if="loading">
                <ui-circular-progress :size="24"/>
            </div>

            <div class="result" v-if="result">
                <h2 class="title">识别结果</h2>
                <!-- <div v-if="result.calorie === '-1'">不是菜品</div> -->
                <ui-article class="article">
                    <table v-if="type === 'common'">
                        <tr>
                            <th>物品名称</th>
                            <th>类别</th>
                            <th>可信度</th>
                        </tr>
                        <tr v-for="item of result">
                            <td>{{ item.keyword }}</td>
                            <td>{{ item.root }}</td>
                            <td>{{ (item.score * 100).toFixed(1) }}%</td>
                        </tr>
                    </table>

                    <table v-if="type === 'car'">
                        <tr>
                            <th>车名</th>
                            <th>年份</th>
                            <th>可信度</th>
                        </tr>
                        <tr v-for="item of result">
                            <td>{{ item.name }}</td>
                            <td>{{ item.year }}</td>
                            <td>{{ (item.score * 100).toFixed(1) }}%</td>
                        </tr>
                    </table>

                    <table v-if="type === 'food'">
                        <tr>
                            <th>菜品名称</th>
                            <!-- <th>类别</th> -->
                            <th>可信度</th>
                            <th>卡路里</th>
                        </tr>
                        <tr v-for="item of result">
                            <td>{{ item.name }}</td>
                            <!-- <td>{{ item.root }}</td> -->
                            <td>{{ (parseFloat(item.probability) * 100).toFixed(1) }}%</td>
                            <td>{{ item.calorie }}</td>
                        </tr>
                    </table>
                </ui-article>
                <!-- <ul class="result-list">
                    <li class="item" v-for="item of result">
                        <div class="name">{{ item.keyword }}</div>
                        <ui-linear-progress class="progress" mode="determinate" :value="item.score * 100"/>
                    </li>
                </ul> -->
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
                type: 'common',
                loading: false,
                result: null,
                best: '',
                imageSrc: '/static/img/flower.jpg',
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
                            href: 'https://project.yunser.com/products/36720ac0570411e9973aa373f4f636b0',
                            target: '_blank',
                            title: '帮助'
                        }
                    ]
                }
            }
        },
        mounted() {
            this.canvas = document.getElementById('canvas')
            this.ctx = this.canvas.getContext('2d')
        },
        destroyed() {
            this.timer && clearInterval(this.timer)
        },
        methods: {
            startAnim() {
                let y = 0
                // this.dir

                this.timer = setInterval(() => {
                    if (y > 250) {
                        y = -40
                    }
                    y += 8
                    this.draw(y)
                }, 50)
            },
            stopAnim() {
                this.ctx.clearRect(0, 0, 400, 250)
                this.timer && clearInterval(this.timer)
            },
            draw(y) {
                const WIDTH = 400
                const HEIGHT = 40
                this.ctx.clearRect(0, 0, WIDTH, 250)
                let gradient = this.ctx.createLinearGradient(0, y + HEIGHT, 0, y)
                gradient.addColorStop(0, 'rgba(29, 192, 210, .6)')
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
                this.ctx.beginPath()
                this.ctx.fillStyle = gradient
                this.ctx.rect(0, y, WIDTH, HEIGHT)
                this.ctx.fill()
            },
            onTypeChange() {
                this.result = null
            },
            onFileChange(e) {
                let files = event.target.files
                if (!files.length) {
                    return
                }
                let file = files[0]
                let arr = file.name.split('.')
                let ext = arr[arr.length - 1]
                if ('png,jpg,jpeg,bmp'.indexOf(ext) === -1) {
                    this.$message({
                        type: 'danger',
                        text: '只支持 png、jpg、jpeg、bmp 格式'
                    })
                    return
                }

                if (file.size > 2 * 1024 * 1024) {
                    this.$message({
                        type: 'danger',
                        text: '图片不能大于 2M'
                    })
                    return
                }

                let reader = new FileReader()
                reader.onload = e => {
                    this.imageSrc = e.target.result
                };
                reader.readAsDataURL(file)

                this.result = null

            },
            upload() {
                let file = document.getElementById('file').files[0];
                if (!file) {
                    this.$message({
                        type: 'danger',
                        text: '请选择图片文件'
                    })
                    return
                }
                let arr = file.name.split('.')
                let ext = arr[arr.length - 1]
                if ('png,jpg,jpeg,bmp'.indexOf(ext) === -1) {
                    this.$message({
                        type: 'danger',
                        text: '只支持 png、jpg、jpeg、bmp 格式'
                    })
                    return
                }

                if (file.size > 2 * 1024 * 1024) {
                    this.$message({
                        type: 'danger',
                        text: '图片不能大于 2M'
                    })
                    return
                }
                this.loading = true
                this.startAnim()
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
                    this.$http.get(`/image_recognition?type=${this.type}&path=${result}`).then(
                        response => {
                            let data = response.data
                            console.log('结果2')
                            console.log(data)
                            this.result = data
                            if (this.result.length) {
                                this.best = this.result[0].keyword || this.result[0].name
                            }
                            this.loading = false
                            this.stopAnim()
                        },
                        response => {
                            console.log(response)
                            this.loading = false
                            this.stopAnim()
                        })
                },
                    response => {
                        console.log(response)
                        this.loading = false
                        this.stopAnim()
                    })        
            }
        }
    }
</script>

<style lang="scss" scoped>
.container {
    max-width: 400px;
}
.canvas {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    // background-color: rgba(255, 255, 255, .8);
}
.scan-box {
    position: relative;
    width: 100%;
    height: 250px;
    margin: 0 auto 32px auto;
    background-color: #000;
    border: 1px solid #ccc;
    overflow: hidden;
    border-radius: 8px;
    .img-box {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .main-img {
        max-width: 100%;
        max-height: 100%;
    }
    .scan {
        position: absolute;
        left: 0;
        width: 130px;
        height: 130px;
        background-color: #f00;
    }
    .scan-img {
        width: 130px;
    }
    .line {
        width: 130px;
    }
    .best {
        position: absolute;
        color: #fff;
        top: 16px;
        left: 16px;
        background-color: #000;
        border-radius: 4px;
        padding: 4px 8px;
    }
}
.form-group {
    margin-bottom: 16px;
}
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
