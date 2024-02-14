<script>
import axios from "axios";
import { store } from "../store/index";

export default {
  data() {
    return {
      store,
    };
  },
  methods: {
    /**
     * Funzione che restituisce il path assoluto che VUE non riesce a comprendere da solo
     * @param {*} imgName path relativo
     */
    getUrl(path, imgName, type) {
      const imgUrl = new URL(path + imgName + type, import.meta.url);
      return imgUrl.href;
    },
    avarageVote(result) {
      const star = Math.round(result / 2);
      return star;
    },
  },
};
</script>

<template>
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
          <img
            :src="getUrl('../assets/img/', result.original_language, '.png')"
            alt=""
            class="border"
          />
        </div>
        <div v-else>
          {{ result.original_language }}
        </div>
      </li>
      <li v-show="result.vote_average > 0">
        Voto:
        <span v-for="star in 5">
          <font-awesome-icon icon="fa-solid fa-star" /></span
        >{{ avarageVote(result.vote_average) }}
      </li>
      <li>
        <img
          v-if="result.poster_path"
          :src="getUrl('https://image.tmdb.org/t/p/w342', result.poster_path)"
          alt=""
        />
        <span v-else>Nessuna copertina :[</span>
      </li>
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
          <img
            :src="getUrl('../assets/img/', result.original_language, '.png')"
            alt=""
            class="border"
          />
        </div>
        <div v-else>
          {{ result.original_language }}
        </div>
      </li>
      <li v-show="result.vote_average > 0">
        Voto: {{ avarageVote(result.vote_average) }}
      </li>
      <li>
        <img
          v-if="result.poster_path"
          :src="getUrl('https://image.tmdb.org/t/p/w342', result.poster_path)"
          alt=""
        />
        <span v-else>Nessuna copertina :[</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use "../styles/partials/mixins" as *;
@use "../styles/partials/variables" as *;

.flag {
  width: 50px;
  aspect-ratio: 1;
}
</style>
