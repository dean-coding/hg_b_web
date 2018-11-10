<template>
    <div class="login-wrap">
        <div class="ms-title">hg运营后台</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="--请输入用户名--"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="--请输入密码--" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <el-form-item prop="isAutoLogin">
                    <label>下次自动登录</label>
                    <el-switch on-text="" off-text="" v-model="ruleForm.isAutoLogin"></el-switch>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" :loading="isLoading" @click="submitForm('ruleForm')">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>

export default {
    data: function () {
        return {
            isLoading:false,
            ruleForm: {
                username: '@DeanKano',
                password: '@DeanKano',
                isAutoLogin: false
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 4, max: 16, message: '[用户名]请保持在[4]到[16]个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 4, max: 16, message: '[密码]请保持在[4]到[16]个字符', trigger: 'blur' }
                ]
            }
        }
    },
    mounted() {
        if(this.$store.state.user.login) {
            this.$router.push('/readme');
        }
        // this.$store.commit(types.TITLE, 'Login');
    },
    methods: {
        submitForm(formName) {
            this.isLoading = true;
            var querystring = require('querystring');
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('点击登录')
                    console.log(this.$store.state.user.login)
                    if (!this.$store.state.user.login) {
                        this.$store.dispatch('doLogin',
                        {
                            "id":"2c948082619333da0161933438ff0001",
                            "username":"@DeanKano",
                            "name":"@DeanKano"
                        })
                        this.$router.push('/readme');
                        this.$message.success('欢迎登录mygirl系统');
                        this.isLoading = false;
                    }
                } else {
                    console.log('error submit!!');
                    this.isLoading = false;
                    return false;
                }
            });
        }
    }
}
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background: url('../../static/img/bg.jpg') no-repeat
}

.ms-title {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-family: serif;
    font-size: 40px;
    font-style: italic;
    color: #fff;
}

.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 200px;
    margin: -150px 0 0 -190px;
    padding: 40px;
    border-radius: 5px;
    background: #fff;
}

.login-btn {
    text-align: center;
}

.login-btn button {
    width: 100%;
    height: 36px;
}
</style>