<template>
    <div class="app-container">
        <el-form :inline="true" :model="queryParams" ref="queryForm">
            <el-form-item label="产品名称" prop="productName">
                <el-input
                        @keyup.enter.native="handleQuery"
                        clearable
                        placeholder="请输入产品名称"
                        size="small"
                        style="width: 240px"
                        v-model="queryParams.productName"
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
                :data="productList"
                v-loading="loading">
            <el-table-column
                    label="产品编码"
                    prop="productCode"
                    width="250">
            </el-table-column>
            <el-table-column
                    label="产品名称"
                    prop="productName"
                    width="350">
            </el-table-column>
            <el-table-column
                    label="所属包名"
                    prop="blogPackage"
                    width="300">
            </el-table-column>
            <el-table-column
                    label="当前版本号"
                    prop="versionCode" width="180">
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
                    <el-button @click="editDetail(scope.row.id)" icon="el-icon-edit" size="small" type="text">编辑
                    </el-button>
                    <el-button @click="editDetail(scope.row.id)" icon="el-icon-edit" size="small" type="text">编译规则
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
        <el-dialog :visible.sync="addAndEditDialog" title="产品详情" width="40%">
            <el-form :model="productData" :rules="rules" label-width="120px" ref="postform">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="产品编码" prop="productCode">
                            <el-input :disabled="disableedit" placeholder="请输入产品编码"
                                      v-model="productData.productCode"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="产品名称" prop="productName">
                            <el-input :disabled="disableedit" placeholder="请输入产品名称"
                                      v-model="productData.productName"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="当前版本" prop="versionCode">
                            <el-input :disabled="disableedit" placeholder="请输入版本编码"
                                      v-model="productData.versionCode"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所属包名" prop="blogPackage">
                            <el-input :disabled="disableedit" placeholder="请输入包名"
                                      v-model="productData.blogPackage"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="规则文件地址" prop="ruleFilePath">
                            <el-input :disabled="disableedit" placeholder="请输入包名"
                                      v-model="productData.ruleFilePath"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="配置规则" prop="quoteRules">
                            <el-input :disabled="disableedit" v-model="productData.quoteRules" v-show="false"/>
                            <el-button @click="openquotedialog(3)" class="button-new-tag" size="small"
                                       v-show="!disableedit">+
                                添加新规则
                            </el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <draggable :list="quoteRuleList" :set-data="setData" class="dragArea" group="article">
                            <div :key="rule.id" class="list-complete-item" v-for="(rule,index) in quoteRuleList">
                                <div class="list-complete-item-handle">
                                    [{{ index+1 }}] {{ rule.ruleCode }} {{ rule.ruleName }}
                                </div>
                                <div style="position:absolute;right:0px;">
                                         <span @click="deleteEle(rule)"
                                               style="float: right ;margin-top: -16px;margin-right:5px;">
                                         <i class="el-icon-delete" style="color:#ff4949"/>
                                          </span>
                                </div>
                            </div>
                        </draggable>
                    </el-col>
                </el-row>
            </el-form>
            <div class="dialog-footer" slot="footer" v-show="!disableedit">
                <el-button type="primary" @click="saveData">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
            <div align="center" class="dialog-footer" slot="footer" v-show="disableedit">
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
        addProduct,
        editProduct,
        getProductList,
        selectSingleProduct,
        getquotelist,
        getrulelistbyids
    } from '@/api/business/droolsapi'
    import draggable from 'vuedraggable'

    export default {
        name: "productList",
        components: {draggable},
        created() {
            this.loadData();
        },
        data() {
            return {
                //查询参数
                queryParams: {
                    productName: '',
                    productCode: '',
                    id: '',
                    pageIndex: 1,
                    pageSize: 10
                },
                //是否显示加载
                loading: false,
                //产品列表
                productList: [],
                //总条目数
                total: 0,
                //产品模型
                productData: {
                    id: '',
                    productCode: '',
                    productName: '',
                    versionCode: '',
                    ruleFilePath: '',
                    blogPackage: '',
                    quoteRules: ''
                },
                //引用规则列表
                quoteRuleList: [],
                //显示添加编辑对话框
                addAndEditDialog: false,
                //允许编辑
                disableedit: false,
                //引用对话框
                quotedialog: false,
                dialogtitle: '',
                //引用总数
                quotetotal: 0,
                //引用查询参数
                quoteparams: {
                    type: 1,
                    pageIndex: 1,
                    pageSize: 10
                },
                //引用列表
                quotelist: [],
                //表单验证
                rules: {}

            }
        },
        methods: {
            loadData() {
                this.loading = true;
                getProductList(this.queryParams).then((res) => {
                    this.productList = res.list
                    this.total = res.total
                    this.queryParams.pageIndex = res.pageNum
                    this.queryParams.pageSize = res.pageSize
                    this.loading = false;
                })
            },
            handleQuery() {
                this.queryParams.pageIndex = 1;
                this.loadData();
            },
            resetQuery() {
                this.resetForm("queryForm");
                this.handleQuery();
            },
            handleAdd() {
                this.productData = {
                    id: '',
                    productCode: '',
                    productName: '',
                    versionCode: '',
                    ruleFilePath: '',
                    blogPackage: '',
                    quoteRules: ''
                }
                this.quoteRuleList = []
                this.addAndEditDialog = true
            },
            watchDetail(id) {
                var param = {
                    id: id
                }
                selectSingleProduct(param).then((res) => {
                    this.productData = res.product
                    this.quoteRuleList = res.rules
                })
                this.disableedit = true
                this.addAndEditDialog = true
            },
            editDetail(id) {
                var param = {
                    id: id
                }
                selectSingleProduct(param).then((res) => {
                    this.productData = res.product
                    this.quoteRuleList = res.rules
                })
                this.disableedit = false
                this.addAndEditDialog = true
            },
            setData(dataTransfer) {
                // to avoid Firefox bug
                // Detail see : https://github.com/RubaXa/Sortable/issues/1012
                dataTransfer.setData('Text', '')
            },
            deleteEle(ele) {
                this.$confirm('确认要删除该规则?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var entityarry = this.productData.quoteRules.split(',');
                    entityarry.splice(entityarry.indexOf(ele.id + ''), 1);
                    this.productData.quoteRules = entityarry.join(',');
                    this.quoteRuleList.splice(this.quoteRuleList.indexOf(ele), 1);
                }).catch(() => {
                });
                //
                // for (const item of this.quoteRuleList) {
                //     if (item.id === ele.id) {
                //         const index = this.quoteRuleList.indexOf(item)
                //         this.quoteRuleList.splice(index, 1)
                //         break
                //     }
                // }
                console.log(this.quoteRuleList)
            },
            //打开添加引用窗体
            openquotedialog(type) {
                //添加函数引用
                this.dialogtitle = '规则列表';
                if (type !== 0) {
                    this.quoteparams.type = type;
                }
                getquotelist(this.quoteparams).then((res) => {
                    this.quotelist = res.list;
                    this.quotetotal = res.total;
                });
                this.quotedialog = true;
            },
            //确认添加
            addquote() {
                var newids = [];
                if (this.quoteparams.type === 3) {
                    if(this.quoteRuleList==null){
                        this.quoteRuleList=[]
                    }
                    const rulearry = this.productData.quoteRules.split(',')
                    this.ids.forEach(item => {
                        if (rulearry.indexOf(item.toString()) < 0) {
                            newids.push(item);
                        }
                    })
                    console.log(newids)
                    if (newids.length > 0) {
                        const idsStr = newids.join(',');
                        const postdata = {idList: newids}
                        //函数
                        getrulelistbyids(postdata).then((res) => {
                            this.quoteRuleList = this.quoteRuleList.concat(res);
                        });
                        if (this.productData.quoteRules == '') {
                            this.productData.quoteRules += idsStr;
                        } else {
                            this.productData.quoteRules += ',' + idsStr;
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
            // 取消按钮
            cancel() {
                this.addAndEditDialog = false;
                //this.reset();
            },
            reset() {
                this.productData = {
                    id: '',
                    productCode: '',
                    productName: '',
                    versionCode: '',
                    ruleFilePath: '',
                    blogPackage: '',
                    quoteRules: ''
                }
            },
            saveData() {
                if (this.productData.id > 0) {
                    console.log('修改信息')
                } else {
                    console.log('添加信息')
                }
                this.addAndEditDialog = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .dndList {
        background: #fff;
        padding-bottom: 40px;

        &:after {
            content: "";
            display: table;
            clear: both;
        }

        .dndList-list {
            float: left;
            padding-bottom: 30px;

            &:first-of-type {
                margin-right: 2%;
            }

            .dragArea {
                margin-top: 15px;
                min-height: 50px;
                padding-bottom: 30px;
            }
        }
    }

    .list-complete-item {
        cursor: pointer;
        position: relative;
        font-size: 14px;
        padding: 5px 12px;
        margin-bottom: 5px;
        border: 1px solid #bfcbd9;
        transition: all 1s;
        background-color: aliceblue;
    }

    .list-complete-item-handle {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-right: 50px;
    }

    .list-complete-item-handle2 {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-right: 20px;
    }

    .list-complete-item.sortable-chosen {
        background: #4AB7BD;
    }

    .list-complete-item.sortable-ghost {
        background: #30B08F;
    }

    .list-complete-enter,
    .list-complete-leave-active {
        opacity: 0;
    }
</style>
