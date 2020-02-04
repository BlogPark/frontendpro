<template>
    <div style="min-height: 100%">
        <el-container style="min-height: 100%; border: 1px  #eee">
            <sidebar/>
            <el-container>
                <el-header style="font-size: 12px;height: 60px">
                    <navbar/>
                </el-header>
                <tagsview/>
                <el-main>
                    <dmain/>
                </el-main>
                <el-footer>
                    <dfooter/>
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import sidebar from "@/layout/sidebar"
    import navbar from "@/layout/navbar"
    import dmain from "@/layout/main"
    import dfooter from "@/layout/footer"
    import tagsview from "@/layout/tagsview/tagsview.vue"

    export default {
        name: "layout",
        components: {
            navbar,
            sidebar,
            dmain,
            dfooter,
            tagsview
        }
    }
</script>

<style scoped>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-main {
        padding: 5px 25px;
        position:relative;
        width:100%;
        min-height:100%;
        padding-bottom: 60px;
        box-sizing: border-box;
    }
    .el-footer{
        width: 100%;
        height:100px;   /* footer的高度一定要是固定值*/
        position:absolute;
        bottom:0px;
        background: #B3C0D1;
    }
</style>
