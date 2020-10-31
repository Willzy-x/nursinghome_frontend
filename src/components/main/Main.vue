<template>
    <div>
        <div id="bg-blur"></div>
        <div id="main">
            <el-container>
                <el-header><Header/></el-header>
                <el-container>
                    <el-aside width="200px"><Menu/></el-aside>
                    <el-main><router-view></router-view></el-main>
                </el-container>
            </el-container>
        </div>
    </div>
</template>

<script>
    import Menu from '../menu/Menu'
    import Header from "../header/Header";
    export default {
        components: {
            Menu,
            Header
        }
    }
</script>

<style scoped>
    #bg-blur{
        background: url("../../assets/index.jpg");
        background-size: 100% 100%;
        height: 100%;
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        filter: blur(10px);
        z-index: -1;
    }
    .el-container {
        height: 100vh;
        min-height: 600px;
    }

    .el-header {
        line-height: 75px;
        height: 75px !important;
    }
    .el-aside{
        width: 220px !important;
        height: 100%;
    }

    .el-main{
        padding: 10px !important;
    }
</style>