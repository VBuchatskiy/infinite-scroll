<template>
  <main>
    <header class="infinite-scroll-header">
      <search
        @searching="onsearch"
        v-bind="{ tags, tag, pending }"
        @load="loadSearchingGifCollection"
      />
    </header>
    <section class="infinite-scroll-content">
      <template v-if="tag">
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
      tags: "getSearchingTags",
      pending: "isPending"
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
  box-sizing: border-box;
  overflow: hidden;
  margin: 0;
  padding: 0;
  min-width: 320px;
  padding-top: 10vh;
}

main {
  position: relative;
}

header {
  padding: 1em;
}

.infinite-scroll-content {
  height: 90vh;
}

.infinite-scroll-header {
  height: 10vh;
  padding: 1em;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background-color: #000;
  position: fixed;
  top: 0;
  width: 100%;
  opacity: 80%;
}
</style>
