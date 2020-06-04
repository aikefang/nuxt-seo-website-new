const state = {
  bannerList: [],
  navList: [],
  recommendCategoryList: [],
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
