const state = {
  list: []
}

const mutations = {
  setList: (state, list) => {
    state.list = list
  },
}

const actions = {
  setList({ commit }, list) {
    commit('setList', list)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
