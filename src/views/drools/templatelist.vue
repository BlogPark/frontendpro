<template>
    <div class="app-container">
        <el-table
                :data="templatelist"
                v-loading="loading">
            <el-table-column
                    align="center"
                    label="模板编号"
                    prop="id"
                    width="250">
            </el-table-column>
            <el-table-column
                    label="模板名称"
                    prop="templateName"
                    width="350">
            </el-table-column>
            <el-table-column
                    label="模板描述"
                    prop="templateDesc"
                    width="400">
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
                :limit.sync="pageSize"
                :page.sync="pageIndex"
                :total="total"
                @pagination="loadData"
                v-show="total>0"
        />
        <el-dialog :visible.sync="dialogTableVisible" title="字段详情" width="30%">
            <!--<el-table :data="entityInfoList" border stripe>-->
            <!--<el-table-column label="字段名" property="fieldName" width="150"></el-table-column>-->
            <!--<el-table-column label="字段描述" property="fieldDesc" width="200"></el-table-column>-->
            <!--<el-table-column label="字段类型" property="fieldType"></el-table-column>-->
            <!--</el-table>-->
        </el-dialog>
    </div>
</template>

<script>
    import {getAllTemplate} from '@/api/business/droolsapi'

    export default {
        name: "templatelist",
        data() {
            return {
                // 遮罩层
                loading: true,
                //对话框
                dialogTableVisible: false,
                //规则列表
                templatelist: [],
                templateName: '',
                id: 0,
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
                    templateName: this.templateName,
                    pageSize: this.pageSize,
                    pageIndex:
                    this.pageIndex
                }
                getAllTemplate(postdata).then((res) => {
                    this.templatelist = res.list;
                    this.pageIndex = res.pageNum;
                    this.pageSize = res.pageSize;
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
