<template>
    <my-page title="UUID 生成器">
        <ui-select-field v-model="version" label="版本">
            <ui-menu-item value="1" title="v1"/>
            <ui-menu-item value="2" title="v4"/>
        </ui-select-field>
        <br>
        <ui-text-field v-model.number="number" type="number" label="数量" hintText="1" />
        <div class="btns">
            <ui-raised-button class="btn" label="生成" primary @click="handle" />
        </div>
        <div class="ui-loading" v-if="loading">
            <ui-circular-progress :size="24"/>
        </div>
        <pre v-if="result">{{ result }}</pre>
    </my-page>
</template>


<script>
    const uuidv1 = require('uuid/v1')
    // const uuidv3 = require('uuid/v3')
    const uuidv4 = require('uuid/v4')
    // const uuidv5 = require('uuid/v5')

    export default {
        data () {
            return {
                loading: false,
                version: '1',
                number: 1,
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
            console.log(uuidv1())
        },
        methods: {
            handle() {
                let arr = []
                for (let i = 0; i < this.number; i++) {
                    if (this.version === '1') {
                        arr.push(uuidv1())
                    } else {
                        arr.push(uuidv4())
                    }
                }
                this.result = arr.join('\n')
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
