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

<template>

    <div>
        <el-button type="primary" icon="el-icon-edit" round @click="handleAdd">新增床位</el-button>
        <el-button type="success" icon="el-icon-search" round @click="handleSelect">搜索</el-button>
        <el-table
                v-loading="loading"
                :data="pageInfo.list"
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
                    width="150">
            </el-table-column>
            <el-table-column
                    label="床位状态按钮"
                    width="700">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.bed_status"
                            active-text="占用"
                            inactive-text="空闲"
                            active-color="#ff4949"
                            inactive-color="#409eff"
                            active-value="占用"
                            inactive-value="空闲"
                            disabled>
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="200">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="success"
                            @click="handleEdit(scope.row.id)">编辑
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row.id)">删除
                    </el-button>
                </template>
            </el-table-column>

        </el-table>

        <el-pagination
                background
                layout="total,prev, pager, next"
                :page-size="pageInfo.pageSize"
                :total="pageInfo.total"
                @current-change="handleCurrentChange">
        </el-pagination>

        <el-dialog title="修改床位状态" width="20%" :visible.sync="dialogFormVisible">
            <el-form><!--//确实，在表单中有个v-model绑定后，el-form的model有没有一点都不影响，你可以删除不写-->
                <el-form-item label="床位号" :label-width="formLabelWidth">
                    <span>{{currId}}</span>
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
        data() {
            return {
                /*tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1517 弄',
                    zip: 200333
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1519 弄',
                    zip: 200333
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1516 弄',
                    zip: 200333
                }]*/
                currId: 0,
                currPage: 1,
                /*               form:{
                                   id:0,
                                   bed_status:-1
                               },*/
                pageInfo: {},
                loading: false,//是否正在加载
                dialogFormVisible: false,
                newbed_status: '',
                bedEdit: {
                    id: '',
                    bed_status: ''
                },
                formLabelWidth: '120px'
            }
        },
        created() {
            this.getData()
        },
        methods: {
            handleSelect() {
                this.$router.push("/bedSelect")
            },
            handleEdit(id) {
                this.currId = id,
                    this.dialogFormVisible = true
            },
            updateBed(bed_status) {
                console.log(bed_status)
                /*let url=`http://localhost:8081/bed/update`
                axios.post(url,bedEdit).then()
                this.$message.success('修改成功!');*/
                this.bedEdit.id = this.currId
                this.bedEdit.bed_status = bed_status
                let newbedEdit = this.bedEdit
                let url = `http://localhost:8081/bed/update`
                axios.post(url, newbedEdit).then()
                this.getData()
                this.$message.success('修改成功!');
                this.dialogFormVisible = false
            },
            handleDelete(id) {
                let url = `http://localhost:8081/bed/delBed/${id}`
                axios.get(url).then()
                this.getData()
                this.getData()
                console.log(id)
            },
            page(currentPage) {
                alert(currentPage)
            },
            handleCurrentChange(currPage) {
                console.log(`当前页: ${currPage}`);
                this.currPage = currPage
                this.getData()
                /*                //重新获取数据
                                let url=`http://localhost:8081/bed/query/${this.currPage}`
                                //从后台获取数据
                                axios.get(url).then((res)=>{
                                    console.log(res.data)
                                    this.pageInfo=res.data
                                })*/
            },
            getData() {
                this.loading = true
                //重新获取数据
                let url = `http://localhost:8081/bed/query/${this.currPage}`
                //从后台获取数据
                axios.get(url).then((res) => {
                    console.log(res.data)
                    this.pageInfo = res.data
                    this.loading = false
                })
            },
            handleAdd() {
                this.$router.push("/bedAdd")
            }
        }
    }
</script>


<!--<script>
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

</script>-->

<style scoped>

</style>