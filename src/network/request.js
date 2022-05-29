import axios from "axios";

export function request(config) {

    // 1.创建axios实例
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/hy66',
        timeout: 5000
    });

    // 2.axios拦截器
    // 2.1拦截请求(在发送网络请求前对config进行一些处理)
    instance.interceptors.request.use(
        // 拦截成功,拦截到的是config,
        config => {
            // console.log(config);
            // 1.比如config的一些信息不符合服务器的要求
            // 2.比如每次发送网络请求时都希望在界面中显示一个请求图标
            // 3.某些网络请求(比如登录要带token)必须携带一些特殊的信息

            // 拦截完之后要把config给返回出去,不然就无法完成请求
            return config
        }, err => {}
    );
    // 拦截响应(对请求返回的数据进行处理)
    instance.interceptors.response.use(res => {
        // console.log(res);
        // 拦截完之后要把res返回出去,不然在main.js中就无法拿到数据
        return res.data
    }, err => {
        // console.log(err);
    });

    // 3.发送真正的网络请求
    // 在axios源码中这个instance就是一个promise所以不需要再封装一个额外的promise
    return instance(config)
}