<template>
    <div style="height: 100%">
        <el-container style="height: 100%">
            <el-aside :width="!menuCollapse?'200px':'64px'">
                <!--菜单栏-->
                <el-menu
                        :default-active="activeMenu"
                        router
                        :collapse="menuCollapse"
                        class="el-menu-vertical-demo"
                        background-color="#2E4056"
                        text-color="#9fcbd9"
                        active-text-color="#2D5F9E">
                    <el-menu-item index="/welcome">首页</el-menu-item>
                    <!--一级子菜单-->
                    <el-submenu :index="formatPath(null,item.name)" v-for="item in firstMenus" :key="item.id">
                        <!--一级子菜单标题-->
                        <template slot="title">
                            <i class="el-icon-location"/>
                            <span>{{item.title}}</span>
                        </template>
                        <!--二级子菜单-->
                        <el-menu-item :index="formatPath(item.name,subItem.name)"
                                      v-for="subItem in secondMenus(item.id)" :key="subItem.id">{{subItem.title}}
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header>
                    <el-button :icon="!menuCollapse?'el-icon-s-fold':'el-icon-s-unfold'"
                               @click="menuCollapse=!menuCollapse"/>
                    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
       <el-avatar :src="loginUser.icon"/>
        欢迎：{{loginUser.username}}
        <i class="el-icon-arrow-down el-icon--right"/>
      </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="change">修改密码</el-dropdown-item>
                            <el-dropdown-item command="quit">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-header>
                <el-main>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    // @ is an alias to /src
    // import HelloWorld from "@/components/HelloWorld.vue";
    import {api_logout, api_info} from '../api/admin.js'

    export default {
        data() {
            return {
                menuCollapse: false,
                activeMenu: '',
                loginUser: {
                    username: '',
                    icon: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                },
                menus: []
            }
        },
        filter: {},
        computed: {
            firstMenus() {
                return this.menus.filter(item => item.parentId === 0)
            },
            secondMenus() {
                return parentId => this.menus.filter(item => item.parentId === parentId)
            },
        },
        mounted() {
            this.activeMenu = window.sessionStorage.getItem('activeMenu');
            if (!this.activeMenu) {
                this.activeMenu = '/welcome'
            }
            this.getInfo()
        },
        watch: {
            $route(to) {
                // console.log(to)
                this.selectMenu(to.path)
            }
        },
        methods: {
            async getInfo() {
                const {data: res} = await api_info();
                if (res) {
                    this.loginUser.icon = res.data.icon;
                    this.loginUser.username = res.data.username;
                    this.menus = res.data.menus
                }
            },
            formatPath(folder, name) {
                name = '/' + name
                if (folder) {
                    name = '/' + folder+name
                }
                return name
            },
            selectMenu(index,) {
                console.log(index);
                // console.log(indexPath);
                this.activeMenu = index;
                window.sessionStorage.setItem('activeMenu', index)
            },
            handleCommand(command) {
                console.log(command);
                if (command === 'quit') {
                    this.handleLogout()
                }
            },
            async handleLogout() {
                const {data: res} = await api_logout();
                if (res.code !== 200) {
                    //退出失败
                    this.message.error(res.message);
                    return
                }
                //退出成功
                //清除session
                window.sessionStorage.clear();
                //跳转到登录页面
                this.$router.replace('/login')
            }
        }
    };
</script>
<style>
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }

    .el-menu {
        border: none;
    }

    .menu-second {
        background-color: #1f2d3d !important;
    }

    .menu-second:hover {
        background-color: #001528 !important;
    }

    .el-menu > .el-menu-item, .el-submenu > .el-submenu__title {
        text-align: left;
    }


    .el-icon-arrow-down {
        font-size: 12px;
    }

    .el-menu {
        border: none;
    }

    .el-header {
        background-color: #ffffff;
        text-align: center;
        line-height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: solid 1px;
        border-bottom-color: #E9EEF3;
    }

    .el-avatar {
        position: relative;
        top: 12px;
    }

    .el-aside {
        background-color: #2E4056;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: left;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

</style>
