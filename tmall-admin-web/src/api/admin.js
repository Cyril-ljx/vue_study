//登录相关的请求
import axios from '../plugins/http.js'

/*登入*/
export function api_login(username,password) {
    return axios.post('/admin/login',{
        username,password//ES6支持的写法
    })
}
/*登出*/
export function api_logout() {
    return axios.post('/admin/logout')
}
/*获取用户信息*/
export function api_info() {
    return axios.get('/admin/info')
}

