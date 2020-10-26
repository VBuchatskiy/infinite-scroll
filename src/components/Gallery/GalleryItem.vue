<template>
  <li>
    <img v-bind="{ src: gif.images.original.url }" />
  </li>
</template>

<script>
export default {
  props: {
    gif: {
      type: Object
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
