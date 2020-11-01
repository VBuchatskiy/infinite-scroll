<template>
  <form class="search-form">
    <label for="search" class="search-label"></label>
    <input
      class="search-input"
      @input="ontype({ query: $event.target.value, e: $event })"
      placeholder="Search"
      name="search"
      type="text"
      v-model="query"
    />
    <template v-if="Object.keys(tags).length && query">
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
    <template v-if="!Object.keys(tags).length && query && !pending">
      <ul class="search-tag-list">
        <li
          class="search-tag-list__item"
          @click="
            () => {
              query = ``;
            }
          "
        >
          <span class="search-tag-list__text">no results, click to reset</span>
        </li>
      </ul>
    </template>
  </form>
</template>

<script>
import { debounce } from "lodash";

export default {
  name: "Search",
  props: {
    tags: {
      type: Object
    },
    tag: {
      type: String
    },
    pending: {
      type: Boolean
    }
  },
  data() {
    return {
      query: ""
    };
  },
  computed: {
    limite() {
      return 2;
    }
  },
  methods: {
    ontype: debounce(function({ e, query }) {
      if ([...this.query].length > this.limite) {
        this.$emit("searching", {
          tag: query.trim()
        });
      }
      const { data } = e;
      if (!data) this.query = this.query.slice(-1, 0);
      if (!this.query) this.query = ``;
      this.query = query;
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
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid #e6e6e6;
  outline: 0;
  font-size: 1.3rem;
  color: #fff;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;
  height: 2em;
  width: 14em;
}

.search-tag-list {
  box-sizing: border-box;
  background: #fff;
  position: absolute;
  padding-left: 0;
  margin: 0;
  list-style: none;
  width: 14em;
}

.search-tag-list__item {
  box-sizing: border-box;
  height: 3em;
  padding-left: 1em;
}

.search-tag-list__item:hover {
  background: #e6e6e6;
  cursor: pointer;
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
