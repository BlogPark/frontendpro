<template>
    <div class="app-container">
        <el-form :inline="true" :model="queryParams" ref="queryForm">
            <el-form-item label="实体名称" prop="templateName">
                <el-input
                        @keyup.enter.native="handleQuery"
                        clearable
                        placeholder="请输入实体名称"
                        size="small"
                        style="width: 240px"
                        v-model="queryParams.entityName"
                />
            </el-form-item>
            <el-form-item>
                <el-button @click="handleQuery" icon="el-icon-search" size="mini" type="primary">搜索</el-button>
                <el-button @click="resetQuery" icon="el-icon-refresh" size="mini" type="info">重置</el-button>
            </el-form-item>
        </el-form>

        <el-table
                :data="entitylist"
                v-loading="loading">
            <el-table-column
                    label="实体名称"
                    prop="entityName"
                    width="180">
            </el-table-column>
            <el-table-column
                    label="实体路径"
                    prop="entityPackage"
                    width="450">
            </el-table-column>
            <el-table-column
                    label="实体描述"
                    prop="entityDesc"
                    width="180">
            </el-table-column>
            <el-table-column
                    label="分组名称"
                    prop="groupName"
                    width="180">
            </el-table-column>
            <el-table-column
                    label="实体备注"
                    prop="eneityRemark">
            </el-table-column>
            <el-table-column
                    align="center" class-name="small-padding fixed-width"
                    label="操作">
                <template slot-scope="scope">
                    <el-button @click="watchDetail(scope.row.id)" icon="el-icon-view" size="small" type="text">查看
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination
                :limit.sync="queryParams.pageSize"
                :page.sync="queryParams.pageIndex"
                :total="total"
                @pagination="loadData"
                v-show="total>0"
        />
        <el-dialog :visible.sync="dialogTableVisible" title="字段详情" width="30%">
            <el-table :data="entityInfoList" border stripe>
                <el-table-column label="字段名" property="fieldName" width="150"></el-table-column>
                <el-table-column label="字段描述" property="fieldDesc" width="200"></el-table-column>
                <el-table-column label="字段类型" property="fieldType"></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
    import {getAllEntities, getEntitiyInfo} from '@/api/business/droolsapi'


    export default {
        name: "entitylist",
        data() {
            return {
                // 遮罩层
                loading: true,
                entitylist: [],
                dialogTableVisible: false,
                entityInfoList: [],
                total: 0,
                queryParams: {
                    id: 0,
                    entityName: '',
                    groupId: 0,
                    groupName: '',
                    pageIndex: 1,
                    pageSize: 10
                }
            }
        },
        methods: {
            loadData() {
                this.loading = true;
                getAllEntities(this.queryParams).then((res) => {
                    this.entitylist = res.list;
                    this.queryParams.pageIndex = res.pageNum;
                    this.queryParams.pageSize = res.pageSize;
                    this.total = res.total;
                    this.loading = false;
                });
            },
            watchDetail(id) {
                var idparamter = {
                    id: id
                }
                getEntitiyInfo(idparamter).then((res) => {
                    this.entityInfoList = res;
                });
                this.dialogTableVisible = true;
            },
            /** 搜索按钮操作 */
            handleQuery() {
                this.queryParams.pageIndex = 1;
                this.loadData();
            },
            /** 重置按钮操作 */
            resetQuery() {
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
