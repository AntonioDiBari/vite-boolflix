<script>
import axios from "axios";
import { store } from "./store/index";
import AppHeader from "./components/AppHeader.vue";
import AppMain from "./components/AppMain.vue";

export default {
  data() {
    return {
      store,
    };
  },
  methods: {
    fetchFilms(researchValue) {
      axios.get(`${store.apiUriFilms} ${researchValue}`).then((res) => {
        store.searchResultsFilms = res.data.results.map((film) => {
          return {
            title: film.title,
            original_title: film.original_title,
            language: film.original_language,
            vote: Math.round(film.vote_average / 2),
            poster_path: film.poster_path,
            overview: film.overview,
          };
        });
        console.log("FILM", res.data.results);
      });
    },
    fetchSeries(researchValue) {
      axios.get(`${store.apiUriSeries} ${researchValue}`).then((res) => {
        store.searchResultsSeries = res.data.results.map((serie) => {
          return {
            title: serie.name,
            original_title: serie.original_name,
            language: serie.original_language,
            vote: Math.round(serie.vote_average / 2),
            poster_path: serie.poster_path,
            overview: serie.overview,
          };
        });
        console.log("SERIE", res.data.results);
      });
    },
    fetchResearch() {
      const researchValue = store.research.toLowerCase().trim();
      this.fetchFilms(researchValue);
      this.fetchSeries(researchValue);
    },
  },
  components: {
    AppHeader,
    AppMain,
  },
};
</script>

<template>
  <div class="container mt-4 ms-5">
    <AppHeader @user-research="fetchResearch"></AppHeader>
    <AppMain></AppMain>
  </div>
</template>

<style lang="scss">
@use "./styles/general.scss";
</style>
