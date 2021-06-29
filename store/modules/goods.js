import request from "../../utils/request";
const state = {
  goodsList: [],
};
const actions = {
  async getGoodsList({ commit }, info) {
    const res = await request("/goods/search_goods", info);
    if (res.code === 200) {
      commit("SET_GOODS_LIST", res.data.goodsList);
      return "ok";
    } else {
      return Promise.reject(new Error("搜索失败"));
    }
  },
};
const mutations = {
  SET_GOODS_LIST(state, list) {
    state.goodsList = state.goodsList.concat(list);
  },
  REMOVE_GOODS_LIST(state) {
    state.goodsList = [];
  },
};
const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
