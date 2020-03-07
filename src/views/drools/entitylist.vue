<template>
    <div class="app-container">
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
                    width="350">
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
                    <el-button icon="el-icon-edit" size="small" type="text">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination
                :limit.sync="pageSize"
                :page.sync="pageIndex"
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
                groupName: '',
                groupId: '',
                entityName: '',
                id: 0,
                dialogTableVisible: false,
                entityInfoList: [],
                pageIndex: 1,
                pageSize: 10,
                total: 0
            }
        },
        methods: {
            loadData() {
                this.loading = true;
                var postdata = {
                    id: this.id,
                    groupName: this.groupName,
                    entityName: this.entityName,
                    groupId: this.groupId,
                    pageSize: this.pageSize,
                    pageIndex: this.pageIndex
                }
                getAllEntities(postdata).then((res) => {
                    this.entitylist = res.list;
                    this.pageIndex = res.pageNum;
                    this.pageSize = res.pageSize;
                    this.total = res.total;
                    this.loading = false;
                });
            },
            watchDetail(id) {
                console.log(id);
                var idparamter = {
                    id: id
                }
                getEntitiyInfo(idparamter).then((res) => {
                    this.entityInfoList = res;
                });
                this.dialogTableVisible = true;
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
