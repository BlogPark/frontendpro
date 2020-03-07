<template>
    <div class="app-container">
        <el-form :inline="true" :model="paramQuery" ref="queryForm">
            <el-form-item label="分组名称" prop="groupName">
                <el-input
                        @keyup.enter.native="handleQuery"
                        clearable
                        placeholder="请输入角色名称"
                        size="small"
                        style="width: 240px"
                        v-model="paramQuery.groupName"
                />
            </el-form-item>
            <el-form-item>
                <el-button @click="handleQuery" icon="el-icon-search" size="mini" type="primary">搜索</el-button>
                <el-button @click="resetQuery" icon="el-icon-refresh" size="mini" type="info">重置</el-button>
                <el-button @click="handleAdd" icon="el-icon-plus" size="mini" type="success"
                           v-hasPermi="['system:role:add']">新增
                </el-button>
            </el-form-item>
        </el-form>

        <el-table
                :data="grouplist"
                @selection-change="handleSelectionChange"
                v-loading="loading">
            <el-table-column align="center" type="selection" width="55"/>
            <el-table-column
                    align="center"
                    label="分组编号"
                    prop="id"
                    width="250">
            </el-table-column>
            <el-table-column
                    label="分组名称"
                    prop="groupName"
                    width="350">
            </el-table-column>
            <el-table-column
                    label="分组描述"
                    prop="groupDesc"
                    width="180">
            </el-table-column>
            <el-table-column
                    label="分组类型"
                    prop="groupType"
                    width="180">
            </el-table-column>
            <el-table-column
                    label="创建时间"
                    prop="createTime">
            </el-table-column>
            <el-table-column
                    align="center" class-name="small-padding fixed-width"
                    label="操作">
                <template slot-scope="scope">
                    <el-button @click="watchDetail(scope.row.id)" icon="el-icon-view" size="small" type="text">查看
                    </el-button>
                    <el-button icon="el-icon-edit" size="small" type="text">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination
                :limit.sync="paramQuery.pageSize"
                :page.sync="paramQuery.pageIndex"
                :total="total"
                @pagination="loadData"
                v-show="total>0"
        />
        <el-dialog :title="title" :visible.sync="dialogTableVisible" width="30%">
            <!--<el-table :data="entityInfoList" border stripe>-->
            <!--<el-table-column label="字段名" property="fieldName" width="150"></el-table-column>-->
            <!--<el-table-column label="字段描述" property="fieldDesc" width="200"></el-table-column>-->
            <!--<el-table-column label="字段类型" property="fieldType"></el-table-column>-->
            <!--</el-table>-->
        </el-dialog>
    </div>
</template>

<script>
    import {getAllGroup} from '@/api/business/droolsapi'

    export default {
        name: "grouplist",
        data() {
            return {
                // 遮罩层
                loading: true,
                // 选中数组
                ids: [],
                // 非单个禁用
                single: true,
                // 非多个禁用
                multiple: true,
                //对话框
                dialogTableVisible: false,
                //规则列表
                grouplist: [],
                //查询条件
                paramQuery: {
                    groupName: '',
                    id: 0,
                    pageIndex: 1,
                    pageSize: 10
                },
                //数据总条数
                total: 0,
                //dialog标题
                title: ''
            }
        },
        methods: {
            loadData() {
                this.loading = true;
                getAllGroup(this.paramQuery).then((res) => {
                    this.grouplist = res.list;
                    this.paramQuery.pageIndex = res.pageNum;
                    this.paramQuery.pageSize = res.pageSize;
                    this.total = res.total;
                    this.loading = false;
                });
            },
            watchDetail(id) {
                console.log(id);
                // var idparamter = {
                //     id: id
                // }
                // getEntitiyInfo(idparamter).then((res) => {
                //     this.entityInfoList = res;
                // });
                this.dialogTableVisible = true;
            },
            /** 搜索按钮操作 */
            handleQuery() {
                this.pageIndex = 1;
                this.loadData();
            },
            // 多选框选中数据
            handleSelectionChange(selection) {
                this.ids = selection.map(item => item.roleId)
                this.single = selection.length != 1
                this.multiple = !selection.length
            },
            /** 重置按钮操作 */
            resetQuery() {
                this.dateRange = [];
                this.resetForm("queryForm");
                this.handleQuery();
            }
        },
        created() {
            this.loadData();
        }
    }
</script>

<style scoped>
    .el-dialog-style {
        width: 40%;
    }
</style>
