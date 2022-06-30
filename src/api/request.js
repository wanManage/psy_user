// import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui';
// import router from '@/router/index'
// 统一请求路径前缀

let base = '/api'
// 超时设定
axios.defaults.timeout = 150000

// service.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
//
/**
 * 请求前拦截
 * 用于处理需要在请求前的操作
 */
axios.defaults.withCredentials = true
axios.interceptors.request.use(
    config => {
        console.log(config.url)
        if (localStorage.getItem("token")) {
          config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
        }
        // config.headers.portal_token = window.sessionStorage.getItem('token')
        // for(let key in config.data){
                
        // }
        console.log(config)
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(response => {
    // const data = response.data;
    console.log("response")
    if(response.data.code == 500){
      Message.error(response.data.message)
    }
    console.log(response)
    return response;
  }, (err) => {
    console.log(err)
    // 返回状态码不为200时候的错误处理
    Message.error(err.toString());
    return Promise.resolve(err);
  });

// axios.interceptors.response.use(response => {
//     console.log("response")
//     console.log(response.data)
//     if([201, 200, 3001].indexOf(response.status)> -1){
//         if(response.data.data.code == 500){
//             console.log("请求成")
//             Message.error(response.data.message)
//         }
//         console.log("请求成功")
//     }else{
//         Message.error(response.message)
//     }
//     return response
// }, error => {
//     // console.log(error)
//     Message.error("请求失败")
//     return Promise.reject(error)
// })

export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        params: params
    })
}

export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        params: params
    })
}
export const getRequestver = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        params: params,
        responseType: 'arraybuffer'
    })
}
