<template>
  <li class="gallery-item">
    <vue-load-image>
      <img
        class="gallery-image"
        slot="image"
        v-bind="{ src: gif.images.fixed_height.url }"
      />
      <img class="gallery-image" slot="preloader" src="../../assets/logo.png" />
    </vue-load-image>
  </li>
</template>

<script>
import VueLoadImage from "vue-load-image";
export default {
  props: {
    gif: {
      type: Object
    }
  },
  components: {
    VueLoadImage
  }
};
</script>

<style scoped lang="scss">
.gallery-item {
  padding: 0.1em;
  flex-grow: 1;
}
.gallery-image {
  border-radius: 1em;
  max-height: 100%;
  min-width: 100%;
  object-fit: cover;
  vertical-align: bottom;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
