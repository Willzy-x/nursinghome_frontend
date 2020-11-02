<template>
  <div id="checkout_panel">
    <div id="checkout_form">
      <el-form ref="checkOutForm" :model="checkOutForm" label-width="80px">
        <el-form-item label="客人编号">
          <el-input v-model="checkOutEntry.customerId"></el-input>
        </el-form-item>

        <el-form-item label="备注">
          <el-input type="textarea" v-model="checkOutEntry.remarks"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitCheckOutEntry">
            提交
          </el-button>
          <el-button @click="clearAll">
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <div id="checkout_table">
      <el-table :data="pagedCheckOutEntries" style="width: 100%;">
        <el-table-column
                label="日期"
                width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.checkOutDate }}</span>
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
                    @click="deleteCheckOutEntry(scope.$index, scope.row)">删除
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
          <el-button type="primary" @click="getPagedCheckOutEntries">
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
        name: "CheckOut",
        data() {
            return {
                checkOutEntry: {
                    customerId: "",
                    checkOutDate: moment().format('YYYY/MM/DD'),
                    remarks: ""
                },
                pagedCheckOutEntries: {},
                pageParams: {
                    pageNum: 1, pageSize: 3
                }
            }
        },
        methods: {
            async submitCheckOutEntry() {
                let url = "http://localhost:8081/checkout/checkout_entry?";
                this.checkOutEntry.checkOutDate = moment().format('YYYY/MM/DD');
                let urlWithParam = await this.concoctParams(url);
                this.$ajax.put(urlWithParam, {})
                    .then(res => {
                            console.log(res.data);
                            if (res.data) {
                                this.$message.success("出住信息成功录入！");
                            } else {
                                this.$message.error("出住信息录入失败，请稍后再试！");
                            }
                        }
                    ).catch(exception => {
                    console.error(exception);
                });
            },

            clearAll() {
                this.checkOutEntry.customerId = "";
                this.checkOutEntry.remarks = ""
            },

            async concoctParams(url) {
                for (let key in this.checkOutEntry) {
                    let attrib = this.checkOutEntry[key];
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

            async getPagedCheckOutEntries() {
                let url = `http://localhost:8081/checkout/paged_checkout_entries?pageNum=${this.pageParams.pageNum}
                  &pageSize=${this.pageParams.pageSize}`;
                console.log(url);
                this.$ajax.get(url).then(resp => {
                    if (!resp) {
                        this.$message.error("拉取入住信息错误，请稍后再试！");
                        return;
                    }
                    this.pagedCheckOutEntries = resp.data;
                }).catch(error => {
                    console.log(error)
                })
            },

            async deleteCheckOutEntry(index, row) {
                console.log("delete: " + row.id);
                let entryId = row.id;
                let url = `http://localhost:8081/checkout/checkout_entry_by_id?id=${entryId}`;
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
                await this.getPagedCheckOutEntries();
                // location.reload();
            }
        }
    }
</script>

<style scoped>

</style>