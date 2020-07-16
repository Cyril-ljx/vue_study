<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>登录</span>
            </div>
            <el-form label-position="left" :rules="rules" ref="loginForm" :model="form" label-width="80px">
                <el-form-item label="账号" prop="username">
                    <el-input prefix-icon="el-icon-user" placeholder="请输入账号" v-model="form.username"/>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input prefix-icon="el-icon-s-goods"
                              placeholder="请输入密码"
                              v-model="form.password"
                              show-password
                    />
                </el-form-item>
                <el-form-item>
                    <el-checkbox label="记住密码"/>
                </el-form-item>

                <el-button-group>
                    <el-button type="primary" @click="login" :loading="isLoading">登录</el-button>
                    <el-button type="primary" @click="reset">重置</el-button>
                </el-button-group>

            </el-form>
        </el-card>
    </div>
</template>

<script>
    import {api_login} from '../api/admin.js'

    export default {
        data() {
            return {
                isLoading: false,
                form: {
                    username: "",
                    password: "",
                    rem: false
                },
                rules: {
                    username: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
                    ],
                }
            };
        },
        methods: {
            login() {
                this.isLoading = true;
                //1.验证表单
                this.$refs.loginForm.validate(async (valid) => {
                    if (!valid) {
                        console.log('验证失败');
                        return false;
                    }

                    //2.提交表单
                    const {data: res} = await api_login(this.form.username, this.form.password);
                    // console.log(res);
                    this.isLoading = false;
                    if (res.code !== 200) {
                        this.$message.error(res.message);
                        return true;
                    }
                    const data = res.data;
                    const token = data.tokenHead + data.token;
                    // if(valid){
                    //   alert('submit!');
                    // }else{
                    //   console.log('error submit!!');
                    //   return false;
                    // }
                    //3.保存token到sessionStorage
                    window.sessionStorage.setItem('token', token);//会话结束后，自动清除
                    //4.保存用户信息到vuex的store

                    //5.记住密码功能，登录将用户保存到cookies，cookie可设置过期时间
                    if (this.form.rem) {
                        this.$cookies.set('username', this.form.username, '7D');//默认是一天过期
                        this.$cookies.set('password', this.form.password, '7D')
                    } else {
                        this.$cookies.remove('username');
                        this.$cookies.remove('password')
                    }
                    //6.页面刷新或重新加载的时候从cookie中获取,在createed函数中
                    //7.跳转到主页面,编程式路由跳转
                    await this.$router.replace('/home')
                });

            },
            reset() {
                this.$refs['loginForm'].resetFields();
            }
        },
        created() {
            //获取cookies中的值
            this.form.username = this.$cookies.get('username');
            this.form.password = this.$cookies.get('password')
        }
    };
</script>

<style scoped>
    /*<!-- scoped表示该组件中的样式只是在该组件中实现 -->*/
    .box-card {
        width: 480px;
        margin: auto;
        transform: translateY(50%);
    }

    .el-button-group {
        width: 100%;
    }

    .el-button-group > .el-button {
        width: 50%;
    }
</style>
