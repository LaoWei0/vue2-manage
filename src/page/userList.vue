<template>

    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-form ref="form" :model="form" label-width="80px">
                <el-row>
                    <el-col :span="4">
                        <el-form-item label="货物名称">
                            <el-input v-model="form.goodsName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="军运号">
                            <el-input v-model="form.transportNum"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="超限等级">
                            <el-select v-model="form.overLevel" placeholder="请选择超限等级">
                                <el-option label="一级超限" value="1"></el-option>
                                <el-option label="二级超限" value="2"></el-option>
                                <el-option label="超级超限" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">
                        <el-form-item>
                            <el-button @click="initData('foodForm')">搜索</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item>
                            <el-button @click="resetData('foodForm')">重置</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item>
                            <el-button @click="exportData()">导出</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>
        </div>

        <div class="table_container">
            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100%"
                @selection-change="changeFun"
            >
                <el-table-column
                    property="id"
                    type="selection"
                    width="100">
                </el-table-column>
                <el-table-column
                    type="index"
                    width="100">
                </el-table-column>
                <el-table-column
                    property="and_id"
                    v-if="false"
                >
                </el-table-column>
                <el-table-column
                    property="start_station"
                    label="发站"
                    width="220">
                </el-table-column>
                <el-table-column
                    property="start_company"
                    label="发站公司"
                    width="220">
                </el-table-column>
                <el-table-column
                    property="transport_num"
                    label="军运号">
                </el-table-column>
                <el-table-column
                    property="goods_name"
                    label="货物名称">
                </el-table-column>
                <el-table-column
                    property="ultralimit_type"
                    label="超限级别">
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">查看详情
                        </el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                        <!--<el-button-->
                        <!--size="mini"-->
                        <!--type="Success"-->
                        <!--@click="addFood(scope.$index, scope.row)">-->
                        <!--<a href="javasript:;"/>导出-->
                        <!--</el-button>-->
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="20"
                    layout="total, prev, pager, next"
                    :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    // import {getUserList, getUserCount} from '@/api/getData'
    import qs from 'qs';
    import axios from 'axios';
    import {apiQueryTraceList, apiDeleteTrace, apidownloadFile} from '@/config/api';

    export default {
        data() {
            return {
                tableData: [],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                form: {
                    goodsName: '',
                    transportNum: '',
                    overLevel: '',
                },
                checkBoxData: [],
                traceIds: [],
            }
        },
        components: {
            headTop,
        },
        created() {
            this.initData();
        },
        methods: {
            async initData() {
                try {
                    const countData = await apiQueryTraceList({
                        overLevel: this.form.overLevel,
                        goodsName: this.form.goodsName,
                        transportNum: this.form.transportNum,
                    });
                    if (countData.code == 200) {
                        // alert("查数量");
                        this.count = countData.paging.totalcount;
                    } else {
                        throw new Error('获取数据失败');
                    }
                    this.getOrders();
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            },
            async resetData() {
                try {
                    this.form.overLevel = '';
                    this.form.goodsName = '';
                    this.form.transportNum = '';
                    const countData = await apiQueryTraceList({
                        overLevel: this.form.overLevel,
                        goodsName: this.form.goodsName,
                        transportNum: this.form.transportNum,
                    });
                    if (countData.code == 200) {
                        // alert("查数量");
                        this.count = countData.paging.totalcount;
                    } else {
                        throw new Error('获取数据失败');
                    }
                    this.getOrders();
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1) * this.limit;
                this.getUsers()
            },
            async getOrders() {
                const Orders = await apiQueryTraceList({
                    offset: this.offset,
                    limit: this.limit,
                    overLevel: this.form.overLevel,
                    goodsName: this.form.goodsName,
                    transportNum: this.form.transportNum,
                });
                this.tableData = [];
                Orders.data.forEach((item, index) => {
                    const tableData = {};
                    tableData.id = item.id;
                    tableData.and_id = item.and_id;
                    tableData.goods_name = item.goods_name;
                    tableData.start_company = item.start_company;
                    tableData.start_station = item.start_station;
                    tableData.transport_num = item.transport_num;
                    tableData.ultralimit_type = item.ultralimit_type;
                    // tableData.index = index;
                    this.tableData.push(tableData);
                })
            },
            changeFun(val) {
                this.checkBoxData = [];
                val.forEach((item, index) => {

                    this.checkBoxData[index] = item.and_id;
                });
            },
            async exportData() {
                const param = this.checkBoxData;
                if (param == null || param.length == 0){
                    this.$message({
                        message: '请先选择记录',
                        title: '提示',
                        showCancelButton: true,
                        confirmButtonText: '确定',
                        duration:2000
                    });
                }else {
                    const res = await apidownloadFile({
                        traceIds: JSON.stringify(param),
                    });
                    if (res.size > 0){
                        var blob = new Blob([res], {type: "application/octet-stream"});
                        var downloadElement = document.createElement('a');
                        var href = window.URL.createObjectURL(blob); //创建下载的链接
                        downloadElement.href = href;
                        downloadElement.download = '运输记录+电报.zip'; //下载后文件名
                        document.body.appendChild(downloadElement);
                        downloadElement.click(); //点击下载
                        document.body.removeChild(downloadElement); //下载完成移除元素
                        window.URL.revokeObjectURL(href); //释放掉blob对象

                        this.checkBoxData=[];
                    }
                }

            },
            //查询详情
            handleEdit(index, row) {
                this.$router.push({path: 'adminSet', query: {andId: row.and_id}});
            },
            async addFood(index, row) {
                // this.$router.push({path: 'addGoods', query: {restaurant_id: row.and_id}})
                // const Orders = await apidownloadFile({
                //
                // });
                // window.location.href("http:localhost:8090/api/goods/nc/downloadFile.do");

            },
            //删除
            async handleDelete(index, row) {
                this.$msgbox({
                    title: '提示',
                    message: '确定删除吗？',
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            // const res = await apiDeleteTrace();
                            this.deleteTrace(index, row);
                            done();
                        } else {
                            this.$message({
                                type: 'info',
                                message: '取消'
                            });
                            done();
                        }
                    }
                });
            },
            async deleteTrace(index, row) {
                try {
                    const res = await apiDeleteTrace({
                        andId: row.and_id
                    });
                    if (res.code == 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        });
                        this.getOrders();
                        this.initData();
                        // this.tableData.splice(index, 1);
                    } else {
                        throw new Error(res.message)
                    }
                } catch (err) {
                    this.$message({
                        type: 'error',
                        message: '删除失败'
                    });
                    // console.log('删除失败')
                }
            },


        },
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .table_container {
        padding: 20px;
    }

    .commonStyle {
        pading: 10px;
    }
</style>
