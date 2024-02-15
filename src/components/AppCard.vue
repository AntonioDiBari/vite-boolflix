<script>
import { store } from "../store/index.js";

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
  },
  props: {
    result: Object,
  },
};
</script>

<template>
  <div class="card">
    <img
      v-if="result.poster_path"
      :src="getUrl('https://image.tmdb.org/t/p/w342', result.poster_path)"
      alt=""
      class="poster"
    />
    <img v-else src="../assets/img/no_poster.png" alt="" />
  </div>

  <!-- <ul class="border">
  <li>
    <h4>{{ result.title }}</h4>
  </li>
  <li v-show="result.title != result.original_title">
    Titolo Originale: {{ result.original_title }}
  </li>
  <li>
    Lingua:
    <div v-if="store.flags.includes(result.language)" class="flag">
      <img
        :src="getUrl('../assets/img/', result.language, '.png')"
        alt=""
        class="border"
      />
    </div>
    <div v-else>
      {{ result.language }}
    </div>
  </li>
  <li v-show="result.vote > 0">
    Voto:
    <span v-for="(star, indexStar) in 5">
      <font-awesome-icon
        v-if="result.vote >= indexStar + 1"
        icon="fa-solid fa-star"
        class="text-warning"
      />
      <font-awesome-icon v-else icon="fa-solid fa-star" />
    </span>
    {{ result.vote }}
  </li>
  <li>
    <img
      v-if="result.poster_path"
      :src="getUrl('https://image.tmdb.org/t/p/w342', result.poster_path)"
      alt=""
    />
    <span v-else>Nessuna copertina :[</span>
  </li>
</ul> -->
</template>

<style lang="scss" scoped>
@use "../styles/partials/mixins" as *;
@use "../styles/partials/variables" as *;
.flag {
  width: 50px;
  aspect-ratio: 1;
}
.card {
  width: 342px;
  background-color: black;
  border: 0;
  .poster {
    object-fit: cover;
    height: 510px;
  }
}
</style>
