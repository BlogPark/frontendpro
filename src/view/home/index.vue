<template>
    <div>
        <h1>这里是首页</h1>
        <router-link to="login">点击这里去登录</router-link>
        <br/>
        <router-link :to="{name:'orderlist'}">点击这里去订单列表</router-link>
        <br/>
        <router-link :to="{name:'orderdetail',params:{orderCode:'001'}}">点击这里去订单详情</router-link>
        <el-row>
            <el-col :span="12">
                <zhexian/>
            </el-col>
            <el-col :span="12">
                <zhexian></zhexian>
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
    h1 {
        font-size: 24px;
        color: darkblue;
    }
</style>
