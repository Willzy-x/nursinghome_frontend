<template>
    <div class="con">
        <span class="title" >养老院颐养系统</span>
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        <span class="operate">{{user.username}}</span>
        <el-button type="info" icon="el-icon-switch-button" circle ></el-button>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        computed: {
            ...mapGetters([
                'user'
            ])
        }
    }
</script>

<style scoped>
    .operate{
        color: #fff;
        position: absolute;
        right: 200px;
        font-size: 0.8em;
        font-weight: bold;
    }
    .con .title{
        font-weight: bold;
        font-size: 1.5em;
        color: #fff;
    }
</style>