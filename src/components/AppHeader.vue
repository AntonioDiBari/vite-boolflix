<script>
import axios from "axios";
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
  <div class="searchbar input-group mb-3">
    <input
      type="text"
      class="form-control"
      placeholder="Cerca qui un film o una serie TV"
      v-model="store.research"
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
</template>

<style lang="scss" scoped>
@use "../styles/partials/mixins" as *;
@use "../styles/partials/variables" as *;

.searchbar {
  width: 400px;
}
</style>
