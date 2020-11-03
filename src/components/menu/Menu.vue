<template>
    <div>
        <el-menu
                :default-active="active"
                class="el-menu-vertical"
                background-color="transparent"
                text-color="#545c64"
                active-text-color="white"
                @select="handleSelect"
        >
            <el-menu-item index="1">
                <i class="el-icon-s-home"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="2">
                <i class="el-icon-s-custom"></i>
                <span slot="title">人员管理</span>
            </el-menu-item>
            <el-menu-item index="3">
                <i class="el-icon-place"></i>
                <span slot="title">床位管理</span>
            </el-menu-item>
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-food"></i>
                    <span>膳食管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="4-1" ><i class="el-icon-upload"></i>食谱上传</el-menu-item>
                    <el-menu-item index="4-2" ><i class="el-icon-download"></i>食谱下载</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="5">
                <i class="el-icon-position"></i>
                <span slot="title">外出管理</span>
            </el-menu-item>
            <el-menu-item index="6">
            <i class="el-icon-discount"></i>
            <span slot="title">护理管理</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return{
                active: "1"
            };
        },
        methods: {
            //点击菜单项触发
            handleSelect(key) {
                switch (key){
                    case '1': //首页
                        this.$router.push("/")
                        break;
                    case '2': //人员管理
                        this.$router.push("/")
                        break;
                    case '3': //床位管理
                        this.$router.push('/')
                        break;
                    case '4-1': //食谱上传
                        this.$router.push('/mealUpload')
                        break;
                    case '4-2': //食谱下载
                        this.$router.push('/mealDownload')
                        break;
                    case '5': //外出管理
                        this.$router.push("/")
                        break;
                    case '6': //护理管理
                        this.$router.push("/")
                        break;
                }
            }
        }
    }
</script>

<style scoped>
    .el-menu-vertical {
        min-height: 600px;
    }
</style>