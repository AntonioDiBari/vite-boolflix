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
        if (res.data.results.length == 0) {
          store.noFilmFinded = true;
        }
        store.searchResultsFilms = res.data.results.map((film) => {
          return {
            id: film.id,
            title: film.title,
            original_title: film.original_title,
            language: film.original_language,
            vote: Math.round(film.vote_average / 2),
            poster_path: film.poster_path,
            overview: film.overview,
            type: "movie",
          };
        });
        console.log("FILM", res.data.results);
        console.log("Errore ricerca Film", store.noFilmFinded);
      });
    },
    fetchSeries(researchValue) {
      axios.get(`${store.apiUriSeries} ${researchValue}`).then((res) => {
        if (res.data.results.length == 0) {
          store.noSerieFinded = true;
        }
        store.searchResultsSeries = res.data.results.map((serie) => {
          return {
            id: serie.id,
            title: serie.name,
            original_title: serie.original_name,
            language: serie.original_language,
            vote: Math.round(serie.vote_average / 2),
            poster_path: serie.poster_path,
            overview: serie.overview,
            type: "tv",
          };
        });
        console.log("SERIE", res.data.results);
        console.log("Errore ricerca serie:", store.noSerieFinded);
      });
    },
    fetchResearch() {
      const researchValue = store.research.userResearch.toLowerCase().trim();
      store.noFilmFinded = false;
      store.noSerieFinded = false;
      store.research.firstResearch = false;
      this.fetchFilms(researchValue);
      this.fetchSeries(researchValue);
    },
    fetchFilmGenres() {
      axios.get(store.apiUriGenresFilm).then((res) => {
        store.genres.film = res.data.genres;
      });
    },
    fetchSeriesGenres() {
      axios.get(store.apiUriGenresSeries).then((res) => {
        store.genres.tv = res.data.genres;
      });
    },
  },
  components: {
    AppHeader,
    AppMain,
  },
  created() {
    this.fetchSeriesGenres(), this.fetchFilmGenres();
  },
};
</script>

<template>
  <div class="webapp">
    <AppHeader @user-research="fetchResearch"></AppHeader>
    <div class="main">
      <AppMain></AppMain>
    </div>
  </div>
</template>

<style lang="scss">
@use "./styles/general.scss";
@use "./styles/partials/variables" as *;

.webapp {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.main {
  height: calc(100% - $headerHeight);
  background-color: #252525;
  overflow: auto;
}
</style>
