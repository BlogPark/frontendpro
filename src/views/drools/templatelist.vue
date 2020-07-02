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
                        v-model="queryParams.templateName"
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
                    width="150">
            </el-table-column>
            <el-table-column
                    label="模板名称"
                    prop="templateName"
                    width="250">
            </el-table-column>
            <el-table-column
                    label="模板描述"
                    prop="templateDesc"
                    width="400">
            </el-table-column>
            <el-table-column
                    label="可编辑"
                    width="100">
                <template slot-scope="scope1">
                    <el-switch
                            disabled
                            v-model="scope1.row.canChanged===1">
                    </el-switch>
                </template>
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
                    <el-button @click="editDetail(scope.row.id)" icon="el-icon-edit" size="small" type="text"
                               v-show="scope.row.canChanged==1">编辑
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
        <el-dialog :visible.sync="addoreditdialog" title="模板详情" width="40%">
            <el-form :model="templatedata" :rules="rules" label-width="120px" ref="postform">
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
                        <el-form-item label="可编辑" prop="canChanged">
                            <el-switch
                                    :disabled="disableedit"
                                    active-value="1"
                                    inactive-value="0"
                                    v-model="templatedata.canChanged">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="引用函数" prop="quoteFunctions">
                            <el-input :disabled="disableedit" placeholder="引用函数"
                                      v-model="templatedata.quoteFunctions" v-show="false"/>
                            <el-tag
                                    :closable="!disableedit"
                                    :key="tag.id"
                                    @close="handleCloseFunction(tag)"
                                    type="success"
                                    v-for="tag in quotefunctionlist">
                                {{tag.functionName}}({{tag.functionDesc}})
                            </el-tag>
                            <el-button @click="openquotedialog(1)" class="button-new-tag" size="small"
                                       v-show="!disableedit">+
                                添加新引用
                            </el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="引用实体" prop="quoteEntities">
                            <el-input :disabled="disableedit" v-model="templatedata.quoteEntities" v-show="false"/>
                            <el-tag
                                    :closable="!disableedit"
                                    :key="entity.id"
                                    @close="handleCloseEntity(entity)"
                                    type="success"
                                    v-for="entity in quoteentitylist">
                                {{entity.entityName}}({{entity.entityDesc}})
                            </el-tag>
                            <el-button @click="openquotedialog(2)" class="button-new-tag" size="small"
                                       v-show="!disableedit">+
                                添加新引用
                            </el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="模板内容">
                            <codemirror
                                    :options="cmOptions"
                                    :value="templatedata.templateContent"
                                    @input="onCmCodeChange"
                                    class="code"
                                    placeholder="请输入规则内容"
                                    ref="mycode"/>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div class="dialog-footer" slot="footer" style="padding-top:20px" v-show="!disableedit">
                <el-button @click="addoredittemplate" type="primary">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
            <div align="center" class="dialog-footer" slot="footer" style="padding-top:20px" v-show="disableedit">
                <el-button @click="cancel" type="primary">关闭</el-button>
            </div>
            <el-dialog :title="dialogtitle" :visible.sync="quotedialog" append-to-body width="600px">
                <el-table
                        :data="quotelist"
                        @selection-change="handleSelectionChange"
                        v-loading="loading">
                    <el-table-column align="center" type="selection" width="60"/>
                    <el-table-column
                            align="center"
                            label="名称"
                            prop="name"
                            width="250">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="描述"
                            prop="desc"
                            width="250">
                    </el-table-column>
                </el-table>
                <pagination
                        :limit.sync="quoteparams.pageSize"
                        :page.sync="quoteparams.pageIndex"
                        :total="quotetotal"
                        @pagination="openquotedialog(0)"
                        v-show="quotetotal>0"
                />
                <div class="dialog-footer" slot="footer" style="padding-top:20px">
                    <el-button @click="addquote" type="primary">确 定</el-button>
                    <el-button @click="cancelquote">取 消</el-button>
                </div>
            </el-dialog>
        </el-dialog>
    </div>
