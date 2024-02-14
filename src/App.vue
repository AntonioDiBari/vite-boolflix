<script>
import axios from "axios";
import { store } from "./store/index";
import { faStoreAltSlash } from "@fortawesome/free-solid-svg-icons";

export default {
  data() {
    return {
      store,
      research: "",
    };
  },
  methods: {
    fetchResearch() {
      const researchValue = this.research.toLowerCase().trim();
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=fc68362da932f9ce47e099180fad846f&language=it&query= ${researchValue}`
        )
        .then((res) => {
          store.searchResult = res.data.results;
          console.log(res.data.results);
        });
    },
  },
};
</script>

<template>
  <div class="searchbar input-group mb-3">
    <input
      type="text"
      class="form-control"
      placeholder="Cerca qui un film o una serie TV"
      v-model="research"
    />
    <button
      class="btn btn-outline-secondary"
      type="button"
      id="button-addon2"
      @click="fetchResearch()"
    >
      <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
    </button>
  </div>
  <div v-for="result in store.searchResult">
    <h3>{{ result.title }}</h3>
    <ul>
      <li>Titolo Originale: {{ result.original_title }}</li>
      <li>Lingua: {{ result.original_language }}</li>
      <li>Voto: {{ result.vote_average }}</li>
    </ul>
  </div>
</template>

<style lang="scss">
@use "./styles/general.scss";

.searchbar {
  width: 400px;
}
</style>
