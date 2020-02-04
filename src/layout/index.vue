<template>
    <div style="height: 100%">
        <el-container style="height:100%;border: 1px  #eee">
            <sidebar/>
            <el-container direction="vertical">
                <el-header style="height: 40px">
                    <navbar/>
                </el-header>
                <el-main>
                    <el-scrollbar>
                        <dmain/>
                    </el-scrollbar>
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

    export default {
        name: "layout",
        components: {
            navbar,
            sidebar,
            dmain,
            dfooter
        }
    }
</script>

<style scoped>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 40px;
        font-size: 14px;
        height: 40px;
        text-align: right;
        padding: 0px 30px 0px 0px;
    }

    .el-main {
        padding: 5px 25px 0px 25px;
        width: 100%;
        height: 100%;
        margin-bottom: 70px;
    }

    .el-footer {
        width: 100%;
        height: 100px; /* footer的高度一定要是固定值*/
        position: absolute;
        left: 0px;
        bottom: 0px;
        background: #B3C0D1;
    }
</style>
