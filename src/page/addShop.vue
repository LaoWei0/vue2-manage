<template>
    <div>
        <head-top></head-top>

        <el-row style="margin-top: 20px;">
            <el-col :span="12" :offset="4">
                <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
                    <el-form-item label="用户名" prop="username">
                        <el-input type="text" v-model="formData.username"></el-input>
                    </el-form-item>

                    <!--<el-form-item label="联系电话" prop="phone">-->
                    <!--<el-input v-model.number="formData.phone" maxLength="11"></el-input>-->
                    <!--</el-form-item>-->
                    <el-form-item label="旧密码" prop="oldPassword">
                        <el-input type="password" v-model="formData.oldPassword"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPassword">
                        <el-input type="password" v-model="formData.newPassword"></el-input>
                    </el-form-item>


                    <!--<el-form-item label="上传店铺头像">-->
                    <!--<el-upload-->
                    <!--class="avatar-uploader"-->
                    <!--:action="baseUrl + '/v1/addimg/shop'"-->
                    <!--:show-file-list="false"-->
                    <!--:on-success="handleShopAvatarScucess"-->
                    <!--:before-upload="beforeAvatarUpload">-->
                    <!--<img v-if="formData.image_path" :src="baseImgPath + formData.image_path" class="avatar">-->
                    <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                    <!--</el-upload>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="上传营业执照">-->
                    <!--<el-upload-->
                    <!--class="avatar-uploader"-->
                    <!--:action="baseUrl + '/v1/addimg/shop'"-->
                    <!--:show-file-list="false"-->
                    <!--:on-success="handleBusinessAvatarScucess"-->
                    <!--:before-upload="beforeAvatarUpload">-->
                    <!--<img v-if="formData.business_license_image" :src="baseImgPath + formData.business_license_image" class="avatar">-->
                    <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                    <!--</el-upload>-->
                    <!--</el-form-item>-->
                    <el-form-item class="button_submit">
                        <el-button type="primary" @click="submitForm('formData')">确认修改</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    import headTop from '@/components/headTop'
    import {cityGuess, addShop, searchplace, foodCategory} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {apiupdatePassword} from '@/config/api'
    import store from '../store/index'
    import router from '../router/index'
    import {Toast} from 'vant';

    export default {
        data() {
            return {
                city: {},
                formData: {
                    username:'',
                    oldPassword:'',
                    newPassword:'',
                    name: '', //店铺名称
                    address: '', //地址
                    latitude: '',
                    longitude: '',
                    description: '', //介绍
                    phone: '',
                    promotion_info: '',
                    float_delivery_fee: 5, //运费
                    float_minimum_order_amount: 20, //起价
                    is_premium: true,
                    delivery_mode: true,
                    new: true,
                    bao: true,
                    zhun: true,
                    piao: true,
                    startTime: '',
                    endTime: '',
                    image_path: '',
                    business_license_image: '',
                    catering_service_license_image: '',

                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    oldPassword: [
                        {required: true, message: '请输入旧密码', trigger: 'blur'},
                    ],
                    newPassword: [
                        {required: true, message: '请输入新密码', trigger: 'blur'},
                    ],

                },

                baseUrl,
                baseImgPath,
                categoryOptions: [],
                selectedCategory: ['快餐便当', '简餐']
            }
        },
        components: {
            headTop,
        },
        mounted() {
            this.initData();
        },
        methods: {
            async initData() {

            },
            async querySearchAsync(queryString, cb) {

            },
            addressSelect(address) {

            },
            handleShopAvatarScucess(res, file) {

            },
            handleBusinessAvatarScucess(res, file) {

            },
            handleServiceAvatarScucess(res, file) {

            },
            beforeAvatarUpload(file) {

            },
            tableRowClassName(row, index) {
                if (index === 1) {
                    return 'info-row';
                } else if (index === 3) {
                    return 'positive-row';
                }
                return '';
            },
            selectActivity() {
            },
            handleDelete(index) {
                this.activities.splice(index, 1)
            },
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {

                        const res = await apiupdatePassword({
                            username: this.formData.username,
                            oldPassword: this.formData.oldPassword,
                            newPassword: this.formData.newPassword,
                        });
                        if (res.code == '200'){
                            Toast({
                                message: res.msg,
                                duration: 1000,
                                forbidClick: true
                            });
                            // 清除token
                            localStorage.removeItem('token');
                            store.commit('loginSuccess', null);
                            // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                            setTimeout(() => {
                                router.replace({
                                    path: '/',
                                    // query: {
                                    //     redirect: router.currentRoute.fullPath
                                    // }
                                });
                            }, 500);
                        }else {
                            this.$message({
                                type: 'error',
                                message: res.msg,
                            });
                        }
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: '请检查输入是否正确',
                            offset: 100
                        });
                        return false;
                    }
                });
            },
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .button_submit {
        text-align: center;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
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

    .el-table .info-row {
        background: #c9e5f5;
    }

    .el-table .positive-row {
        background: #e2f0e4;
    }
</style>
