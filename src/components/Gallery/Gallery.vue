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

const limit = 1200;

export default {
  name: "Gallery",
  components: {
    GalleryItem
  },

  props: {
    gifs: {
      type: Object
    },
    tag: {
      type: String
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
        if (this.scroll.position <= limit) {
          this.load();
        }
      }
    }, 50),

    load: throttle(function() {
      this.$emit("load", { tag: this.tag });
    }, 2000),

    updatesScrollPosition() {
      this.scroll.position =
        this.$refs.scroller.scrollHeight -
        this.$refs.scroller.scrollTop -
        this.$refs.scroller.offsetHeight;
    }
  },

  watch: {
    tag(curr, prev) {
      if (curr !== prev) {
        this.$refs.scroller.scrollTop = 0;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.gallery {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  list-style-type: none;
  height: 100%;
  margin: 0;
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
}
</style>
