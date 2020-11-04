<template>
  <div id="checkin_panel">
    <div id="checkin_form">
      <el-form ref="checkInForm" :model="checkInForm" label-width="80px">
        <el-form-item label="客人编号">
          <el-input v-model="checkInEntry.customerId"></el-input>
        </el-form-item>

        <el-form-item label="客人姓名">
          <el-input v-model="checkInEntry.customerName"></el-input>
        </el-form-item>

        <el-form-item label="客人年龄">
          <el-input v-model="checkInEntry.customerAge"></el-input>
        </el-form-item>

        <el-form-item label="客人性别">
          <el-input v-model="checkInEntry.customerSex"></el-input>
        </el-form-item>

        <el-form-item label="床位编号">
          <el-input v-model="checkInEntry.bedId"></el-input>
        </el-form-item>

        <el-form-item label="备注">
          <el-input type="textarea" v-model="checkInEntry.remarks"></el-input>
        </el-form-item>


        <el-form-item>
          <el-button type="primary" @click="submitCheckInEntry">
            提交
          </el-button>
          <el-button @click="clearAll">
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <div id="checkin_table">
      <el-table :data="pagedCheckInEntries" style="width: 100%;">
        <el-table-column
                label="日期"
                width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.checkInDate }}</span>
          </template>
        </el-table-column>

        <el-table-column
                label="客人编号"
                width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.customerId }}</span>
          </template>
        </el-table-column>

        <el-table-column
                label="客人姓名"
                width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.customerName }}</span>
          </template>
        </el-table-column>

        <el-table-column
                label="客人年龄"
                width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.customerAge }}</span>
          </template>
        </el-table-column>

        <el-table-column
                label="客人性别"
                width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.customerSex }}</span>
          </template>
        </el-table-column>

        <el-table-column
                label="床位编号"
                width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.bedId }}</span>
          </template>
        </el-table-column>

        <el-table-column
                label="备注"
                width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.remarks }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div id="page_form">
      <el-form ref="pageForm" :model="pageForm" style="width: 100%">
        <el-form-item label="页数">
          <el-input v-model="pageParams.pageNum"></el-input>
        </el-form-item>

        <el-form-item label="每页显示个数">
          <el-input v-model="pageParams.pageSize"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getPagedCheckInEntries">
            提交
          </el-button>
        </el-form-item>

      </el-form>
    </div>

  </div>
</template>

<script>
    import moment from "moment";

    export default {
        name: "CheckIn",
        data() {
            return {
                checkInEntry: {
                    customerId: "",
                    customerName: "",
                    customerAge: "",
                    customerSex: "",
                    bedId: "",
                    checkInDate: "",
                    remarks: ""
                },
                pagedCheckInEntries: {},
                pageParams: {
                    pageSize: 3,
                    pageNum: 1
                }
            };
        },
        methods: {
            async checkBedInfo() {
                let res = false;
                let url = `http://localhost:8081/bed/selectBedById/${this.checkInEntry.bedId}`;
                await this.$ajax.get(url).then(resp => {
                    console.log("bed: " + typeof resp.data[0].bed_status);
                    if (resp.data[0].bed_status === "0") {
                        console.log("empty bed");
                        res = true;
                    }
                }).catch(error => {
                    console.log(error);
                })
                return res;
            },

            async submitCheckInEntry() {
                // TODO: 添加查询床位是否空闲的逻辑
                let res = await this.checkBedInfo();
                if (!res) {
                    this.$message.error("床位不为空，请重新选择床位编号！");
                    return;
                }

                let url = "http://localhost:8081/checkin/checkin_entry?";
                this.checkInEntry.checkInDate = moment().format('YYYY/MM/DD');
                let urlWithParam = await this.concoctParams(url);
                this.$ajax.put(urlWithParam, {})
                    .then(res => {
                            console.log(res.data);
                            if (res.data) {
                                this.$message.success("入住信息成功录入！");
                            } else {
                                this.$message.error("入住信息录入失败，请稍后再试！");
                            }
                        }
                    ).catch(exception => {
                    console.error(exception);
                });
            },

            clearAll() {
                this.checkInEntry.customerId = "";
                this.checkInEntry.customerName = "";
                this.checkInEntry.customerAge = "";
                this.checkInEntry.customerSex = "";
                this.checkInEntry.bedId = "";
                this.checkInEntry.checkInDate = "";
                this.checkInEntry.remarks = "";
            },

            async concoctParams(url) {
                for (let key in this.checkInEntry) {
                    let attrib = this.checkInEntry[key];
                    console.log(key + ": " + attrib);
                    if (attrib.length !== 0) {
                        if (url.lastIndexOf("?") !== (url.length - 1)) {
                            url += `&${key}=${attrib}`;
                        } else {
                            url += `${key}=${attrib}`;
                        }
                    }
                }
                return url;
            },

            async getPagedCheckInEntries() {
                let url = `http://localhost:8081/checkin/paged_checkin_entries?pageNum=${this.pageParams.pageNum}
                  &pageSize=${this.pageParams.pageSize}`;
                console.log(url);
                this.$ajax.get(url).then(resp => {
                    if (!resp) {
                        this.$message.error("拉取入住信息错误，请稍后再试！");
                        return;
                    }
                    this.pagedCheckInEntries = resp.data;
                }).catch(error => {
                    console.log(error)
                })
            },

            async handleDelete(index, row) {
                let entryId = row.id;
                console.log("delete: " + row.id);
                let url = `http://localhost:8081/checkin/checkin_entry_by_id?id=${entryId}`;
                this.$ajax.delete(url).then(resp => {
                    if (resp.data) {
                        this.$message.success("删除条目成功！");
                    } else {
                        this.$message.error("删除条目失败，请稍后再试！");
                    }
                }).catch(error => {
                    console.log(error);
                })
                // 重新拉取数据
                await this.getPagedCheckInEntries();
                location.reload();
            }
        }
    }
</script>

<style scoped>

</style>