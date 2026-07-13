import axios from 'axios';
import { useUserStore } from '@/store/useUserStore';

// 接口地址都以/api开始
// axios.defaults.baseURL = 'http://localhost:5173/api'
// axios.defaults.baseURL = 'http://localhost:3000/api'
const instance = axios.create({
  // baseURL: 'http://localhost:5173/api'
  baseURL: 'http://localhost:3000/api'
});
 
instance.interceptors.request.use(config => {
  const  token  = useUserStore.getState().accessToken;
  // console.log(token, '????');
  // 
  // console.log(store, '/////////');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config
})
// axios.defaults.baseURL = 'http://douyin.com:5173/api'
// 拦截器
// axios api 请求大管家 关于请求的一切都会给我们
// data 只是其中一项
// 成功的响应， 
// 失败的响应
// 标记是否正在刷新token 
// refresh token + redo requests
let isRefreshing = false;
// 请求队列， refresh 中， 在并发的请求再去发送没有意义
// 保存下来，存到一个队列中， 无缝的将之前的所有失败的请求，再请求，带上新token 成功
let requestsQueue: any[] = []; 

instance.interceptors.response.use(res => {
  console.log('/////////')
  // if (res.status != 200) {
  //   console.log('出错了');
  //   return;
  // }
  return res.data
}, async (err) => {
  // console.log(err, "99999999999999");
  // 请求对象的config 
  const { config, response } = err;
  // console.log(config, response, "?????");
  // _retry 刻意标记 是否是重试的请求， 避免retry 死循环
  if (response?.status === 401 && !config._retry) {
    // 如果在刷新中,  把后续请求放到队列中
    if (isRefreshing) {
      // 异步， 未来token refresh 后， 再resolve 
      return new Promise((resolve) => {
        requestsQueue.push((token: string) => {
          config.headers.Authorization = `Bearer ${token}`;
          resolve(instance(config));
        })
      })
    }
    config._retry = true; // retry 开关 
    isRefreshing = true;

    try {
    // refresh
      const { refreshToken } = useUserStore.getState();
      if (refreshToken) {
        // 无感刷新token
        const { access_token, refresh_token} = await instance.post('/auth/refresh', {
          refresh_token: refreshToken
        })
        // console.log(res, "?????????????????");
        useUserStore.setState({
          accessToken: access_token,
          refreshToken: refresh_token,
          isLogin: true
        });

        requestsQueue.forEach((callback) => callback(access_token));
        requestsQueue = [];
        // 当前请求
        config.headers.Authorization = `Bearer ${access_token}`;
        return instance(config);
      }
    } catch(err) {
      useUserStore.getState().logout();
      window.location.href='/login';
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
  return Promise.reject(err);
  // 刷新token 
})

export default instance