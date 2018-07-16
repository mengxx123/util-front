<template>
    <my-page title="车牌号码查询">
        <select v-model="province" name='ProvinceShort' style='font-family:Fixedsys;font-size:12px;'>
            <option value='皖'>皖</option>
            <option value='澳'>澳</option>				<option value='京'>京</option>				<option value='闽'>闽</option>				<option value='甘'>甘</option>				<option value='粤'>粤</option>				<option value='桂'>桂</option>				<option value='贵'>贵</option>				<option value='琼'>琼</option>				<option value='冀'>冀</option>				<option value='豫'>豫</option>				<option value='黑'>黑</option>				<option value='鄂'>鄂</option>				<option value='湘'>湘</option>				<option value='吉'>吉</option>				<option value='苏'>苏</option>				<option value='赣'>赣</option>				<option value='辽'>辽</option>				<option value='蒙'>蒙</option>				<option value='宁'>宁</option>				<option value='青'>青</option>				<option value='鲁'>鲁</option>				<option value='晋'>晋</option>				<option value='陕'>陕</option>				<option value='沪'>沪</option>				<option value='川'>川</option>				<option value='台'>台</option>				<option value='津'>津</option>				<option value='藏'>藏</option>				<option value='港'>港</option>				<option value='新'>新</option>				<option value='云'>云</option>				<option value='浙'>浙</option>				<option value='渝'>渝</option>
        </select>
        <select v-model="letter" name='CityABC' style='font-family:Fixedsys;font-size:12px;'>
                        <option value='A'>A</option>				<option value='B'>B</option>				<option value='C'>C</option>				<option value='D'>D</option>				<option value='E'>E</option>				<option value='F'>F</option>				<option value='G'>G</option>				<option value='H'>H</option>				<option value='I'>I</option>				<option value='J'>J</option>				<option value='K'>K</option>				<option value='L'>L</option>				<option value='M'>M</option>				<option value='N'>N</option>				<option value='O'>O</option>				<option value='P'>P</option>				<option value='Q'>Q</option>				<option value='R'>R</option>				<option value='S'>S</option>				<option value='T'>T</option>				<option value='U'>U</option>				<option value='V'>V</option>				<option value='W'>W</option>				<option value='X'>X</option>				<option value='Y'>Y</option>				<option value='Z'>Z</option>
        </select>
        <input v-model="number" placeholder="输入您要查询的车牌号码">
        <br>

        <!-- <ui-select-field v-model="version" label="版本">
            <ui-menu-item value="1" title="v1"/>
            <ui-menu-item value="2" title="v4"/>
        </ui-select-field>
        <br>
        <ui-text-field v-model.number="number" type="number" label="数量" hintText="1" />
        <div class="btns">
            <ui-raised-button class="btn" label="查询" primary @click="query" />
        </div> -->
        <div class="ui-loading" v-if="loading">
            <ui-circular-progress :size="24"/>
        </div>
        <div v-if="result">
            <div class="card">
                <span>{{ province }}</span>
                <span>{{ letter }}</span>
                <span class="dot"></span>
                <span>{{ number ? number : 'xxx' }}</span>
            </div>
            <div class="info">归属地：{{ full }} {{ result }}</div>
        </div>
        <div v-else>找不到</div>
    </my-page>
</template>


