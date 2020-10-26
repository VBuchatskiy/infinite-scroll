import Vue from "vue";
import Vuex from "vuex";
import { api } from "@/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gifs: {},
    loading: false
  },
  mutations: {
    addGifCollection(state, { collection }) {
      state.gifs = collection;
    },
    changeLoadingState(state) {
      state.loading = !state.loading;
    }
  },
  actions: {
    async loadGifCollection({ commit }) {
      const { data } = await api.getTrendingGifCollection();

      const collection = data.reduce((_collection, _gif) => {
        _collection[_gif.id] = _gif;
        return _collection;
      }, {});

      commit(`changeLoadingState`);
      commit(`addGifCollection`, { collection });
      commit(`changeLoadingState`);
    }
  },
  getters: {
    getGifCollection(state) {
      return state.gifs;
    },
    isLoading(state) {
      return state.loading;
    }
  }
});
