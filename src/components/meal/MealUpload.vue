<template>
    <div id="meal" align="center">
        <el-upload
                class="upload"
                drag
                action="http://localhost:8081/file/upload"
                :on-success="uploadSuccess"
                :limit="1"
                multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">请一次上传一天的食谱</div>
        </el-upload>
    </div>
</template>

<script>
    export default {
        data(){
            return{
            }
        },
        methods: {
            uploadSuccess(){
                this.$message.success("上传成功")
            }
            // commitUpload(){
            //     this.$confirm('确定上传文件?', '上传确认', {
            //         confirmButtonText: '确定',
            //         cancelButtonText: '取消',
            //         type: 'info'
            //     })
            // }
        }
    }
</script>

<style scoped>
    .upload{
        margin-top: 100px;
    }
</style>