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
    /**
     * Funzione che restituisce il path assoluto che VUE non riesce a comprendere da solo
     * @param {*} imgName path relativo
     */
    getUrl(imgName) {
      const imgUrl = new URL(
        "./assets/img/" + imgName + ".png",
        import.meta.url
      );
      return imgUrl.href;
    },
    fetchResearch() {
      const researchValue = this.research.toLowerCase().trim();
      axios.get(`${store.apiUriFilms} ${researchValue}`).then((res) => {
        store.searchResultsFilms = res.data.results;
        console.log(res.data.results);
      });
      axios.get(`${store.apiUriSeries} ${researchValue}`).then((res) => {
        store.searchResultsSeries = res.data.results;
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
  <h2 class="text-danger">Film</h2>
  <div v-for="result in store.searchResultsFilms">
    <h4>{{ result.title }}</h4>
    <ul>
      <li v-show="result.title != result.original_title">
        Titolo Originale: {{ result.original_title }}
      </li>
      <li>
        Lingua:
        <div v-if="store.flags.includes(result.original_language)" class="flag">
          <img :src="getUrl(result.original_language)" alt="" class="border" />
        </div>
        <div v-else>
          {{ result.original_language }}
        </div>
      </li>
      <li>Voto: {{ result.vote_average }}</li>
    </ul>
  </div>
  <h2 class="text-danger">Serie Tv</h2>
  <div v-for="result in store.searchResultsSeries">
    <h4>{{ result.name }}</h4>
    <ul>
      <li v-show="result.name != result.original_name">
        Titolo Originale: {{ result.original_name }}
      </li>
      <li>
        Lingua:
        <div v-if="store.flags.includes(result.original_language)" class="flag">
          <img :src="getUrl(result.original_language)" alt="" class="border" />
        </div>
        <div v-else>
          {{ result.original_language }}
        </div>
      </li>
      <li>Voto: {{ result.vote_average }}</li>
    </ul>
  </div>
</template>

<style lang="scss">
@use "./styles/general.scss";

.searchbar {
  width: 400px;
}
.flag {
  width: 50px;
  aspect-ratio: 1;
}
</style>
