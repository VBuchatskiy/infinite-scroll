<template>
  <ul class="gallery" ref="scroller" @scroll.passive="onscroll()">
    <template v-for="gif in gifs">
      <GalleryItem :key="gif.id" v-bind="{ gif }" />
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
  data() {
    return {
      scroll: {
        bottom: 0,
        top: 0,
        height: 0,
        delta: 0,
        position: 0
      }
    };
  },
  computed: {
    limiter() {
      return 400;
    }
  },
  props: {
    gifs: {
      type: Object
    }
  },
  methods: {
    onscroll: throttle(function() {
      if (this.$refs.scroller) {
        this.updateScroll();
      }
    }, 50),
    updateScroll() {
      this.scroll.position =
        this.$refs.scroller.scrollHeight -
        this.$refs.scroller.scrollTop -
        this.$refs.scroller.offsetHeight;
    },
    scrollToPosition(position) {
      !Number.isNaN(position)
        ? (this.$refs.scroller.scrollTop = position)
        : (this.$refs.scroller.scrollTop = this.$refs.scroller.scrollHeight);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
