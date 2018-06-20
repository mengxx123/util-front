<template>
    <my-page title="色盲色弱测试">
        <ui-article>
            <div id="input-box" class="row">
                <div class="col-sm-8">
                    <article>
                        <table class="table blind-table table-bordered">
                            <tr>
                                <td colspan="4"><strong>色盲、色弱测试图片一</strong></td>
                            </tr>
                            <tr>
                                <td><img src="/static/img/blind/1.png" class="img-thumbnail"></td>
                                <td><img src="/static/img/blind/2.png" class="img-thumbnail"></td>
                            </tr>
                            <tr>
                                <td>图-1</td>
                                <td>图-2</td>
                            </tr>
                            <tr>
                                <td><img src="/static/img/blind/3.png" class="img-thumbnail"></td>
                                <td><img src="/static/img/blind/4.png" class="img-thumbnail"></td>
                            </tr>
                            <tr>
                                <td>图-3</td>
                                <td>图-4</td>
                            </tr>
                            <tr>
                                <td><img src="/static/img/blind/5.png" class="img-thumbnail"></td>
                                <td><img src="/static/img/blind/6.png" class="img-thumbnail"></td>
                            </tr>
                            <tr>
                                <td>图-5</td>
                                <td>图-6</td>
                            </tr>
                            <tr>
                                <td><img src="/static/img/blind/7.png" class="img-thumbnail"></td>
                                <td><img src="/static/img/blind/8.png" class="img-thumbnail"></td>
                            </tr>
                            <tr>
                                <td>图-7</td>
                                <td>图-8</td>
                            </tr>
                            <tr>
                                <td><img src="/static/img/blind/9.png" class="img-thumbnail"></td>
                                <td><img src="/static/img/blind/10.png" class="img-thumbnail"></td>
                            </tr>
                            <tr>
                                <td>图-9</td>
                                <td>图-10</td>
                            </tr>
                            <tr>
                                <td><img src="/static/img/blind/11.png" class="img-thumbnail"></td>
                                <td><img src="/static/img/blind/12.png" class="img-thumbnail"></td>
                            </tr>
                            <tr>
                                <td>图-11</td>
                                <td>图-12</td>
                            </tr>
                        </table>
                        <table class="blind-table table table-bordered">
                            <tbody>
                            <tr>
                                <td colspan="4"><strong>色盲、色弱测试一结果</strong></td>
                            </tr>
                            <tr>
                                <td>图号</td>
                                <td>正常辨认</td>
                                <td>异常辨认</td>
                                <td>异常类型</td>
                            </tr>
                            <tr>
                                <td>图-1</td>
                                <td>6</td>
                                <td>6</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>图-2</td>
                                <td>6,9,8</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>图-3</td>
                                <td>3,6</td>
                                <td>不能读</td>
                                <td>红色盲</td>
                            </tr>
                            <tr>
                                <td>图-4</td>
                                <td>6,6</td>
                                <td>不能读</td>
                                <td>红绿色盲</td>
                            </tr>
                            <tr>
                                <td>图-5</td>
                                <td>6</td>
                                <td>全不能读或部分不能读</td>
                                <td>绿色盲</td>
                            </tr>
                            <tr>
                                <td>图-6</td>
                                <td>9</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>图-7</td>
                                <td>8,0,6</td>
                                <td>不能读</td>
                                <td>红色盲</td>
                            </tr>
                            <tr>
                                <td>图-8</td>
                                <td>3</td>
                                <td>不能读</td>
                                <td>红色弱</td>
                            </tr>
                            <tr>
                                <td>图-9</td>
                                <td>5</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>图-10</td>
                                <td>6,8,9</td>
                                <td>不能读</td>
                                <td>绿色盲</td>
                            </tr>
                            <tr>
                                <td>图-11</td>
                                <td>金鱼</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>图-12</td>
                                <td>鸭、兔</td>
                                <td>鸭</td>
                                <td>红绿色觉异常</td>
                            </tr>
                            <tr>
                                <td>图-13</td>
                                <td>A</td>
                                <td>不能读</td>
                                <td>绿色盲</td>
                            </tr>
                            <tr>
                                <td>图-14</td>
                                <td>C</td>
                                <td>不能读</td>
                                <td>红色盲</td>
                            </tr>
                            </tbody>
                        </table>
                        <table class="blind-table table table-bordered" width="680" style="text-align:center;">
                            <tbody>
                            <tr>
                                <td colspan="4"><strong>色盲、色弱测试图片二</strong></td>
                            </tr>
                            <tr>
                                <td><img src="/static/img/blind/b1.gif" class="img-thumbnail"></td>
                                <td><img src="/static/img/blind/b2.gif" class="img-thumbnail"></td>
                            </tr>
                            <tr>
                                <td>1 6</td>
                                <td>2 9</td>
                            </tr>
                            <tr>
                                <td><img src="/static/img/blind/b3.gif" class="img-thumbnail"></td>
                                <td><img src="/static/img/blind/b4.gif" class="img-thumbnail"></td>
                            </tr>
                            <tr>
                                <td>正方形、三角形</td>
                                <td>8 1 2</td>
                            </tr>
                            <tr>
                                <td><img src="/static/img/blind/b5.gif" class="img-thumbnail"></td>
                                <td><img src="/static/img/blind/b6.gif" class="img-thumbnail"></td>
                            </tr>
                            <tr>
                                <td>8 9 9 0 2 2</td>
                                <td>6 2 8</td>
                            </tr>
                            <tr>
                                <td><img src="/static/img/blind/b7.gif" class="img-thumbnail"></td>
                                <td><img src="/static/img/blind/b8.gif" class="img-thumbnail"></td>
                            </tr>
                            <tr>
                                <td>圆</td>
                                <td>圆2</td>
                            </tr>
                            <tr>
                                <td><img src="/static/img/blind/b9.gif" class="img-thumbnail"></td>
                                <td><img src="/static/img/blind/b10.gif" class="img-thumbnail"></td>
                            </tr>
                            <tr>
                                <td>蝴蝶</td>
                                <td>蜻蜓</td>
                            </tr>
                            <tr>
                                <td><img src="/static/img/blind/b11.gif" class="img-thumbnail"></td>
                                <td><img src="/static/img/blind/b12.gif" class="img-thumbnail"></td>
                            </tr>
                            <tr>
                                <td>鸭子</td>
                                <td>狗</td>
                            </tr>
                            <tr>
                                <td><img src="/static/img/blind/b13.gif" class="img-thumbnail"></td>
                                <td><img src="/static/img/blind/b14.gif" class="img-thumbnail"></td>
                            </tr>
                            <tr>
                                <td>五角星</td>
                                <td>燕子</td>
                            </tr>
                            </tbody>
                        </table>
                        <table class="blind-table table table-bordered">
                            <tbody>
                            <tr>
                                <td colspan="4"><strong>色盲、色弱测试图片三</strong></td>
                            </tr>
                            <tr>
                                <td width="50%"><img src="/static/img/blind/a1.png" class="img-thumbnail"></td>
                                <td width="50%"><img src="/static/img/blind/a2.png" class="img-thumbnail"></td>
                            </tr>
                            <tr>
                                <td>每个人看都应该是12</td>
                                <td>正常色觉的人看到是45，色盲的人看不到任何数字</td>
                            </tr>
                            <tr>
                                <td><img src="/static/img/blind/a3.png" class="img-thumbnail"></td>
                                <td><img src="/static/img/blind/a4.png" class="img-thumbnail"></td>
                            </tr>
                            <tr>
                                <td>正常色觉的人实际上看不到任何数字，色盲的人很容易看出是5</td>
                                <td>常色觉的人看到是26，红色盲只能看到 6，绿色盲只能看到2，全色盲什么也看不到</td>
                            </tr>
                            <tr>
                                <td><img src="/static/img/blind/a5.png" class="img-thumbnail"></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>正常色觉的人看到是29，色盲的人看到是70</td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>
                    </article>
                </div>
                <div class="col-sm-8">
                </div>
            </div>
        </ui-article>
    </my-page>
</template>


<style lang="scss" scoped>
table {
    max-width: 800px;
}
</style>
