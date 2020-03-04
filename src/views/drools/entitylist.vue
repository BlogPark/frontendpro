<template>
    <div>
        <el-table
                :data="entitylist"
                border
                style="width: 100%">
            <el-table-column
                    label="实体名称"
                    prop="entityName"
                    width="180">
            </el-table-column>
            <el-table-column
                    label="实体路径"
                    prop="entityPackage"
                    width="250">
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
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="watchDetail(scope.row.id)" size="small" type="text">查看</el-button>
                    <el-button size="small" type="text">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
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
                entitylist: [],
                groupName: '',
                groupId: '',
                entityName: '',
                id: 0,
                dialogTableVisible: false,
                entityInfoList: []
            }
        },
        methods: {
            loadData() {
                var postdata = {
                    id: this.id,
                    groupName: this.groupName,
                    entityName: this.entityName,
                    groupId: this.groupId
                }
                getAllEntities(postdata).then((res) => {
                    this.entitylist = res.list;
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
