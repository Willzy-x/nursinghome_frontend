<template>
    <div id="meal" align="center">
        <h1 class="title">下载区</h1>
        <div>
            <table class="table-bordered table">
                <tr>
                    <th>文件名</th>
                    <th>上传时间</th>
                    <th @click="listFile()">点击下载</th>
                </tr>
                <tr v-for="item in fileList" :key="item.name">
                    <td>{{item.name}}</td>
                    <td>{{item.createTime}}</td>
                    <td><input type="button" class='btn' @click="downLoad(item.name)" value="下载"/></td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                fileList: []
            }
        },
        created() {
            this.listFile();
        },
        methods: {
            listFile(){
                let that = this;
                this.$ajax.post('http://localhost:8081/api/file/listFile',{}).then((res)=>{
                    that.fileList = res.data
                })
            },
            downLoad(name){
                let a = document.createElement('a')
                a.href ="http://localhost:8081/api/file/getFile/"+name;
                a.click()
            }
        }
    }
</script>

<style scoped>

</style>