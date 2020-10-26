<template>
  <section id="infinite-scroll">
    <template v-if="!isLoading">
      <Gallery v-bind="{ gifs }" />
    </template>
  </section>
</template>

<script>
import Gallery from "@/components/Gallery/Gallery.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "InfiniteScroll",
  components: {
    Gallery
  },
  computed: {
    ...mapGetters({
      gifs: "getGifCollection",
      isLoading: "isLoading"
    })
  },
  methods: {
    ...mapActions({
      loadGifCollection: "loadGifCollection"
    })
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
