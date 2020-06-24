import Cookie from 'js-cookie'
import { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
export default function (app: any) {
  const axios = app.$axios
  // 基本配置
  axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? 'http://localhost:2020' : 'https://v2.api.webascii.cn'
  axios.defaults.timeout = 10000
  axios.defaults.headers.post['Content-Type'] = 'application/json'
  axios.defaults.headers.patch['Content-Type'] = 'application/json'
  axios.defaults.headers.put['Content-Type'] = 'application/json'

  // 请求回调
  axios.onRequest((config: AxiosRequestConfig) => {
    const token = Cookie.get('SYSESSIONID') || ''
    config.headers.Authorization = `Bearer ${token}`
  })

  // 返回回调
  axios.onResponse((res: AxiosResponse) => {
        if (res.headers.refreshtoken) {
          Cookie.set('token', res.headers.refreshtoken)
        }
        if (res.status === 200) {
          return res.data
        }
      },
      (error: any) => {
        return Promise.reject(error);
      })

  // 错误回调
  axios.onError((error: AxiosError) => {
    // console.log(error)
    // switch (error.response.status) {
    //   case 401:
    //     location.href = '/login'
    //     break
    // }
  })
}
