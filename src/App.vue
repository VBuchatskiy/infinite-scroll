<template>
  <main>
    <header class="infinite-scroll-header">
      <search @searching="onsearch" />
    </header>
    <section>
      <template v-if="Object.keys(gifs).length">
        <gallery v-bind="{ gifs }" @load="loadGifCollection()" />
      </template>
      <template v-else>
        <pre>loading</pre>
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
      gifs: "getGifCollection"
    })
  },
  methods: {
    ...mapActions({
      loadGifCollection: "loadGifCollection"
    }),
    onsearch(value) {
      console.warn(value);
    }
  },
  created() {
    this.loadGifCollection();
  }
};
</script>

<style lang="scss">
body {
  overflow: hidden;
  margin: 0;
  padding: 0;
}
.infinite-scroll-header {
  box-sizing: border-box;
  position: fixed;
  display: flex;
  align-items: center;
  background-color: #000;
  border-radius: 0.1em;
  top: 0;
  height: 5em;
  width: 100%;
  opacity: 80%;
}
</style>
