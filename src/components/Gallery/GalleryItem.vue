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
@media (min-width: 768px) {
  .gallery-item {
    width: 25%;
  }
}

@media (min-width: 600px) and (max-width: 768px) {
  .gallery-item {
    max-width: 50%;
  }
}

@media (min-width: 320px) and (max-width: 600px) {
  .gallery-item {
    max-width: 100%;
  }
}

.gallery-item {
  box-sizing: border-box;
  padding: 0.1em;
  flex-grow: 1;
  min-width: 320px;
  height: 40vh;
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
