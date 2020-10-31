<template>
    <div class="head">
        <span class="title" >Neu颐养系统</span>
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" ></el-avatar>
        <span class="user">{{user.uname}}</span>
        <el-button type="info" icon="el-icon-switch-button" circle @click="logout"></el-button>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        computed: {
            ...mapGetters([
                'user'
            ])
        },
        created() {
            JSON.stringify(this.user)
        },
        methods: {
            //注销
            logout(){
                this.$store.dispatch('setUser',{})
                this.$store.dispatch('setToken','')
                localStorage.removeItem('Authorization')
                this.$message.success("注销成功")
                this.$router.push("/")
            }
        }
    }
</script>

<style scoped>
    .el-avatar--circle {
        border-radius: 50%;
        /* display: inline-block; */
        position: absolute;
        right: 200px;
        top: 30px;
    }
    .el-button{
        position: absolute;
        right: 80px;
        top: 30px;
    }
    .user{
        color: white;
        position: absolute;
        right: 150px;
        top: 15px;
        font-size: medium;
        font-weight: lighter;
    }
    .head{
        font-weight: lighter;
        font-size: 1.5em;
    }
    .title{
        font-weight: lighter;
        font-size: 1.5em;
        color: #fff;
    }
</style>