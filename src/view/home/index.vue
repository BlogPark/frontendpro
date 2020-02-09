<template>
    <div class="wrapper wrapper-content">
        <el-row>
            <el-col :span="6">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <span class="label label-success pull-right">月</span>
                        <h5>收入</h5>
                    </div>
                    <div class="ibox-content">
                        <h1 class="no-margins">40 886,200</h1>
                        <div class="stat-percent font-bold text-success">98% <i class="el-icon-upload2"></i>
                        </div>
                        <small>总收入</small>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <span class="label label-info pull-right">全年</span>
                        <h5>订单</h5>
                    </div>
                    <div class="ibox-content">
                        <h1 class="no-margins">275,800</h1>
                        <div class="stat-percent font-bold text-info">20% <i class="el-icon-top-right"></i>
                        </div>
                        <small>新订单</small>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <span class="label label-primary pull-right">今天</span>
                        <h5>访客</h5>
                    </div>
                    <div class="ibox-content">
                        <h1 class="no-margins">106,120</h1>
                        <div class="stat-percent font-bold text-navy">44% <i class="el-icon-top-right"></i>
                        </div>
                        <small>新访客</small>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <span class="label label-info pull-right">全年</span>
                        <h5>订单</h5>
                    </div>
                    <div class="ibox-content">
                        <!--<router-link to="login">点击这里去登录</router-link>-->
                        <!--<router-link :to="{name:'orderlist'}">点击这里去订单列表</router-link>-->
                        <!--<router-link :to="{name:'orderdetail',params:{orderCode:'001'}}">点击这里去订单详情</router-link>-->
                        <h1 class="no-margins">80,600</h1>
                        <div class="stat-percent font-bold text-danger">38% <i class="el-icon-bottom"></i>
                        </div>
                        <small>12月</small>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <div class="ibox float-e-margins">
                    <div class="ibox-content">
                        <zhexian/>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="ibox float-e-margins">
                    <div class="ibox-content">
                        <zhexian/>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <div class="ibox float-e-margins">
                    <div class="ibox-content">
                        <zhexian/>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="ibox float-e-margins">
                    <div class="ibox-content">
                        <zhexian/>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    import zhexian from '@/echarts/home/zhexian'
    import Zhexian from "../../echarts/home/zhexian";

    export default {
        name: "home",
        components: {Zhexian},
        zhexian
    }
</script>

<style scoped>
    @import "../../assets/css/style.css";

    h1 {
        font-size: 24px;
        color: darkblue;
    }

    .pull-right {
        float: right;
    }
</style>
