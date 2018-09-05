<template>
    <div class="home-content">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-date"></i>个人中心</el-breadcrumb-item>
                <el-breadcrumb-item>用户设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form ref="userForm" :rules="rules" :model="userForm" label-width="80px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userForm.username"></el-input>
                </el-form-item>

                <el-form-item label="头像" prop="logoRes">
                    <img class="pre-img" :src="userForm.logoRes == null ? null : baseResDownUrl+userForm.logoRes" alt="">
                    <vue-core-image-upload 
                        :class="['el-icon-plus', 'btn-primary']" 
                        :crop="true" 
                        @imageuploaded="imageuploaded" 
                        :cropBtn="{ok:'确定上传','cancel':'取消'}" 
                        :maxFileSize="5242880" 
                        text="选择图片" 
                        :url="baseResUpUrl" 
                        extensions="png,gif,jpeg,jpg">
                    </vue-core-image-upload>
                </el-form-item>

                <el-form-item label="性别" prop="genter">
                    <el-col :span="11">
                        <el-radio-group v-model="userForm.genter">
                            <el-radio label="帅男"></el-radio>
                            <el-radio label="靓女"></el-radio>
                        </el-radio-group>
                    </el-col>
                    <el-col :span="11">
                        <label>婚姻状况</label>
                        <el-switch on-text="" off-text="" v-model="userForm.isDelivery"></el-switch>
                    </el-col>
                </el-form-item>

                <el-form-item label="所属团队" prop="belongTeam">
                    <el-select v-model="userForm.belongTeam" placeholder="请选择团队">
                        <el-option label="青瓦台" value="qwt"></el-option>
                        <el-option label="神盾局" value="sdj"></el-option>
                        <el-option label="FBI" value="fbi"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="日期时间">
                    <el-col :span="11">
                        <el-form-item prop="joinDate">
                            <el-date-picker type="date" placeholder="选择日期" v-model="userForm.joinDate" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-form-item prop="date2">
                            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="userForm.date2" style="width: 100%;"></el-time-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>

                <el-form-item label="个人标签" prop="labels">
                    <el-checkbox-group v-model="userForm.labels">
                        <el-checkbox label="运动" name="labels"></el-checkbox>
                        <el-checkbox label="K歌" name="labels"></el-checkbox>
                        <el-checkbox label="影视" name="labels"></el-checkbox>
                        <el-checkbox label="段子" name="labels"></el-checkbox>
                        <el-checkbox label="家宅" name="labels"></el-checkbox>
                        <el-checkbox label="小说" name="labels"></el-checkbox>
                        <el-checkbox label="野外" name="labels"></el-checkbox>
                        <el-checkbox label="社交" name="labels"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="备注信息">
                    <el-input type="textarea" v-model="userForm.remark"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('userForm')">提交</el-button>
                    <el-button @click="cancelSubmit">取消</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
import VueCoreImageUpload from 'vue-core-image-upload';

export default {
    data: function() {
        return {
            baseResDownUrl: '/api',
            baseResUpUrl: '/files/upload',
            userForm: {
                id: null,
                username: 'admin',
                logoRes: null,
                belongTeam: '',
                joinDate: '',
                date2: '',
                isDelivery: false,
                labels: ['段子'],
                genter: '帅男',
                remark: ''
            },
            rules: {
                username: [
                    { required: true, message: '[用户名]不能为空', trigger: 'blur' },
                    { min: 4, max: 12, message: '[用户名]保持在[4]到[12]个字符', trigger: 'blur' }
                ],
                belongTeam: [
                    { required: true, message: '[所属团队]不能为空', trigger: 'change' }
                ],
                joinDate: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
                type: [
                    { type: 'array', required: true, message: '请至少选择一个[个人标签]', trigger: 'change' }
                ],
                genter: [
                    { required: true, message: '性别不能为空', trigger: 'change' }
                ]
            }
        }
    },
    components: {
        VueCoreImageUpload
    },
    methods: {
        cancelSubmit() {
            this.$router.push('/readme');
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log("进入校验");
                    const idToken = this.userForm.id;
                    let formData = this.userForm; // 这里才是你的表单数据
                           this.$notify({
                                title: '成功',
                                message: '操作成功！',
                                type: 'success'
                            });
                           this.$router.push('/readme');
                } else {
                    return false;
                }
            });
        },
        imageuploaded(res) {
            console.log('上传文件：',res)
            this.userForm.logoRes = res[0]
        }
    }
}
</script>
<style scoped>
.content-title {
    font-weight: 400;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
}

.pre-img {
    background-color: #fbfdff;
    border: 1px solid #336666;
    border-radius: 6px;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    cursor: pointer;
    line-height: 146px;
    vertical-align: top;
}
</style>