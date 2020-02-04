<template>
    <el-aside width="200px" style="background-color: rgb(238, 241, 246);min-height: 100%">
        <div class="weblogo">
            DEMO
        </div>
        <el-scrollbar wrap-class="scrollbar-wrapper" >
            <el-menu
                    default-active="0"
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                <el-menu-item index="0" key="index">
                    <i class="el-icon-s-home"></i>
                    <span>首页</span>
                </el-menu-item>
                <template v-for="(item,index) in menus" :index="item.id">
                    <template v-if="item.childCount>0">
                        <el-submenu :index="index+1+''" :key="item.id">
                            <template slot="title">
                                <i :class="item.menuIcon"></i>
                                <span>{{item.menuName}}</span>
                            </template>
                            <el-menu-item class="menuitems" v-for="subItem in item.childMenus" :key="subItem.id" :index="subItem.id+''">
                               <span class="childmenu">{{ subItem.menuName }}</span>
                            </el-menu-item>
                        </el-submenu>
                    </template>
                    <template v-else>
                        <el-menu-item :index="index+1+''" :key="item.id">
                            <i :class="item.menuIcon"></i>
                            <span>{{item.menuName}}</span>
                        </el-menu-item>
                    </template>
                </template>
            </el-menu>
        </el-scrollbar>
    </el-aside>
</template>

<script>
    import {getmenus} from "@/api/systemapi"

    export default {
        name: "sidebar",
        data() {
            return {
                openedTab: '',
                menus: []
            }
        },
        methods: {
            getMenu: function () {
                console.log('开始执行');
                getmenus().then((response) => {
                    console.log(response)
                    this.menus = response;
                })
            },
            clickMenu(componentName) {
                this.openedTab = this.$store.state.openedTab
                // tabNum 为当前点击的列表项在openedTab中的index，若不存在则为-1
                let tabNum = this.openedTab.indexOf(componentName)
                console.log(tabNum)
                console.log(this.openedTab)
                console.log(this.$store.state.openedTab)
                if (tabNum === -1) {
                    // 该标签当前没有打开
                    // 将componentName加入到已打开标签页state.openedTab数组中
                    this.$store.commit('addTab', {
                        title: componentName,
                        name: componentName,
                        allowclose: true,
                        type: 'info'
                    })
                } else {
                    // 该标签是已经打开过的，需要激活此标签页
                    this.$store.commit('changeTab', componentName)
                }
            }
        },
        created() {
            this.getMenu();
        }
    }
</script>

<style scoped>
    aside {
        color: #333;
        padding: 0px;
    }

    .weblogo {
        background-color: #C7C7E2;
        height: 60px;
        line-height: 60px;
        color: black;
    }
    .childmenu{
        color: rgb(191, 203, 217);
    }
    .el-submenu__title{
        font-size: 16px;
    }
    .menuitems{
        min-width: 190px;
    }
</style>
