<template>
    <div id="MealDownload" align="center">
        <span class="title">食谱查看</span>
        <table>
            <tr>
                <th>文件名</th>
                <th>上传时间</th>
                <th>操作</th>
            </tr>
            <tr v-for="item in fileList" :key="item.name">
                <td>{{item.name}}</td>
                <td>{{item.createTime}}</td>
                <td>
                    <el-button class="downloadBtn" @click="download(item.name)">下载</el-button>
                </td>
            </tr>
        </table>
        <!--        <el-table-->
        <!--                v-loading="loading"-->
        <!--                :data="fileList"-->
        <!--                border-->
        <!--                style="width: 100%; background-color: transparent">-->
        <!--            <el-table-column-->
        <!--                    fixed-->
        <!--                    prop="createTime"-->
        <!--                    label="日期"-->
        <!--                    width="150">-->
        <!--            </el-table-column>-->
        <!--            <el-table-column-->
        <!--                    prop="name"-->
        <!--                    label="文件名"-->
        <!--                    width="120">-->
        <!--            </el-table-column>-->
        <!--            <el-table-column-->
        <!--                    fixed="right"-->
        <!--                    label="操作"-->
        <!--                    width="100">-->
        <!--                <template slot-scope="scope">-->
        <!--                    <el-button @click="downLoad(scope.row.name)" type="text" size="small">下载</el-button>-->
        <!--                    <el-button @click="deleteFile()" type="text" size="small">编辑</el-button>-->
        <!--                </template>-->
        <!--            </el-table-column>-->
        <!--        </el-table>-->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                fileList: []
            }
        },
        created() {
            this.listFile();
        },
        watch: {
            $route() {
                this.listFile();
            }
        },
        methods: {
            //获取文件
            listFile() {
                let that = this;
                // eslint-disable-next-line no-undef
                $.post('http://localhost:8081/file/listFile', {}, function (obj) {
                    that.fileList = obj;
                    console.log(that.fileList)
                }, 'json');
            },
            //下载
            download(name) {
                let a = document.createElement('a')
                a.href = `http://localhost:8081/file/getFile?name=${name}`;
                this.$message.success("创建下载")
                a.click()
            }
        }
    }
</script>

<style scoped>
    .title {
        position: absolute;
        left: 250px;
        top: 80px;
        color: white;
        margin: 10px;
        font-size: x-large;
        font-weight: lighter;
    }

    table {
        margin: 40px;
        align-content: center;
    }

    tr {
        color: white;
        font-size: large;
        font-weight: lighter;
    }

    th {
        font-weight: lighter;
        width: 300px;
        padding: 20px;
    }

    td {
        color: white;
        font-weight: lighter;
        font-size: large;
        padding: 20px;
        text-align: center;
    }

    .downloadBtn {
        color: white;
        background-color: transparent;
    }

</style>