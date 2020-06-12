const state = () => {
  return {
    status: false
  }
}

const mutations = {
  changeStatus: (state, boo) => {
    state.status = boo
  },
}

const actions = {
  changeStatus({ commit }, boo) {
    commit('changeStatus', boo)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
