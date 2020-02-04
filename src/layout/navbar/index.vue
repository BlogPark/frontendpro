<template>
    <el-row>
        <el-col :offset="12" :span="9">
            <div>
                顶部区域{{this.$store.state.count}}
            </div>
        </el-col>
        <el-col :span="2">
            <div class="vcenter">
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                        站内消息<i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item class="clearfix">
                            评论
                            <el-badge :value="12" class="mark"/>
                        </el-dropdown-item>
                        <el-dropdown-item class="clearfix">
                            回复
                            <el-badge :value="3" class="mark"/>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-col>
        <el-col :span="1">
            <div class="vcenter">
                <el-dropdown trigger="hover">
                    <span class="el-dropdown-link" style="height: 40px">
                         <el-avatar size="40"
                                    src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                    </span>
                    <el-dropdown-menu placement="bottom-start" slot="dropdown">
                        <el-dropdown-item class="clearfix">
                            设置
                        </el-dropdown-item>
                        <el-dropdown-item class="clearfix">
                            退出登陆
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "navbar"
    }
</script>

<style scoped>
    .vcenter {
        text-align: center;
    }
</style>
