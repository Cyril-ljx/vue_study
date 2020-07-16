// import Vue from 'vue';

import router from "./index.js";

//白名单white
const whiteList = ['/login'];
//将导航守卫挂载到$router\
// BAD
router.beforeEach((to, from, next) => {
    // console.log(to,from);
    if (whiteList.indexOf(to.path) !== -1) {
        next()
    } else {

        const token = window.sessionStorage.getItem('token');
        if (token) {
            next()
        } else {
            next('/')
        }
    }

});