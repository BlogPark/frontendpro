<template>
    <div>
        <h1>传入的订单ID为：{{ ordercode}}</h1>
    </div>
</template>

<script>
    export default {
        name: "orderdetail",
        data() {
            return {
                ordercode: this.$route.params.orderCode
            }
        }
    }
</script>

<style scoped>

</style>