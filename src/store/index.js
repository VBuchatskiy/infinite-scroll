import Vue from "vue";
import Vuex from "vuex";
import { api } from "@/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gifs: {}
  },
  mutations: {
    addGifCollection(state, { collection }) {
      state.gifs = { ...state.gifs, ...collection };
    }
  },
  actions: {
    async loadGifCollection({ state, commit }) {
      const { gifs } = state;
      const { data } = Object.keys(gifs).length
        ? await api.getTrendingGifCollection({
            offset: Object.keys(gifs).length
          })
        : await api.getTrendingGifCollection();

      const collection = data.reduce((_collection, gif) => {
        if (!gifs[gif.id]) {
          _collection[gif.id] = gif;
        }
        return _collection;
      }, {});

      commit(`addGifCollection`, { collection });
    }
  },
  getters: {
    getGifCollection(state) {
      return state.gifs;
    }
  }
});
