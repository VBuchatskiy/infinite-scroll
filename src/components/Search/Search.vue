<template>
  <label for="search" class="search">
    <input
      class="search-input"
      @input="ontype($event.target.value)"
      placeholder="Search"
      name="search"
      type="search"
    />
    <template v-if="Object.keys(tags).length && this.query">
      <ul class="search-options">
        <li
          v-for="tag in tags"
          :key="tag.name"
          @click="onselect($event.target.value)"
        >
          <span>{{ tag.name }}</span>
        </li>
      </ul>
    </template>
  </label>
</template>

<script>
import { debounce } from "lodash";

export default {
  name: "Search",
  props: {
    tags: {
      type: Object
    }
  },
  data() {
    return {
      query: ""
    };
  },
  methods: {
    ontype: debounce(function(value) {
      const limite = 2;
      this.query += value;
      if ([...this.query].length > limite) {
        this.$emit("searching", value.trim());
      }
    }, 1000),
    onselect() {}
  }
};
</script>

<style scoped lang="scss">
.search {
  position: relative;
}

.search-input {
  display: flex;
  height: 2em;
}

.search-options {
  position: absolute;
}
</style>
