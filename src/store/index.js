import Vue from "vue";
import Vuex from "vuex";
import { api } from "@/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    trending: {},
    searching: {},
    tags: {},
    tag: ``
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
    setSearchingTag(state, { tag }) {
      state.tag = tag;
    },
    clearSearchingGifCollection(state) {
      state.searching = {};
    },
    clearSearchingGifTagsCollection(state) {
      state.tags = {};
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
    async loadSearchingGifCollection({ state, commit }, { tag }) {
      const { searching } = state;

      if (state.tag !== tag) {
        commit("setSearchingTag", { tag });
        commit("clearSearchingGifCollection");
      }

      const { data } = Object.keys(searching).length
        ? await api.getSearchingGifCollection({
            q: state.tag,
            offset: Object.keys(searching).length
          })
        : await api.getSearchingGifCollection({ q: state.tag });

      const collection = data.reduce((_collection, gif) => {
        if (!searching[gif.id]) {
          _collection[gif.id] = gif;
        }
        return _collection;
      }, {});

      commit(`clearSearchingGifTagsCollection`);
      commit(`addSearchingGifCollection`, { collection });
    },
    async loadSearchingGifTagsCollection({ commit }, { tag }) {
      const { data } = await api.getSearchingGifTagsCollection({ q: tag });

      commit(`addSearchingGifTagsCollection`, {
        tags: data
      });
    },
    setSearchingTag({ commit }, { tag }) {
      commit(`setSearchingTag`, { tag });
    },
    clearSearchingTag({ commit }) {
      commit(`clearSearchingTag`);
    }
  },
  getters: {
    getTrendingCollection({ trending }) {
      return trending;
    },
    getSearchingCollection({ searching }) {
      return searching;
    },
    getSearchingTags({ tags }) {
      return tags;
    },
    getSearchingTag({ tag }) {
      return tag;
    }
  }
});
