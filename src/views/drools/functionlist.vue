<template>
    <div class="app-container">
        <el-form :inline="true" :model="queryParams" ref="queryForm">
            <el-form-item label="函数名称" prop="templateName">
                <el-input
                        @keyup.enter.native="handleQuery"
                        clearable
                        placeholder="请输入函数名称"
                        size="small"
                        style="width: 240px"
                        v-model="queryParams.functionName"
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
                :data="functionlist"
                v-loading="loading">
            <el-table-column
                    align="center"
                    label="函数编号"
                    prop="id"
                    width="250">
            </el-table-column>
            <el-table-column
                    label="函数名称"
                    prop="functionName"
                    width="350">
            </el-table-column>
            <el-table-column
                    label="函数描述"
                    prop="functionDesc"
                    width="180">
            </el-table-column>
            <el-table-column
                    label="分组名称"
                    prop="groupName"
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
                    <el-button @click="watchDetail(scope.row.id,1)" icon="el-icon-view" size="small" type="text">查看
                    </el-button>
                    <el-button @click="watchDetail(scope.row.id,2)" icon="el-icon-edit" size="small" type="text">编辑
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
        <el-dialog :visible.sync="addoreditdialog" title="函数详情" width="40%">
            <el-form :model="functiondata" :rules="rules" label-width="120px" ref="postform">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="函数名称" prop="functionName">
                            <el-input :disabled="disableedit" placeholder="请输入函数名称"
                                      v-model="functiondata.functionName"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="函数描述" prop="functionDesc">
                            <el-input :disabled="disableedit" placeholder="请输入函数描述"
                                      v-model="functiondata.functionDesc"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="所属分组" prop="groupName">
                            <el-select :disabled="disableedit" v-model="functiondata.groupName">
                                <el-option
                                        :key="group.id"
                                        :label="group.groupName"
                                        :value="group.groupName"
                                        v-for="group in grouplist"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="返回类型" prop="returnType">
                            <el-select :disabled="disableedit" v-model="functiondata.returnType">
                                <el-option
                                        :key="dict.dictValue"
                                        :label="dict.dictLabel"
                                        :value="dict.dictValue"
                                        v-for="dict in returnTypeOptions"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="引用实体" prop="quoteEntities">
                            <el-input :disabled="disableedit" v-model="functiondata.quoteEntities" v-show="false"/>
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
                        <el-form-item label="参数描述" prop="functionParamterDesc">
                            <el-input :disabled="disableedit" type="textarea"
                                      v-model="functiondata.functionParamterDesc"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="使用示例" prop="usageExample">
                            <el-input :disabled="disableedit" type="textarea"
                                      v-model="functiondata.usageExample"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="模板内容">
                            <codemirror
                                    :options="cmOptions"
                                    :value="functiondata.functionContent"
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
        addFunction,
        editFunction,
        getAllFunction,
        getentitysbyids,
        getFunction,
        getquotelist,
        selectGroupList,
        selectTemplateList
    } from '@/api/business/droolsapi'
    import {codemirror} from 'vue-codemirror'
    import './codemirrorsettings'

    export default {
        name: "functionlist",
        components: {
            codemirror
        },
        data() {
            return {
                // 遮罩层
                loading: true,
                //对话框
                dialogTableVisible: false,
                //规则列表
                functionlist: [],
                //引用实体列表
                quoteentitylist: [],
                //查询参数
                queryParams: {
                    functionName: '',
                    functionDesc: '',
                    groupName: '',
                    id: 0,
                    pageIndex: 1,
                    pageSize: 10
                },
                //字段验证规则
                rules: {
                    functionName: [
                        {required: true, message: "函数名称不能为空", trigger: "blur"}
                    ],
                    returnType: [
                        {required: true, message: "函数返回类型必选", trigger: "change"}
                    ]
                },
                //总条目数
                total: 0,
                //函数实体
                functiondata: {
                    id: 0,
                    functionName: '',
                    functionDesc: '',
                    functionContent: '',
                    quoteEntities: '',
                    returnType: '',
                    functionParamterDesc: '',
                    usageExample: '',
                    groupId: '',
                    groupName: ''
                },
                //是否允许编辑
                disableedit: false,
                //打开关闭编辑对话框
                addoreditdialog: false,
                //模板数据
                templateinfo: {
                    id: 0,
                    content: ''
                },
                //模板数据列表
                templatelist: [],
                //函数返回值下拉框选项
                returnTypeOptions: [],
                //引用列表
                quotelist: [],
                //引用总数
                quotetotal: 0,
                //引用查询参数
                quoteparams: {
                    type: 2,
                    pageIndex: 1,
                    pageSize: 10
                },
                //引用弹框
                quotedialog: false,
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
                },
                //引用框标题
                dialogtitle: '',
                grouplist: []
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
        methods: {
            loadData() {
                this.loading = true;
                getAllFunction(this.queryParams).then((res) => {
                    this.functionlist = res.data.list;
                    this.queryParams.pageIndex = res.data.pageNum;
                    this.queryParams.pageSize = res.data.pageSize;
                    this.total = res.data.total;
                    this.loading = false;
                });
            },
            watchDetail(id, type) {
                console.log(id);
                var params = {id: id}
                getFunction(params).then((res) => {
                    this.functiondata = res.data.functionModel;
                    this.quoteentitylist = res.data.quoteEntities;
                });
                if (type === 1) {
                    this.disableedit = true;
                } else {
                    this.disableedit = false;
                }
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
            //添加按钮
            handleAdd() {
                this.functiondata = {
                    id: 0,
                    templateName: '',
                    templateDesc: '',
                    quoteEntities: '',
                    canChanged: '',
                    templateContent: '',
                    quoteFunctions: ''
                }
                this.templateinfo =
                    {
                        id: 0,
                        content: ''
                    };
                //引用实体集合
                this.quoteentitylist = [];
                this.disableedit = false;
                this.addoreditdialog = true;
            },
            //取消实体引用
            handleCloseEntity(entity) {
                this.$confirm('删除引用实体可能造成模板错误, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var entityarry = this.functiondata.quoteEntities.split(',');
                    entityarry.splice(entityarry.indexOf(entity.id), 1);
                    this.functiondata.quoteEntities = entityarry.join(',');
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
                if (this.quoteparams.type === 2) {
                    //实体
                    const entityarry = this.functiondata.quoteEntities.split(',')
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
                        if (this.functiondata.quoteEntities == '') {
                            this.functiondata.quoteEntities += idsStr;
                        } else {
                            this.functiondata.quoteEntities += ',' + idsStr;
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
                this.functiondata.functionContent = instance
            },
            //新增或者编辑确认
            addoredittemplate() {
                this.$refs["postform"].validate(valid => {
                    if (valid) {
                        if (this.functiondata.id > 0) {
                            editFunction(this.functiondata).then((res) => {
                                this.addoreditdialog = false;
                                this.$message({
                                    message: '更新成功',
                                    type: 'success'
                                });
                            })
                        } else {
                            addFunction(this.functiondata).then((res) => {
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
            // 取消按钮
            cancel() {
                this.addoreditdialog = false;
                this.reset();
            },
            reset() {
                this.functiondata = {
                    id: 0,
                    functionName: '',
                    functionDesc: '',
                    functionContent: '',
                    quoteEntities: '',
                    returnType: '',
                    functionParamterDesc: '',
                    usageExample: '',
                    groupId: '',
                    groupName: ''
                }
            },
            querygroup() {
                selectGroupList().then((res) => {
                    this.grouplist = res.data;
                })
            }
        },
        created() {
            this.loadData();
            this.getDicts("function_return").then(response => {
                this.returnTypeOptions = response.data;
            });
            this.querygroup();
        }
    }
</script>

<style scoped>
    .el-dialog-style {
        width: 40%;
    }
</style>