<script>
    /* eslint-disable */
    let data2 = `安徽
皖
澳门
澳
北京
京
福建
闽
甘肃
甘
广东
粤
广西
桂
贵州
贵
海南
琼
河北
冀
河南
豫
黑龙江
黑
湖北
鄂
湖南
湘
吉林
吉
江苏
苏
江西
赣
辽宁
辽
内蒙古
蒙
宁夏
宁
青海
青
山东
鲁
山西
晋
陕西
陕
上海
沪
四川
川
台湾
台
天津
津
西藏
藏
香港
港
新疆
新
云南
云
浙江
浙
重庆
渝`
    let data = `皖A　合肥
皖B　芜湖
皖C　蚌埠
皖D　淮南
皖E　马鞍山
皖F　淮北
皖G　铜陵
皖H　安庆
皖J　黄山
皖K　阜阳
皖L　宿州
皖M　滁州
皖N　六安
皖P　宣城
皖Q　巢湖
皖R　池州
皖S　亳州
澳A　澳门
京A　北京市(城区)
京B　出租车
京C　北京市(城区)
京E　北京市(城区)
京F　北京市(城区)
京G　北京市(远郊区)
闽A　福州
闽B　莆田
闽C　泉州
闽D　厦门
闽E　漳州
闽F　龙岩
闽G　三明
闽H　南平
闽J　宁德
闽K　省直机关
甘A　兰州
甘B　嘉峪关
甘C　金昌
甘D　白银
甘E　天水
甘F　酒泉
甘G　张掖
甘H　武威
甘J　定西
甘K　陇南
甘L　平凉
甘M　庆阳
甘N　临夏回族
甘P　甘南藏族
粤A　广州
粤B　深圳
粤C　珠海
粤D　汕头
粤E　佛山
粤F　韶关
粤G　湛江
粤H　肇庆
粤J　江门
粤K　茂名
粤L　惠州
粤M　梅州
粤N　汕尾
粤P　河源
粤Q　阳江
粤R　清远
粤S　东莞
粤T　中山
粤U　潮州
粤V　揭阳
粤W　云浮
粤X　顺德
粤Y　南海
粤Z　港澳进入内地车辆
桂A　南宁
桂B　柳州
桂C　桂林
桂D　梧州
桂E　北海
桂F　崇左
桂G　来宾
桂H　桂林
桂J　贺州
桂K　玉林
桂L　百色
桂M　河池
桂N　钦州
桂P　防城
桂R　贵港
贵A　贵阳
贵B　六盘水
贵C　遵义
贵D　铜仁
贵E　黔西南州
贵F　毕节
贵G　安顺
贵H　黔东南州
贵J　黔南州
琼A　海口
琼B　三亚
琼C　琼北
琼D　琼南
琼E　洋浦
冀A　石家庄
冀B　唐山
冀C　秦皇岛
冀D　邯郸
冀E　邢台
冀F　保定
冀G　张家口
冀H　承德
冀J　沧州
冀K　邯郸
冀L　邢台
冀N　保定
冀P　张家口
冀Q　承德
冀R　廊坊
冀S　沧州
冀T　衡水
豫A　郑州
豫B　开封
豫C　洛阳
豫D　平顶山
豫E　安阳
豫F　鹤壁
豫G　新乡
豫H　焦作
豫J　濮阳
豫K　许昌
豫L　漯河
豫M　三门峡
豫N　商丘
豫P　周口
豫Q　驻马店
豫R　南阳
豫S　信阳
豫U　济源
黑A　哈尔滨
黑B　齐齐哈尔
黑C　牡丹江
黑D　佳木斯
黑E　大庆
黑F　伊春
黑G　鸡西
黑H　鹤岗
黑J　双鸭山
黑K　七台河
黑L　松花江行署
黑M　绥化
黑N　黑河
黑P　大兴安岭
鄂A　武汉
鄂B　黄石
鄂C　十堰
鄂D　沙市
鄂E　宜昌
鄂F　襄樊
鄂G　鄂州
鄂H　荆门
鄂J　黄岗
鄂K　孝感
鄂L　咸宁
鄂M　荆州
鄂N　郧阳
鄂P　宜昌
鄂Q　鄂西州
鄂R　天门市
鄂S　随州市
湘A　长沙
湘B　株洲
湘C　湘潭
湘D　衡阳
湘E　邵阳
湘F　岳阳
湘G　大庸
湘H　益阳
湘J　常德
湘K　娄底
湘L　郴州
湘M　零陵
湘N　怀化
湘P　湘西州
吉A　长春
吉B　吉林
吉C　四平
吉D　辽源
吉E　通化
吉F　白山
吉G　白城
吉H　延边朝鲜族
吉J　松原市
苏A　南京
苏B　无锡
苏C　徐州
苏D　常州
苏E　苏州
苏F　南通
苏G　连云港
苏H　淮阴
苏J　盐城
苏K　扬州
苏L　镇江
苏M　泰州
苏N　宿迁
赣A　南昌
赣B　赣州
赣C　宜春
赣D　吉安
赣E　上饶
赣F　抚州
赣G　九江
赣H　景德镇
赣J　萍乡
赣K　新余
赣L　鹰潭
辽A　沈阳
辽B　大连
辽C　鞍山
辽D　抚顺
辽E　本溪
辽F　丹东
辽G　锦州
辽H　营口
辽J　阜新
辽K　辽阳
辽L　盘锦
辽M　铁岭
辽N　朝阳
辽P　葫芦岛
辽V　省直机关
蒙A　呼和浩特
蒙B　包头
蒙C　乌海
蒙D　赤峰
蒙E　呼伦贝尔盟
蒙F　兴安盟
蒙G　通辽
蒙H　锡林郭勒盟
蒙J　乌兰察布盟
蒙K　鄂尔多斯市
蒙L　巴彦淖尔盟
蒙M　阿拉善盟
宁A　银川
宁B　石嘴山
宁C　银南
宁D　固原
青A　西宁
青B　海东
青C　海北
青D　黄南
青E　海南州
青F　果洛州
青G　玉树州
青H　海西州
鲁A　济南
鲁B　青岛
鲁C　淄博
鲁D　枣庄
鲁E　东营
鲁F　烟台
鲁G　潍坊
鲁H　济宁
鲁J　泰安
鲁K　威海
鲁L　日照
鲁M　莱芜
鲁N　德州
鲁P　聊城
鲁Q　临沂
鲁R　荷泽
鲁S　莱芜市
鲁U　青岛开发区
鲁V　潍坊
晋A　太原
晋B　大同
晋C　阳泉
晋D　长治
晋E　晋城
晋F　朔州
晋G　雁北
晋H　忻州
晋J　吕梁
晋K　晋中
晋L　临汾
晋M　运城
陕A　西安
陕A　西安
陕B　铜川
陕B　铜川
陕C　宝鸡
陕C　宝鸡
陕D　威阳
陕D　威阳
陕E　渭南
陕E　渭南
陕F　汉中
陕F　汉中
陕G　安康
陕H　商洛
陕H　商洛
陕J　延安
陕J　延安
陕K　榆林
陕K　榆林
陕U　省直机关
陕U　省直机关
陕V　扬凌
沪A　上海市区
沪B　上海市区
沪C　远郊区
沪D　上海市区
川A　成都
川B　绵阳
川C　自贡
川D　攀枝花
川E　泸州
川F　德阳
川H　广元
川J　遂宁
川K　内江
川L　乐山
川M　资阳
川Q　宜宾
川R　南充
川S　达县
川T　雅安
川U　阿坝藏族
川V　甘孜藏族
川W　凉山彝族
川X　广安
川Y　巴中
川Z　眉山
台A　台北
台B　高雄
台C　台中
台D　台南
台E　基隆
台F　新竹
台G　嘉义
津A　天津市
津B　天津市
津C　天津市
津E　出租车
藏A　拉萨
藏B　昌都
藏C　山南
藏D　日喀则
藏E　那曲
藏F　阿里
藏G　林芝
港A　香港
新A　乌鲁木齐
新B　昌吉回族
新C　石河子
新D　奎屯
新E　博尔塔拉
新F　伊犁哈萨
新G　塔城
新H　阿勒泰
新J　克拉玛依
新K　吐鲁番
新L　哈密
新M　巴音郭愣
新N　阿克苏
新P　克孜勒苏柯
新Q　喀什
新R　和田
云A　昆明
云B　东川
云C　昭通
云D　曲靖
云E　楚雄彝族
云F　玉溪
云G　红河哈尼族
云H　文山壮族苗
云J　思茅
云K　西双版纳
云L　大理白族
云M　保山
云N　德宏傣族
云P　丽江
云Q　怒江傈族
云R　迪庆藏族
云S　临沧
浙A　杭州
浙B　宁波
浙C　温州
浙D　绍兴
浙E　湖州
浙F　嘉兴 
浙G　金华
浙H　衢州
浙J　台州
浙K　丽水
浙L　舟山
渝A　重庆市区（江南）
渝B　重庆市区（江北）
渝C　永川区
渝F　万州区
渝G　涪陵区
渝H　黔江区`

    export default {
        data () {
            return {
                loading: false,
                province: '皖',
                letter: 'A',
                number: '',
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
        computed: {
            full() {
                let arr = data2.split('\n')
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i] === this.province) {
                        return arr[i - 1]
                    }
                }
            }
        },
        mounted() {
            this.query()
        },
        methods: {
            query() {
                console.log(this.province + this.letter)
                let arr = data.split('\n')
                let found = false
                for (let item of arr) {
                    if (item.includes(this.province + this.letter)) {
                        console.log(item)
                        this.result = item.split('　')[1]
                        found = true
                        break
                    }
                }
                if (!found) {
                    this.result = null
                }
            }
        },
        watch: {
            province() {
                this.query()
            },
            letter() {
                this.query()
            }
        }
    }
</script>

<style lang="scss" scoped>
.btns {
    margin-top: 16px;
    margin-bottom: 16px;
}
.info {
    margin-bottom: 16px;
}
.card {
    display: inline-block;
    // min-width: 278px;
    height: 56px;
    padding: 0 16px;
    margin: 16px 0;
    color: #fff;
    background-color: rgb(34, 34, 255);
    border: 1px solid #ff5555;
    span {
        font-size: 32px;
        line-height: 56px;
    }
    .dot {
        position: relative;
        top: -8px;
        display: inline-block;
        width: 4px;
        height: 4px;
        margin: 0 16px 0 16px;
        background-color: #fff;
    }
}
</style>
