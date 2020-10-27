<template>
  <li class="gallery-item">
    <vue-load-image class="gallery-item-container">
      <img
        class="gallery-image"
        slot="image"
        v-bind="{
          src: gif.images.fixed_height.url,
          alt: gif.images.fixed_height.title
        }"
      />
      <img
        class="gallery-image"
        slot="preloader"
        src="../../assets/preloader.gif"
      />
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
  box-sizing: border-box;
  padding: 0.1em;
  height: 40vh;
  width: 25%;
}

.gallery-item-container {
  display: flex;
  height: 100%;
}

.gallery-image {
  border-radius: 1em;
  height: auto;
  width: 100%;
  object-fit: cover;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
