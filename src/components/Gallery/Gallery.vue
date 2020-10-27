<template>
  <ul class="gallery" ref="scroller" @scroll.passive="onscroll()">
    <template v-for="gif in gifs">
      <gallery-item :key="gif.id" v-bind="{ gif }" />
    </template>
  </ul>
</template>

<script>
import { throttle } from "lodash";
import GalleryItem from "@/components/Gallery/GalleryItem.vue";

export default {
  name: "Gallery",
  components: {
    GalleryItem
  },

  props: {
    gifs: {
      type: Object
    }
  },

  data() {
    return {
      scroll: {
        position: 0
      }
    };
  },

  methods: {
    onscroll: throttle(function() {
      if (this.$refs.scroller) {
        this.updatesScrollPosition();
        if (this.scroll.position <= 600) {
          this.loadMore();
        }
      }
    }, 50),

    loadMore: throttle(function() {
      this.$emit("load");
    }, 2000),

    updatesScrollPosition() {
      this.scroll.position =
        this.$refs.scroller.scrollHeight -
        this.$refs.scroller.scrollTop -
        this.$refs.scroller.offsetHeight;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.gallery {
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  list-style-type: none;
  margin: 0;
  padding: 5em 0 0 0;
}
</style>
