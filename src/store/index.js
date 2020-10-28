import Vue from "vue";
import Vuex from "vuex";
import { api } from "@/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    trending: {},
    searching: {},
    tags: {},
    query: ``
  },
  mutations: {
    addTrendingGifCollection(state, { collection }) {
      state.trending = { ...state.trending, ...collection };
    },
    addSearchingGifCollection(state, { collection }) {
      state.searching = { ...state.searching, ...collection };
    },
    addSearchingGifTagsCollection(state, { tags }) {
      state.tags = { ...tags };
    },
    setSearchingQuery(state, { query }) {
      state.query = query;
    },
    clearSearchingQuery(state) {
      state.query = ``;
    }
  },
  actions: {
    async loadTrendingGifCollection({ state, commit }) {
      const { trending } = state;
      const { data } = Object.keys(trending).length
        ? await api.getTrendingGifCollection({
            offset: Object.keys(trending).length
          })
        : await api.getTrendingGifCollection();

      const collection = data.reduce((_collection, gif) => {
        if (!trending[gif.id]) {
          _collection[gif.id] = gif;
        }
        return _collection;
      }, {});

      commit(`addTrendingGifCollection`, { collection });
    },

    async loadSearchingGifCollection({ state, commit }) {
      const { searching, query } = state;

      if (!query) return;

      const { data } = Object.keys(searching).length
        ? await api.getSearchingGifCollection({
            q: query,
            offset: Object.keys(searching).length
          })
        : await api.getSearchingGifCollection();

      const collection = data.reduce((_collection, gif) => {
        if (!searching[gif.id]) {
          _collection[gif.id] = gif;
        }
        return _collection;
      }, {});

      commit(`addSearchingGifCollection`, { collection });
    },

    async loadSearchingGifTagsCollection({ commit }, { query }) {
      const { data } = await api.getSearchingGifTagsCollection({ q: query });

      commit(`addSearchingGifTagsCollection`, { tags: data });
    },

    setSearchingQuery({ commit }, { query }) {
      commit(`setSearchingQuery`, { query });
    },

    clearSearchingQuery({ commit }) {
      commit(`clearSearchingQuery`);
    }
  },
  getters: {
    getTrendingCollection({ trending }) {
      return trending;
    },
    getSearchingCollection({ searching }) {
      return searching;
    },
    getSearchingQuery({ query }) {
      return query;
    },
    getSearchingTags({ tags }) {
      return tags;
    }
  }
});
