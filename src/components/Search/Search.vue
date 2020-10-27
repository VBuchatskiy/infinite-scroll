<template>
  <input
    class="search"
    @input="ontype($event.target.value)"
    placeholder="Search"
  />
</template>

<script>
import { debounce } from "lodash";

export default {
  name: "Search",
  data() {
    return {
      query: ""
    };
  },
  methods: {
    ontype: debounce(function(value) {
      this.query += value;
      if ([...this.query].length > 3) {
        this.$emit("searching", value);
      }
    }, 100)
  }
};
</script>

<style scoped lang="scss">
.search {
  height: 2em;
}
</style>
