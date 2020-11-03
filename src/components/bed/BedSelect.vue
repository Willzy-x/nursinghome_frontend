<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="床位号" prop="id">
                <el-input style="width: 300px" v-model="ruleForm.id"></el-input>
                <el-button style="margin-left:10px" type="primary" @click="submitForm('ruleForm')">按床位搜索</el-button>
            </el-form-item>
            <el-form-item label="状态" prop="bed_status">
                <el-select style="width: 300px" v-model="ruleForm.bed_status" placeholder="请选择床位状态">
                    <el-option label="空闲" value="空闲"></el-option>
                    <el-option label="占用" value="占用"></el-option>
                </el-select>
                <el-button style="margin-left:10px" type="success" @click="submitStatus('ruleForm')">按状态搜索</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>

        <el-table
                v-loading="loading"
                :data="bedList"
                border
                style="margin-top:10px;width: 100%">
            <el-table-column
                    fixed
                    prop="id"
                    label="床位号"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="bed_status"
                    label="床位状态"
                    width="500">
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="200">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="success"
                            @click="handleEdit(scope.row.id)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
            <el-table-column
                    label="床位状态"
                    width="180">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.bed_status"
                            active-text="占用"
                            inactive-text="空闲"
                            active-color="#ff4949"
                            inactive-color="#409eff"
                            active-value="占用"
                            inactive-value="空闲">
                    </el-switch>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="修改床位状态" width="20%" :visible.sync="dialogFormVisible">
            <el-form><!--//确实，在表单中有个v-model绑定后，el-form的model有没有一点都不影响，你可以删除不写-->
                <el-form-item label="床位号" :label-width="formLabelWidth">
                    <span >{{currId}}</span>
                </el-form-item>
                <el-form-item label="状态" style="margin-left: 30px" prop="bed_status">
                    <el-select style="width: 150px" v-model="newbed_status" placeholder="请选择床位状态">
                        <el-option label="空闲" value="空闲"></el-option>
                        <el-option label="占用" value="占用"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateBed(newbed_status)">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data(){
            return{
                bedList:[],
                ruleForm: {
                    id:'',
                    bed_status:''
                },
                rules:{
                },
                loading:false,
                currId:0,
                currPage:1,
                dialogFormVisible: false,
                newbed_status:'',
                bedEdit: {
                    id:'',
                    bed_status:''
                },
                formLabelWidth: '120px',
                selectFlag: 0
            }
        },
/*        created(){
            //重新获取数据
            let url=`http://localhost:8081/bed/selectAllBed`
            //从后台获取数据
            axios.get(url).then((res)=>{
                    console.log(res.data)
                    this.pageInfo.list=res.data})
            console.log(this.pageInfo.list)
        },*/
        methods:{
            submitStatus(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let url=`http://localhost:8081/bed/selectBedByStatus/${this.ruleForm.bed_status}`
                        axios.get(url).then((res)=>{
                            console.log(res.data)
                            this.bedList=res.data
                            console.log(this.bedList)
                        })
                        console.log(this.ruleForm)
                        this.$message.success("查询成功")
                        this.selectFlag=1
                    }
                });
            },
            handleEdit(id) {
                this.currId=id,
                this.dialogFormVisible=true
            },
            handleDelete(id){
                let url=`http://localhost:8081/bed/delBed/${id}`
                axios.get(url).then()
                //this.getData()
                //this.getData()
                if(this.selectFlag===0){
                    this.refreshById('ruleForm')
                    this.refreshById('ruleForm')
                }
                else if(this.selectFlag===1){
                    this.refreshByStatus('ruleForm')
                    this.refreshByStatus('ruleForm')
                }
                console.log(id)
            },
            updateBed(bed_status){
                console.log(bed_status)
                /*let url=`http://localhost:8081/bed/update`
                axios.post(url,bedEdit).then()
                this.$message.success('修改成功!');*/
                this.bedEdit.id=this.currId
                this.bedEdit.bed_status=bed_status
                let newbedEdit=this.bedEdit
                let url=`http://localhost:8081/bed/update`
                axios.post(url,newbedEdit).then()
                this.getData()
                this.$message.info('修改成功!');
                this.dialogFormVisible=false
                if(this.selectFlag===0){
                    this.refreshById('ruleForm')
                    //this.refreshById('ruleForm')
                }
                else if(this.selectFlag===1){
                    this.refreshByStatus('ruleForm')
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(formName)
                        let url=`http://localhost:8081/bed/selectBedById/${this.ruleForm.id}`
                        axios.get(url).then((res)=>{
                            console.log(res.data)
                            this.bedList=res.data
                            console.log(this.bedList)
                        })
                        console.log(this.ruleForm)
                        this.$message.success("查询成功")
                        this.selectFlag=0
                        //this.resetForm(formName)
                    }
                });
            },
            refreshById(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(formName)
                        let url=`http://localhost:8081/bed/selectBedById/${this.ruleForm.id}`
                        axios.get(url).then((res)=>{
                            console.log(res.data)
                            this.bedList=res.data
                            console.log(this.bedList)
                        })
                        console.log(this.ruleForm)
                        //this.$message.success("查询成功")
                        //this.resetForm(formName)
                    }
                });
            },
            refreshByStatus(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(formName)
                        let url=`http://localhost:8081/bed/selectBedByStatus/${this.ruleForm.bed_status}`
                        axios.get(url).then((res)=>{
                            console.log(res.data)
                            this.bedList=res.data
                            console.log(this.bedList)
                        })
                        console.log(this.ruleForm)
                        //this.$message.success("查询成功")
                        //this.resetForm(formName)
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                console.log(this.pageInfo.list)
            },
            getData(){
                this.loading=true
                //重新获取数据
                let url=`http://localhost:8081/bed/query/${this.currPage}`
                //从后台获取数据
                axios.get(url).then(/*(res)=>{
                    console.log(res.data)
                    //this.pageInfo=res.data
                    this.loading=false
                }*/this.loading=false)
            }

        }
    }
