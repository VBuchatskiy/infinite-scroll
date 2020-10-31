<template>
  <div>
    <label for="search" class="search">
      <input
        class="search-input"
        @input="ontype({ query: $event.target.value, e: $event })"
        placeholder="Search"
        name="search"
        type="text"
        v-model="query"
      />
    </label>
    <template v-if="Object.keys(tags).length && this.query">
      <ul class="search-options">
        <li
          v-for="tag in tags"
          :key="tag.name"
          @click="onselect({ tag: tag.name })"
        >
          {{ tag.name }}
        </li>
      </ul>
    </template>
    <template v-if="!Object.keys(tags).length && this.query">
      <ul class="search-options">
        <li
          @click="
            () => {
              this.query = ``;
            }
          "
        >
          no results, click to reset
        </li>
      </ul>
    </template>
  </div>
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
    ontype: debounce(function({ e, query }) {
      const { data } = e;
      if (!data) this.query = this.query.slice(-1, 0);
      if (!this.query) this.query = ``;
      const limite = 2;
      this.query = query;
      if ([...this.query].length > limite) {
        this.$emit("searching", {
          tag: query.trim()
        });
      }
    }, 100),
    onselect({ tag }) {
      this.query = ``;
      this.$emit("load", {
        tag: tag.toLowerCase().replace(" ", "-")
      });
    }
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
