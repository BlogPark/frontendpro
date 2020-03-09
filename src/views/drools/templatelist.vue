<template>
    <div class="app-container">
        <el-form :inline="true" :model="queryParams" ref="queryForm">
            <el-form-item label="模板名称" prop="templateName">
                <el-input
                        @keyup.enter.native="handleQuery"
                        clearable
                        placeholder="请输入模板名称"
                        size="small"
                        style="width: 240px"
                        v-model="paramQuery.templateName"
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
                :limit.sync="queryParams.pageSize"
                :page.sync="queryParams.pageIndex"
                :total="total"
                @pagination="loadData"
                v-show="total>0"
        />
        <el-dialog :visible.sync="addoreditdialog" title="模板详情" width="30%">
            <el-form :model="templatedata" :rules="rules" label-width="80px" ref="postform">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="模板名称" prop="templateName">
                            <el-input :disabled="disableedit" placeholder="请输入模板名称"
                                      v-model="templatedata.templateName"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="模板描述" prop="templateDesc">
                            <el-input :disabled="disableedit" placeholder="请输入模板描述"
                                      v-model="templatedata.templateDesc"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="是否可修改" prop="canChanged">
                            <el-input :disabled="disableedit" placeholder="是否可修改"
                                      v-model="templatedata.canChanged"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="引用函数" prop="quoteFunctions">
                            <el-input :disabled="disableedit" placeholder="引用函数"
                                      v-model="templatedata.quoteFunctions"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="引用实体" prop="quoteEntities">
                            <el-input :disabled="disableedit" v-model="templatedata.quoteEntities"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="模板内容">
                            <Editor :disabled="disableedit" v-model="templatedata.templateContent"/>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div class="dialog-footer" slot="footer">
                <el-button @click="addoreditgroup" type="primary">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {addTemplate, editTemplate, getAllTemplate, getSingleTemplate} from '@/api/business/droolsapi'

    export default {
        name: "templatelist",
        data() {
            return {
                // 遮罩层
                loading: true,
                //对话框
                addoreditdialog: false,
                //规则列表
                templatelist: [],
                queryParams: {
                    templateName: '',
                    id: 0,
                    pageIndex: 1,
                    pageSize: 10
                },
                total: 0,
                //是否禁用
                disableedit: false,
                templatedata: {
                    id: 0,
                    templateName: '',
                    templateDesc: '',
                    quoteEntities: '',
                    canChanged: '',
                    templateContent: '',
                    quoteFunctions: ''
                }
            }
        },
        methods: {
            loadData() {
                this.loading = true;
                getAllTemplate(this.queryParams).then((res) => {
                    this.templatelist = res.list;
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
                getSingleTemplate(idparamter).then((res) => {
                    this.entityInfoList = res;
                });
                this.addoreditdialog = true;
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
            },
            handleAdd() {
                this.groupdata = {
                    id: 0,
                    groupName: '',
                    groupType: '',
                    groupDesc: ''
                }
                this.addoreditdialog = true;
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
