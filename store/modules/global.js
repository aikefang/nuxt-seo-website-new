const state = {
  bannerList: [],
  navList: [],
  recommendCategoryList: [],
  userInfo: {}
}

const mutations = {
  setBannerList: (state, list) => {
    state.bannerList = list
  },
  setNavList: (state, list) => {
    state.navList = list
  },
  setRecommendCategoryList: (state, list) => {
    state.recommendCategoryList = list
  },
  setUserInfo: (state, data) => {
    state.userInfo = data
  },
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