</script>

<style scoped>

</style>





<!--<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="床位号" prop="id">
                <el-input style="width: 300px" v-model="ruleForm.id"></el-input>
                <el-button type="primary" @click="submitForm('ruleForm')">按床位搜索</el-button>
            </el-form-item>
            <el-form-item label="状态" prop="bed_status">
                <el-select style="width: 300px" v-model="ruleForm.bed_status" placeholder="请选择床位状态">
                    <el-option label="空闲" value="0"></el-option>
                    <el-option label="占用" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>

        <el-table
                v-loading="loading"
                :data="bedList.list"
                border
                style="margin-top:10px;width: 100%">
            <el-table-column
                    fixed
                    prop="id"
                    label="床位号"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="bed_status"
                    label="床位状态"
                    width="500">
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="200">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="success"
                            @click="handleEdit(scope.row.id)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
            <el-table-column
                    label="床位状态"
                    width="180">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.bed_status"
                            active-text="占用"
                            inactive-text="空闲"
                            active-color="#409eff"
                            inactive-color="#ff4949"
                            active-value="1"
                            inactive-value="0">
                    </el-switch>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data(){
            return{
                bedList:{
                    list:[]
                },
                ruleForm: {
                    id:'',
                    bed_status:''
                },
                rules:{
                },
                loading:false,
            }
        },
        /*        created(){
                    //重新获取数据
                    let url=`http://localhost:8081/bed/selectAllBed`
                    //从后台获取数据
                    axios.get(url).then((res)=>{
                            console.log(res.data)
                            this.pageInfo.list=res.data})
                    console.log(this.pageInfo.list)
                },*/
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(formName)
                        let url=`http://localhost:8081/bed/selectBedById/${this.ruleForm.id}`
                        axios.get(url).then((res)=>{
                            console.log(res.data)
                            this.bedList.list=res.data
                            //直接赋给bedList是不对的，因为你bedList根本在return里就没有定义list
                            // 只能先把res.data整个装给bedList,然后bedlist才有List属性
                            // 但这样还是错,因为你这里的bedList是一个类容器，但是res.data你看控制台输出，是一个数组或者是对象数组
                            // 那么res.data作为装到容器里的东西，和bedList这个容器不匹配，所以bedList必须先定义一个数组属性list:[]用来存res.data
                            //console.log(this.bedList)
                        })
                        //console.log(this.ruleForm)
                        this.$message.success("查询成功")
                        //this.resetForm(formName)
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                console.log(this.pageInfo.list)
            },

        }
    }
</script>

<style scoped>

</style>-->

















<!--<template>
    <div id="bedtable">
&lt;!&ndash;
        <div v-for="item in bed" v-bind:key="item.id">{{item}}</div>
&ndash;&gt;
        <el-table
            :data="pageInfo.list"
            border
            style="width: 100%">
            <el-table-column
                prop="id"
                label="床位号"
                width="180">
            </el-table-column>
            <el-table-column
                    prop="bed_status"
                    label="状态"
                    width="180">
            </el-table-column>
        </el-table>

        <el-pagination
                background
                layout="prev, pager, next"
                :total="1000">
        </el-pagination>
    </div>

</template>-->

<!--<template>
    <div>
        <el-table
                :data="bedList"
                border
                style="margin-top:10px;width: 100%">
            <el-table-column
                    fixed
                    prop="id"
                    label="床位号"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="bed_status"
                    label="床位状态"
                    width="500">
            </el-table-column>
        </el-table>
    </div>

</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                bedList:[]
            }
        },
        created(){
            let url=`http://localhost:8081/bed/selectAllBed`
            //从后台获取数据
            axios.get(url).then((res)=>{
                //Vue.set(this.pageInfo,this.pageInfo.list,res.data)
                this.bedList=res.data
                console.log(this.bedList)
            })
        },
        methods: {
        }
    }
</script>



&lt;!&ndash;<script>
    import axios from 'axios'
    export default {
        data(){
            return{
                bed:{
                    id:1,
                    bed_status:1
                }
/*                currPage:1,//当前页
/!*                form:{//查询条件
                    id:''
                },*!/
                pageInfo:{//后台查询到的数据

                }*/

            }
        },
        //页面加载之前就要取到数据
        //钩子函数
       /* created(){
            let url=`http://loaclhost:8081/bed/query/${this.currPage}`
            //从后台获取数据
            axios.post({url, data:{currPage:currPage}}).then((res)=>{
                console.log(res.data)
                this.pageInfo=res.data
            })
        },
        methods:{
            //分页跳转
            handleCurrentChange(currPage)
            {
                console.log(currPage)
                this.currPage = currPage
            }
        }*/
        created(){
            let url="http://loaclhost:8081/bed/selectAllBed"
            //从后台获取数据
            axios.get(url,{params:this.bed}).then((res)=>{
                console.log(res.data)
                this.beds=res.data
            })
        }
    }

</script>&ndash;&gt;

<style scoped>

</style>-->










