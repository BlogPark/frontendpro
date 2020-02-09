<template>
    <div class="gray-bg">
        <div class="middle-box text-center loginscreen  animated fadeInDown">

            <div class="webtitle">
                <h1 class="logo-name">大数据监控系统</h1>
            </div>
            <el-form>
                <el-form-item>
                    <el-input
                            placeholder="请输入用户名"
                            v-model="username"
                            clearable>
                    </el-input>

                </el-form-item>
                <el-form-item>
                    <el-input placeholder="请输入密码" v-model="userpwd" show-password></el-input>
                </el-form-item>
                <el-button type="success" class="btn btn-primary block full-width m-b" round>登 录</el-button>
                <p class="text-muted text-right"><a href="login.html#">
                    忘记密码了？
                </a>
                </p>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                username:'',
                userpwd:''
            }
        }
    }
</script>

<style scoped>
    @import "../../assets/css/style.css";

    .text-right {
        text-align: right;
    }
    .webtitle{
        padding-bottom: 30px;
    }
</style>
