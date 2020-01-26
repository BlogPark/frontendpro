<template>
    <div>
        <h3>订单列表页面</h3>
        <el-button @click="addNumber()">增加计数</el-button>
    </div>
</template>

<script>
    export default {
        name: "orderlist",
        methods: {
            addNumber() {
                this.$store.commit("addcount", 100);
            }
        }
    }
</script>

<style scoped>

</style>
