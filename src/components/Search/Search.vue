<template>
  <section class="search">
    <label for="search" class="search-input">
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
      <ul class="search-tag-list">
        <li
          class="search-tag-list__item"
          v-for="tag in tags"
          :key="tag.name"
          @click="onselect({ tag: tag.name })"
        >
          <span class="search-tag-list__text">{{ tag.name }}</span>
        </li>
      </ul>
    </template>
    <template v-if="!Object.keys(tags).length && this.query">
      <ul class="search-tag-list">
        <li
          class="search-tag-list__item"
          @click="
            () => {
              this.query = ``;
            }
          "
        >
          <span class="search-tag-list__text">no results, click to reset</span>
        </li>
      </ul>
    </template>
  </section>
</template>

<script>
import { debounce } from "lodash";

export default {
  name: "Search",
  props: {
    tags: {
      type: Object
    },
    tage: {
      type: String
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
    }, 50),
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
  box-sizing: border-box;
}

.search-input {
  display: flex;
  height: 2em;
  width: 15em;
}

.search-tag-list {
  box-sizing: border-box;
  background: #fff;
  position: absolute;
  padding-left: 0;
  margin: 0;
  list-style: none;
  width: 15em;
}

.search-tag-list__item {
  box-sizing: border-box;
  cursor: pointer;
  height: 3em;
  padding-left: 1em;
}

.search-tag-list__item:hover {
  background: #e6e6e6;
}

.search-tag-list__text {
  box-sizing: border-box;
  height: 100%;
  display: flex;
  align-items: center;
  width: 100%;
}

.search-tag-list__text::first-letter {
  text-transform: uppercase;
}
</style>