</template>

<script>
    import {
        addTemplate,
        editTemplate,
        getAllTemplate,
        getentitysbyids,
        getfunctionlistbyids,
        getquotelist,
        getSingleTemplate
    } from '@/api/business/droolsapi'
    import {codemirror} from 'vue-codemirror'
    import './codemirrorsettings'

    export default {
        name: "TemplateList",
        components: {
            codemirror
        },
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
                disableedit: true,
                templatedata: {
                    id: 0,
                    templateName: '',
                    templateDesc: '',
                    quoteEntities: '',
                    canChanged: 0,
                    templateContent: '',
                    quoteFunctions: ''
                },
                rules: {
                    templateName: [
                        {required: true, message: "模板名称不能为空", trigger: "blur"}
                    ]
                },
                //引用函数集合
                quotefunctionlist: [],
                //引用实体集合
                quoteentitylist: [],
                //弹出框名称
                dialogtitle: '',
                //引用弹出框是否显示
                quotedialog: false,
                //引用列表信息
                quotelist: [],
                //引用总数
                quotetotal: 0,
                //引用查询参数
                quoteparams: {
                    type: 1,
                    pageIndex: 1,
                    pageSize: 10
                },
                // 选中数组
                ids: [],
                // 非单个禁用
                single: true,
                // 非多个禁用
                multiple: true,
                //codemirror参数
                cmOptions: {
                    value: '',
                    mode: 'text/x-groovy',
                    theme: "darcula",
                    smartIndent: true,
                    readOnly: this.disableedit,
                    lineNumbers: true,
                    lineSeparator: '###',
                    cursorHeight: 0.75
                }
            }
        },
        watch: {
            disableedit: {
                handler(newVal, objVal) {
                    console.log(newVal)
                    this.cmOptions.readOnly = newVal;
                },
                deep: true,
                immediate: true
            }
        },
        created() {
            this.loadData();
        },
        methods: {
            //数据加载
            loadData() {
                this.loading = true;
                getAllTemplate(this.queryParams).then((res) => {
                    console.log(res.data.list)
                    this.templatelist = res.data.list;
                    this.total = res.data.total;
                    this.loading = false;
                });
            },
            //查看按钮
            watchDetail(id) {
                this.disableedit = true;
                var idparamter = {
                    id: id
                }
                getSingleTemplate(idparamter).then((res) => {
                    this.templatedata = res.data.templatesModel;
                    this.quotefunctionlist = res.data.functionModelList;
                    this.quoteentitylist = res.data.entityModelList;
                });
                this.addoreditdialog = true;
            },
            //编辑按钮
            editDetail(id) {
                var idparamter = {
                    id: id
                }
                getSingleTemplate(idparamter).then((res) => {
                    this.templatedata = res.data.templatesModel;
                    this.quotefunctionlist = res.data.functionModelList;
                    this.quoteentitylist = res.data.entityModelList;
                });
                this.disableedit = false;
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
            // 取消按钮
            cancel() {
                this.addoreditdialog = false;
                this.reset();
            },
            reset() {
                this.templatedata = {
                    id: 0,
                    templateName: '',
                    templateDesc: '',
                    quoteEntities: '',
                    canChanged: 0,
                    templateContent: '',
                    quoteFunctions: ''
                }
            },
            //添加按钮
            handleAdd() {
                this.templatedata = {
                    id: 0,
                    templateName: '',
                    templateDesc: '',
                    quoteEntities: '',
                    canChanged: '',
                    templateContent: '',
                    quoteFunctions: ''
                }
                this.quotefunctionlist = [];
                //引用实体集合
                this.quoteentitylist = [];
                this.disableedit = false;
                this.addoreditdialog = true;
            },
            //新增或者编辑确认
            addoredittemplate() {
                this.$refs["postform"].validate(valid => {
                    if (valid) {
                        if (this.templatedata.id > 0) {
                            editTemplate(this.templatedata).then((res) => {
                                this.addoreditdialog = false;
                                this.$message({
                                    message: '更新成功',
                                    type: 'success'
                                });
                            })
                        } else {
                            addTemplate(this.templatedata).then((res) => {
                                this.addoreditdialog = false;
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                            })
                        }
                        this.handleQuery();
                    }
                });

            },
            //取消函数引用
            handleCloseFunction(tag) {
                this.$confirm('删除引用函数可能造成模板错误, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //确定
                    var functionarry = this.templatedata.quoteFunctions.split(',');
                    functionarry.splice(functionarry.indexOf(tag.id), 1);
                    this.templatedata.quoteFunctions = functionarry.join(',');
                    this.quotefunctionlist.splice(this.quotefunctionlist.indexOf(tag), 1);
                }).catch(() => {
                    //取消
                });
            },
            //取消实体引用
            handleCloseEntity(entity) {
                this.$confirm('删除引用实体可能造成模板错误, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var entityarry = this.templatedata.quoteEntities.split(',');
                    entityarry.splice(entityarry.indexOf(entity.id), 1);
                    this.templatedata.quoteEntities = entityarry.join(',');
                    this.quoteentitylist.splice(this.quoteentitylist.indexOf(entity), 1);
                }).catch(() => {
                });
            },
            //打开添加引用窗体
            openquotedialog(type) {
                //添加函数引用
                this.dialogtitle = '函数列表';
                //添加实体引用
                this.dialogtitle = '实体列表';
                if (type !== 0) {
                    this.quoteparams.type = type;
                }
                getquotelist(this.quoteparams).then((res) => {
                    this.quotelist = res.data.list;
                    this.quotetotal = res.data.total;
                });
                this.quotedialog = true;
            },
            //确认添加
            addquote() {
                var newids = [];
                if (this.quoteparams.type === 1) {
                    const functionarry = this.templatedata.quoteFunctions.split(',')
                    this.ids.forEach(item => {
                        if (functionarry.indexOf(item.toString()) < 0) {
                            newids.push(item);
                        }
                    })
                    if (newids.length > 0) {
                        const idsStr = newids.join(',');
                        const postdata = {idList: newids}
                        //函数
                        getfunctionlistbyids(postdata).then((res) => {
                            this.quotefunctionlist = this.quotefunctionlist.concat(res.data);
                        });
                        if (this.templatedata.quoteFunctions == '') {
                            this.templatedata.quoteFunctions += idsStr;
                        } else {
                            this.templatedata.quoteFunctions += ',' + idsStr;
                        }
                    }
                } else if (this.quoteparams.type === 2) {
                    //实体
                    const entityarry = this.templatedata.quoteEntities.split(',')
                    this.ids.forEach(item => {
                        if (entityarry.indexOf(item.toString()) < 0) {
                            newids.push(item);
                        }
                    })
                    if (newids.length > 0) {
                        const idsStr = newids.join(',');
                        const postdata = {idList: newids}
                        getentitysbyids(postdata).then((res) => {
                            this.quoteentitylist = this.quoteentitylist.concat(res.data)
                        });
                        if (this.templatedata.quoteEntities == '') {
                            this.templatedata.quoteEntities += idsStr;
                        } else {
                            this.templatedata.quoteEntities += ',' + idsStr;
                        }
                    }
                }
                this.ids = []
                this.quotedialog = false
                this.$message({
                    message: '操作成功',
                    type: 'success'
                })
            },
            //取消添加
            cancelquote() {
                this.quotedialog = false
            },
            // 多选框选中数据
            handleSelectionChange(selection) {
                this.ids = selection.map(item => item.id)
                this.single = selection.length != 1
                this.multiple = !selection.length
            },
            //代码编辑器输入事件
            onCmCodeChange(instance) {
                this.templatedata.templateContent = instance
            }
        }
    }
</script>

<style scoped>
    .el-dialog-style {
        width: 40%;
    }
</style>
