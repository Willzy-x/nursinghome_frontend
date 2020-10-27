<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                <el-button @click="resetForm('ruleForm')">清空</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ],
                }

            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) { //验证成功
                        let url = 'http://localhost:8081/user/login'
                        //提交到后台
                        this.$ajax.post(url,this.form).then((res)=>{
                            console.log(res.data)
                            let result = res.data
                            if(result.state === 500){
                                this.$message.error('用户名或密码错误!');
                            }else{//登录成功
                                //把Token存入Vuex中
                                this.$store.dispatch('setToken', result.message)
                            }
                        })
                    }
                });
            },
        },
        resetForm(){

        }
    }
</script>

<style scoped>

</style>