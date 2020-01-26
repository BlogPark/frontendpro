<template>
    <div>
        <navbar/>
        <h2>这里是布局页面,静态变量值目前是：{{$store.state.count}}</h2>
        <sidebar></sidebar>
        <router-view/>
    </div>
</template>

<script>
    import sidebar from "@/layout/sidebar"
    import navbar from "@/layout/navbar"

    export default {
        name: "layout",
        components: {
            navbar,
            sidebar
        }
    }
</script>

<style scoped>
    sidebar {
        width: 100%;
    }
</style>
