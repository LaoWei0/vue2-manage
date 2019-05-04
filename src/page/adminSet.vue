<template>
    <div class="fillcontain">
        <head-top></head-top>
        <header class="admin_title">超限详细信息</header>
        <div class="admin_set">
            <ul>
                <li>
                    <span>货物名称：</span><span>{{adminInfo.goodsName}}</span>

                </li>

                <li><span>件数：</span><span>{{adminInfo.goodsNum}}</span></li>
                <li><span>单件重量：</span><span>{{adminInfo.weightPer}}</span></li>
                <li><span>发货单位：</span><span>{{adminInfo.startCompany}}</span></li>
                <li><span>发站：</span><span>{{adminInfo.startStation}}</span></li>
                <li><span>军运号：</span><span>{{adminInfo.transportNum}}</span></li>
                <li><span>超限等级：</span><span>{{adminInfo.ultralimitType}}</span></li>
                <li><span>轴距：</span><span>{{adminInfo.axleDistance}}</span></li>
                <li><span>固定轴距：</span><span>{{adminInfo.fixedWheelbase}}</span></li>
                <li> <span>轴数：</span><span>{{adminInfo.axleNumber}}</span></li>
                <li><span>转向架中心销距离：</span><span>{{adminInfo.bogieDistance}}</span></li>
                <li><span>车型：</span><span>{{adminInfo.carType}}</span></li>
                <li><span>货物长度：</span><span>{{adminInfo.goodsLength}}</span></li>
                <li><span>重心高：</span><span>{{adminInfo.gravityHeight}}</span></li>
                <li><span>支重面长度：</span><span>{{adminInfo.supportLength}}</span></li>
                <li><span>中心高：</span><span>{{adminInfo.centerHeight}}</span></li>
                <li><span>中心宽：</span><span>{{adminInfo.centerWidth}}</span></li>
                <li> <span>一侧高：</span><span>{{adminInfo.oneHeight}}</span></li>
                <li><span>一侧宽：</span><span>{{adminInfo.oneWidth}}</span></li>
                <li><span>二侧高：</span><span>{{adminInfo.twoHeight}}</span></li>
                <li><span>二侧宽：</span><span>{{adminInfo.twoWidth}}</span></li>
                <li><span>三侧高：</span><span>{{adminInfo.threeHeight}}</span></li>
                <li><span>三侧宽：</span><span>{{adminInfo.threeWidth}}</span></li>
                <li><span>四侧高：</span><span>{{adminInfo.fourHeight}}</span></li>
                <li><span>四侧宽：</span><span>{{adminInfo.fourWidth}}</span></li>
                <li><span>计算宽度X内值：</span><span>{{adminInfo.xinWidth}}</span></li>
                <li><span>计算宽度X外值：</span><span>{{adminInfo.xoutWith}}</span></li>
                <li><span>重车重心高：</span>   <span>{{adminInfo.zhongHeight}}</span></li>
                <li></li>
                <!--<li>-->
                    <!--<span>更换头像：</span>-->
                    <!--<el-upload-->
                      <!--class="avatar-uploader"-->
                      <!--:action="baseUrl + '/admin/update/avatar/' + adminInfo.id"-->
                      <!--:show-file-list="false"-->
                      <!--:on-success="uploadImg"-->
                      <!--:before-upload="beforeImgUpload">-->
                      <!--<img v-if="adminInfo.avatar" :src="baseImgPath + adminInfo.avatar" class="avatar">-->
                      <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                    <!--</el-upload>-->
                <!--</li>-->
            </ul>
        </div>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
    import {mapState} from 'vuex'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {apiqueryTraceDetail} from '@/config/api';

    export default {
        data(){
            return {
                baseUrl,
                baseImgPath,
                andId: 1,
                adminInfo: [],
            }
        },
    	components: {
    		headTop,
    	},
        computed: {
            // ...mapState(['adminInfo']),
        },
        created(){
            this.andId = this.$route.query.andId;
            this.initData();
        },
        methods: {
            async initData(){
                try{
                    const countData = await apiqueryTraceDetail({andId: this.andId});
                    if (countData.code == 200) {
                        // alert("查数量");
                        this.adminInfo = countData.data;
                    }else{
                        throw new Error('获取数据失败');
                    }
                }catch(err){
                    // console.log('获取数据失败', err);
                }
            },

        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.explain_text{
		margin-top: 20px;
		text-align: center;
		font-size: 20px;
		color: #333;
	}
    .admin_set{
        width: 60%;
        background-color: #F9FAFC;
        min-height: 400px;
        margin: 20px auto 0;
        border-radius: 10px;
        ul > li{
            /*style="float:left;width: 49%; text-align: center";*/
            float: left;
            width: 80%;
            text-align: center;
            padding: 6px;
            span{
                padding: 1px;
                float: left;
                width: 40%;
                text-align: center;
                color: #666;
            }
        }
    }
    .admin_title{
        margin-top: 20px;
        .sc(24px, #666);
        text-align: center;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        margin-top: 10px;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
</style>
