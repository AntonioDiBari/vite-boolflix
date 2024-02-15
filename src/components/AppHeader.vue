<script>
import { store } from "../store/index.js";

export default {
  data() {
    return {
      store,
    };
  },
  methods: {},
  emits: ["user-research"],
};
</script>

<template>
  <header class="header wrapper">
    <div class="logo">
      <img src="../assets/img/netflix-logo.png" alt="" />
    </div>
    <div class="searchbar input-group">
      <input
        v-model="store.research"
        @keyup.enter="$emit('user-research')"
        type="text"
        class="form-control"
        placeholder="Cerca qui un film o una serie TV"
        autofocus
      />
      <button
        class="btn btn-outline-secondary"
        type="button"
        id="button-addon2"
        @click="$emit('user-research')"
      >
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use "../styles/partials/mixins" as *;
@use "../styles/partials/variables" as *;

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: $headerHeight;
  background-color: black;
  position: sticky;
  top: 0;

  .logo {
    width: 200px;
  }
  .searchbar {
    width: 300px;
  }
}
</style>
