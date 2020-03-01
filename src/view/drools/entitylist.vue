<template>
    <div>
        <el-table
                :data="entitylist"
                border
                style="width: 100%">
            <el-table-column
                    prop="entityName"
                    label="实体名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="entityPackage"
                    label="实体路径"
                    width="250">
            </el-table-column>
            <el-table-column
                    prop="entityDesc"
                    label="实体描述"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="groupName"
                    label="分组名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="eneityRemark"
                    label="实体备注">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="watchDetail(scope.row.id)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="收货地址" :visible.sync="dialogTableVisible" width="30%">
            <el-table :data="entityInfoList" border stripe>
                <el-table-column property="fieldName" label="字段名" width="150"></el-table-column>
                <el-table-column property="fieldDesc" label="字段描述" width="200"></el-table-column>
                <el-table-column property="fieldType" label="字段类型"></el-table-column>
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
