<template>
    <div id="login" align="center">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <i class="el-icon-user-solid"></i>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-radio v-model="ruleForm.radio" label="1">员工</el-radio>
                <el-radio v-model="ruleForm.radio" label="2">管理员</el-radio>
            </el-form-item>
            <el-form-item>
                <el-button @click="submitForm('ruleForm')" style="background-color: transparent; margin: 20px;font-weight: lighter;color: white;padding-right: 40px;padding-left: 40px;border-radius: 10px;">登录</el-button>
                <el-button @click="resetForm()" style="background-color: transparent; margin: 20px;font-weight: lighter;color: white;padding-right: 40px;padding-left: 40px;border-radius: 10px;">清空</el-button>
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
                    password: '',
                    //radio: '1'
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
            submitForm() {
                // if(this.ruleForm.radio.label==="1"){
                let url = 'http://localhost:8081/user/login'
                //提交到后台
                this.$ajax.post(url,{
                    "uid": null,
                    "uname": this.ruleForm.username,
                    "upassword": this.ruleForm.password
                }).then((res)=>{
                    console.log(res.data)
                    let result = res.data
                    if(result.state === 500){
                        this.$message.error('用户名或密码错误!');
                    }else{//登录成功
                        //把Token存入Vuex中
                        this.$store.dispatch('setToken', result.message)
                        //把user对象存入vuex中
                        this.$store.dispatch('setUser',result.object)
                        this.$message.success("欢迎进入Neu颐养系统")
                        this.$router.push('/main')
                        console.log(res)
                    }
                })
                // }
                // else{
                //     console.log("not now!")
                // }
            },
            resetForm(){
                this.ruleForm.username = ''
                this.ruleForm.password = ''
            }
        }
    }
</script>

<style scoped>
    #login{
        background: url("../../assets/index.jpg");
        background-size: 100% 100%;
        height: 100%;
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
    }
    .el-form{
        border-radius: 40px;
        margin-top: 100px;
        width: 30%;
        height: 60%;
        text-align: center;
        box-shadow: 0 0 10px white;
        padding: 50px;
    }
    .el-icon-user-solid{
        color: white;
        font-size: 50px;
    }
    .el-form-item{
        margin: 30px;
    }
    .el-radio{
        font-weight: lighter;
        margin: 20px;
        color: white;
    }
</style>