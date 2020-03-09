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
                    align="left" class-name="small-padding fixed-width"
                    label="操作">
                <template slot-scope="scope">
                    <el-button @click="openEdit(scope.row.id)" icon="el-icon-edit" size="small" type="text">编辑
                    </el-button>
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
        <el-dialog :title="title" :visible.sync="addoreditdislog" width="30%">
            <el-form :model="groupdata" :rules="rules" label-width="80px" ref="postform">
                <el-form-item label="分组名称" prop="groupName">
                    <el-input placeholder="请输入分组名称" v-model="groupdata.groupName"/>
                </el-form-item>
                <el-form-item label="分组类型" prop="groupType">
                    <el-select placeholder="请选择" v-model="groupdata.groupType">
                        <el-option
                                :key="dict.dictValue"
                                :label="dict.dictLabel"
                                :value="dict.dictLabel"
                                v-for="dict in typeOptions"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分组描述">
                    <el-input placeholder="请输入分组描述" type="textarea" v-model="groupdata.groupDesc"></el-input>
                </el-form-item>
            </el-form>
            <div class="dialog-footer" slot="footer">
                <el-button @click="addoreditgroup" type="primary">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {addNewGroup, getAllGroup, getSingleGroup, updateGroup} from '@/api/business/droolsapi'

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
                addoreditdislog: false,
                //规则列表
                grouplist: [],
                //分组类型
                typeOptions: [],
                //查询条件
                paramQuery: {
                    groupName: '',
                    id: 0,
                    pageIndex: 1,
                    pageSize: 10
                },
                groupdata: {
                    groupName: '',
                    id: 0,
                    groupType: '',
                    groupDesc: ''
                },
                //数据总条数
                total: 0,
                //dialog标题
                title: '',
                rules: {
                    groupName: [
                        {required: true, message: "分组名称不能为空", trigger: "blur"}
                    ],
                    groupType: [
                        {required: true, message: "分组类型不能为空", trigger: "change"}
                    ]
                }
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
            handleAdd() {
                this.groupdata = {
                    id: 0,
                    groupName: '',
                    groupType: '',
                    groupDesc: ''
                }
                this.addoreditdislog = true;
            },
            openEdit(id) {
                console.log(id);
                var idparamter = {
                    id: id
                }
                getSingleGroup(idparamter).then((res) => {
                    this.groupdata.groupName = res.groupName;
                    this.groupdata.groupType = res.groupType;
                    this.groupdata.id = res.id;
                    this.groupdata.groupDesc = res.groupDesc;
                });
                this.addoreditdislog = true;
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
            },
            // 取消按钮
            cancel() {
                this.addoreditdislog = false;
                this.reset();
            },
            reset() {
                this.groupdata = {
                    id: 0,
                    groupName: '',
                    groupType: '',
                    groupDesc: ''
                }
            },
            addoreditgroup() {
                this.$refs["postform"].validate(valid => {
                    if (valid) {
                        if (this.groupdata.id > 0) {
                            updateGroup(this.groupdata).then((res) => {
                                console.log(res);
                                this.addoreditdislog = false;
                                this.$message({
                                    message: '更新成功',
                                    type: 'success'
                                });
                            })
                        } else {
                            addNewGroup(this.groupdata).then((res) => {
                                console.log(res);
                                this.addoreditdislog = false;
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                            })
                        }
                        this.handleQuery();
                    }
                });
            }
        },
        created() {
            this.loadData();
            this.getDicts("drools_group_type").then(response => {
                this.typeOptions = response.data;
            });

        }
    }
</script>

<style scoped>
    .el-dialog-style {
        width: 40%;
    }
</style>
