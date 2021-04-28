import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export const createStore = () => {
  return new Vuex.Store({
    state: {
      infoList: [],
    },
    mutations: {
      setList(state, data) {
        state.infoList = data;
      },
    },
    actions: {
      async getList({ commit }) {
        const { data } = await axios({
          method: "GET",
          url: "https://cnodejs.org/api/v1/topics?page=1&limit=20 ",
        });
        commit("setList", data.data);
      },
    },
  });
};
