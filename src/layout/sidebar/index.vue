<template>
    <el-aside style="background-color: rgb(238, 241, 246);min-height: 100%" width="200px">
        <div class="weblogo">
            DEMO
        </div>
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                    @close="handleClose"
                    @open="handleOpen"
                    active-text-color="#ffd04b"
                    background-color="#545c64"
                    class="el-menu-vertical-demo"
                    default-active="0"
                    text-color="#fff">
                <el-menu-item @click="clickmenu('/index')" index="0" key="index">
                    <i class="el-icon-s-home"></i>
                    <span>首页</span>
                </el-menu-item>
                <template :index="item.id" v-for="(item,index) in menus">
                    <template v-if="item.childCount>0">
                        <el-submenu :index="index+1+''" :key="item.id">
                            <template slot="title">
                                <i :class="item.menuIcon"></i>
                                <span>{{item.menuName}}</span>
                            </template>
                            <el-menu-item :index="subItem.id+''" :key="subItem.id"
                                          @click="clickmenu(subItem.menuRouter)"
                                          class="menuitems" v-for="subItem in item.childMenus">
                                <span class="childmenu">{{ subItem.menuName }}</span>
                            </el-menu-item>
                        </el-submenu>
                    </template>
                    <template v-else>
                        <el-menu-item :index="index+1+''" :key="item.id" @click="clickmenu(item.menuRouter)">
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
            handleOpen(key, keyPath) {
                console.log(keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            clickmenu(routerpath) {
                console.log(routerpath);
                this.$router.push({path: routerpath});
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
        margin: 0px;
    }

    .weblogo {
        background-color: #C7C7E2;
        height: 60px;
        line-height: 60px;
        color: black;
    }

    .childmenu {
        color: rgb(191, 203, 217);
    }

    .el-submenu__title {
        font-size: 16px;
    }

    .menuitems {
        min-width: 190px;
    }
</style>
