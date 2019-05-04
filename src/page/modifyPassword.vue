<template>
    <div id='test' class="fillcontain">

        <el-form :model="formPassword" labelWidth="80px" label-position="left">
            <el-form-item label="用户名">
                <el-input type="text" v-model="formPassword.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="旧密码">
                <el-input type="password" v-model="formPassword.oldPassword" placeholder="请输入旧密码"></el-input>
            </el-form-item>
            <el-form-item v-if="visible" label="新密码">
                <el-input type="password" v-model="formPassword.newPassword" placeholder="请输入新密码">
                    <i slot="suffix" title="显示密码" @click="changePass('show')" style="cursor:pointer;"
                       class="el-input__icon iconfont icon-xianshi"></i>
                </el-input>
            </el-form-item>
            <el-form-item v-else label="新密码">
                <el-input type="text" v-model="formPassword.newPassword" placeholder="请输入新密码">
                    <i slot="suffix" title="隐藏密码" @click="changePass('hide')" style="cursor:pointer;"
                       class="el-input__icon iconfont icon-yincang"></i>
                </el-input>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import headTop from '../components/headTop'
    export default {
        data() {
            return {
                formPassword: {
                    username: '',
                    oldPassword: '',
                    newPassword: ''
                },
                visible: true
            }
        },
        methods: {
            changePass(value) {
                this.visible = !(value === 'show');
            }    //判断渲染，true:暗文显示，false:明文显示
        }
    }
</script>
