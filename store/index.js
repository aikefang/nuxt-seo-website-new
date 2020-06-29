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
        ] = await Promise.all([
          $axios.get('/api/user/info'),
          $axios.get('/api/biji/nav/list')
        ])

        if(userInfo.status === 200 && userInfo.data.userStatus === true) {
          store.commit('login/changeStatus', true)
          store.commit('global/setUserInfo', userInfo.data.userInfo)
          if (route.name === 'login') {
            const path = route.query.url || '/'
            redirect(path.toString())
          }
        }
        if(navList.status === 200) {
          store.commit('global/setNavList', navList.data.list)
        }
      }
    }
  })
}
export default createStore
