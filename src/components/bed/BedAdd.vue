<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="床位号" prop="id">
                <el-input style="width: 300px" v-model="ruleForm.id"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="bed_status">
                <el-select style="width: 300px" v-model="ruleForm.bed_status" placeholder="请选择床位状态">
                    <el-option label="空闲" value="空闲"></el-option>
                    <el-option label="占用" value="占用"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data(){
            return{
                ruleForm: {
                    id:'',
                    bed_status:''
                },
                rules:{
                    id:[
                        {required: true, message:'请输入床位号',trigger:'blur'}
                    ],
                    bed_status:[
                        {required: true, message:'请选择床位状态',trigger: 'change'}
                    ]
                },
            }
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let url="http://localhost:8081/bed/addBed"
                        axios.post(url,this.ruleForm).then()
                        this.$message.success('添加成功!')
                        console.log(formName)
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>

</style>