import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: "/login" //注意是转发的路径
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/home",
        name: "Home",
        redirect:'/welcome',
        //懒加载，使用到的时候回加载
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/Home.vue"),
        children: [
            {
                path: "/about",
                name: "About",
                component: () =>
                    import(/* webpackChunkName: "about" */ "../views/About.vue")
            },
            {
                path: "/welcome",
                name: "Welcome",
                //懒加载，使用到的时候回加载
                component: () =>
                    import("../views/Welcome.vue")
            },
            {
                path: "/pms/product",
                name: "Product",
                //懒加载，使用到的时候回加载
                component: () =>
                    import("../views/pms/Product.vue")
            }
        ]
    }
];
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};


const router = new VueRouter({
    routes
});

export default router;
