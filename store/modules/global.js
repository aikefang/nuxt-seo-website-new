const state = () => {
  return {
    bannerList: [],
    navList: [],
    hotArticleList: [],
    recommendCategoryList: [],
    userInfo: {},
    navStatus: 'index',
  }
}

const mutations = {
  setBannerList: (state, list) => {
    state.bannerList = list
  },
  setHotArticleList: (state, list) => {
    state.hotArticleList = list
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
  setNavStatus(state, data) {
    state.navStatus = data
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
