<template>
    <div>
        <el-header><Header/></el-header>
        <el-container>
            <el-aside width="200px"><Menu/></el-aside>
            <el-main><router-view></router-view></el-main>
        </el-container>
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

</style>