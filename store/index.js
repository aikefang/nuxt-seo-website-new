import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})
const createStore = () => {
  return new Vuex.Store({
    strict: false,
    modules,
    getters,
    actions: {
      async nuxtServerInit ({ commit }, { req, $axios, store, redirect, route }) {
        const [
          userInfo,
          navList,
          bannerList,
          recommendCategoryList,
        ] = await Promise.all([
          $axios.get('/api/biji/user/info'),
          $axios.get('/api/biji/nav/list'),
          $axios.get('/api/biji/banner/list', {
            params: {
              imageMogr2: true
            }
          }),
          $axios.get('/api/biji/category/list', {
            params: {
              type: 'hot'
            }
          }),
        ])
        if(userInfo.status === 200 && userInfo.data.userStatus === true) {
          store.commit('login/changeStatus', true)
          if (route.name === 'login') {
            const path = route.query.url || '/'
            redirect(path.toString())
          }
        }
        if(navList.status === 200) {
          store.commit('global/setNavList', navList.data.list)
        }
        if(bannerList.status === 200) {
          store.commit('global/setBannerList', bannerList.data.list)
        }
        if(recommendCategoryList.status === 200) {
          store.commit('global/setRecommendCategoryList', recommendCategoryList.data.list)
        }
      }
    }
  })
}
export default createStore
