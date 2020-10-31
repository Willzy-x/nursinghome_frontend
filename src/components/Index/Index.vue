<template>
    <div id="index">
        <div class="logo">
            <img src="../../assets/logo.png" style="width: 8% ;height: 8%; "/>
        </div>
        <div class="content">
            <i class="el-icon-arrow-left"></i>
            <span>Neu颐养系统</span>
            <i class="el-icon-arrow-right"></i>
        </div>
        <div class="function">
            <el-button icon="el-icon-document" @click="intro()">简介</el-button>
            <el-button icon="el-icon-user-solid" @click="login()">登录</el-button>
        </div>
        <div class="copyright">
            <span>@ 2020 Harveyzhou</span>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return{

            }
        },
        methods:{
            login(){
                this.$router.push('/login')
            }
        }
    }
</script>

<style scoped>
    #index{
        background: url("../../assets/index.jpg");
        background-size: 100% 100%;
        height: 100%;
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
    }
    .logo{
        text-align: center;
        padding: 50px;
    }
    .content{
        font-size: 60px;
        color: white;
        font-weight: lighter;
        text-align: center;
        margin-top: 50px;
    }
    .el-icon-arrow-left{
        color: white;
        margin-right: 50px;
    }
    .el-icon-arrow-right{
        color: white;
        margin-left: 50px;
    }
    .function{
        text-align: center;
        margin-top: 120px;
    }
    .el-button{
        background-color: transparent;
        margin: 20px;
        font-weight: lighter;
        font-size: large;
        color: white;
        padding-right: 40px;
        padding-left: 40px;
        border-radius: 10px;
    }
    .copyright{
        position: absolute;
        bottom: 5px;
        left: 47%;
        color: white;
        font-size: small;
        font-weight: lighter;
    }
</style>