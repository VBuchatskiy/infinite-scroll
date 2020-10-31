<template>
  <main>
    <header class="infinite-scroll-header">
      <search
        @searching="onsearch"
        v-bind="{ tags }"
        @load="loadSearchingGifCollection"
      />
    </header>
    <section>
      <template v-if="Object.keys(searching).length">
        <gallery
          v-bind="{ tag, gifs: searching }"
          @load="loadSearchingGifCollection"
        />
      </template>
      <template v-else>
        <template v-if-else="Object.keys(trending).length">
          <gallery
            v-bind="{ gifs: trending }"
            @load="loadTrendingGifCollection"
          />
        </template>
      </template>
    </section>
  </main>
</template>

<script>
import Gallery from "@/components/Gallery/Gallery.vue";
import Search from "@/components/Search/Search.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "InfiniteScroll",
  components: {
    Gallery,
    Search
  },
  computed: {
    ...mapGetters({
      trending: "getTrendingCollection",
      searching: "getSearchingCollection",
      tag: "getSearchingTag",
      tags: "getSearchingTags"
    })
  },
  methods: {
    ...mapActions({
      loadTrendingGifCollection: "loadTrendingGifCollection",
      loadSearchingGifCollection: "loadSearchingGifCollection",
      loadSearchingGifTagsCollection: "loadSearchingGifTagsCollection"
    }),
    async onsearch({ tag }) {
      if (!tag) return;
      await this.loadSearchingGifTagsCollection({ tag });
    }
  },
  created() {
    this.loadTrendingGifCollection();
  }
};
</script>

<style lang="scss">
body {
  overflow: hidden;
  margin: 0;
  padding: 0;
}

header {
  padding: 1em;
}

.infinite-scroll-header {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background-color: #000;
  border-radius: 0.1em;
  top: 0;
  height: 5vh;
  width: 100%;
  opacity: 80%;
}
</style>
