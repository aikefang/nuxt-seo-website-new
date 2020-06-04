import $axios from '@nuxtjs/axios'
const state = {
  articleList: [],
  pageSize: 20,
  pageNum: 1,
  loading: false,
  more: true
}

const mutations = {
  setArticleList: (state, list) => {
    state.articleList = list
  },
  pushArticleList: (state, list) => {
    state.articleList.push(...list)
  },
  setLoading: (state, boo) => {
    state.loading = boo
  },
  setMore: (state, boo) => {
    state.more = boo
  },
  setPageNum: (state) => {
    state.pageNum++
  },
}

const actions = {
  async getList({ commit, state }) {
    if (state.loading) {
      return
    }
    commit('setLoading', true)
    let res = await this.$axios.get('/api/biji/article/list', {
      params: {
        pageNum: state.pageNum,
        pageSize: state.pageSize,
      }
    })
    commit('pushArticleList', res.data.list)
    if (res.data.list.length < state.pageSize) {
      commit('setMore', false)
    }
    commit('setLoading', false)
    commit('setPageNum')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
