<template>
    <div style="width: 100%">
        <h3>订单列表页面</h3>
        <el-button @click="addNumber()">增加计数</el-button>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    label="日期"
                    prop="date"
                    width="180">
            </el-table-column>
            <el-table-column
                    label="姓名"
                    prop="name"
                    width="180">
            </el-table-column>
            <el-table-column
                    label="地址"
                    prop="address">
            </el-table-column>
        </el-table>
        <el-pagination
                :total="1000"
                layout="prev, pager, next">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "orderlist",
        data() {
            return {
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            }
        },
        methods: {
            addNumber() {
                this.$store.commit("addcount", 100);
            }
        }
    }
</script>

<style scoped>
    .el-pagination {
        white-space: nowrap;
        padding: 10px 5px;
        color: #303133;
        font-weight: bold;
        float: right;
    }
</style>
