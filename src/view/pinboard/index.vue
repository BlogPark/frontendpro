<template>
    <div class="wrapper wrapper-content">
        <el-row>
            <el-button type="success" icon="el-icon-plus" round class="pull-right" @click="dialogFormVisible=true ">添加新标签</el-button>
        </el-row>
        <el-row>
            <ul class="notes">
                <li>
                    <div>
                        <small>2014年10月24日(星期五) 下午5:31</small>
                        <h4>HTML5 文档类型</h4>
                        <p>Bootstrap 使用到的某些 HTML 元素和 CSS 属性需要将页面设置为 HTML5 文档类型。在你项目中的每个页面都要参照下面的格式进行设置。</p>
                        <a href="pin_board.html#"><i class="el-icon-delete"></i></a>
                    </div>
                </li>
                <li>
                    <div>
                        <small>2014年10月24日(星期五) 下午5:31</small>
                        <h4>移动设备优先</h4>
                        <p>在 Bootstrap 2 中，我们对框架中的某些关键部分增加了对移动设备友好的样式。而在 Bootstrap 3
                            中，我们重写了整个框架，使其一开始就是对移动设备友好的。这次不是简单的增……</p>
                        <a href="pin_board.html#"><i class="el-icon-delete "></i></a>
                    </div>
                </li>
                <li>
                    <div>
                        <small>2014年10月24日(星期五) 下午5:31</small>
                        <h4>排版与链接</h4>
                        <p>Bootstrap 排版、链接样式设置了基本的全局样式。分别是： 为 body 元素设置 background-color: #fff; 使用
                            @font-family-base、@font-size-base 和……。</p>
                        <a href="pin_board.html#"><i class="el-icon-delete "></i></a>
                    </div>
                </li>
                <li>
                    <div>
                        <small>2014年10月24日(星期五) 下午5:31</small>
                        <h4>Normalize.css</h4>
                        <p>为了增强跨浏览器表现的一致性，我们使用了 Normalize.css，这是由 Nicolas Gallagher 和 Jonathan Neal 维护的一个CSS 重置样式库。</p>
                        <a href="pin_board.html#"><i class="el-icon-delete "></i></a>
                    </div>
                </li>
                <li>
                    <div>
                        <small>2014年10月24日(星期五) 下午5:31</small>
                        <h4>布局容器</h4>
                        <p>Bootstrap 需要为页面内容和栅格系统包裹一个 .container 容器。我们提供了两个作此用处的类。注意，由于 padding 等属性的原因，这两种
                            容器类不能互相嵌套。</p>
                        <a href="pin_board.html#"><i class="el-icon-delete"></i></a>
                    </div>
                </li>
                <li>
                    <div>
                        <small>2014年10月24日(星期五) 下午5:31</small>
                        <h4>栅格系统</h4>
                        <p>Bootstrap 提供了一套响应式、移动设备优先的流式栅格系统，随着屏幕或视口（viewport）尺寸的增加，系统会自动分为最多12列。它包含了易于使用的预定义类，还有强大的mixin
                            用于生成更具语义的布局。</p>
                        <a href="pin_board.html#"><i class="el-icon-delete"></i></a>
                    </div>
                </li>
                <li>
                    <div>
                        <small>2014年10月24日(星期五) 下午5:31</small>
                        <h4>栅格系统</h4>
                        <p>Bootstrap 提供了一套响应式、移动设备优先的流式栅格系统，随着屏幕或视口（viewport）尺寸的增加，系统会自动分为最多12列。它包含了易于使用的预定义类，还有强大的mixin
                            用于生成更具语义的布局。</p>
                        <a href="pin_board.html#"><i class="el-icon-delete"></i></a>
                    </div>
                </li>
                <li v-for="item in pinboards" :key="item.id">
                    <div>
                        <small>{{item.createTime}}</small>
                        <h4>{{item.title}}</h4>
                        <p>{{item.content}}</p>
                        <a href="pin_board.html#"><i class="el-icon-delete"></i></a>
                    </div>
                </li>
            </ul>
        </el-row>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form">
                <el-form-item label="活动名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import {getpinboards} from "@/api/business/pinboardapi.js"

    export default {
        name: "index",
        data() {
            return {
                pinboards: [],
                dialogFormVisible: false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '150px'
            }
        },
        methods: {
            selectedPinBoard: function () {
                getpinboards().then((response) => {
                    console.log(response)
                    this.pinboards = response;
                });
            },
            opendialog:function () {
                    this.$prompt('请输入邮箱', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                        inputErrorMessage: '邮箱格式不正确'
                    }).then(({ value }) => {
                        this.$message({
                            type: 'success',
                            message: '你的邮箱是: ' + value
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消输入'
                        });
                    });
            }
        },
        created() {
            this.selectedPinBoard();
        }
    }
</script>

<style scoped>
    @import "../../assets/css/style.css";

    .pull-right {
        float: right;
        margin-right: 30px;
    }
</style>