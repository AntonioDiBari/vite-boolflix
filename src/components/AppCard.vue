<script>
import { store } from "../store/index.js";
import axios from "axios";

export default {
  data() {
    return {
      store,
      actors: [],
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
    searchActor() {
      axios
        .get(
          `${store.apiCredits}${this.result.type}/${this.result.id}/credits?api_key=fc68362da932f9ce47e099180fad846f`
        )
        .then((res) => {
          let mainCast = [];
          if (res.data.cast.length < 5) {
            mainCast = res.data.cast;
          } else {
            mainCast = res.data.cast.filter((actor, index) => {
              return index < 5;
            });
          }
          this.actors = mainCast;
        });
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
      :src="getUrl('https://image.tmdb.org/t/p/w342', result.poster_path, ``)"
      alt=""
      class="poster"
    />
    <img v-else src="../assets/img/no_poster.png" alt="" class="poster" />
    <div class="card-info">
      <ul>
        <li>
          <span class="fw-bolder text-light">Titolo:</span>
          {{ result.title }}
        </li>
        <li v-show="result.title != result.original_title">
          <span class="fw-bolder text-light">Titolo originale:</span>
          {{ result.original_title }}
        </li>
        <li v-show="result.vote > 0">
          <span class="fw-bolder text-light">Voto:</span>
          <span v-for="star in 5">
            <font-awesome-icon
              v-if="result.vote >= star"
              icon="fa-solid fa-star"
              class="text-warning"
            />
            <font-awesome-icon v-else icon="fa-solid fa-star" />
          </span>
        </li>
        <li v-show="result.overview" class="overview">
          <span class="fw-bolder text-light">Overview:</span>
          {{ result.overview }}
        </li>
        <li>
          <span class="fw-bolder text-light">Lingua:</span>
          <div v-if="store.flags.includes(result.language)" class="flag">
            <img
              :src="getUrl('../assets/img/', result.language, '.png')"
              alt=""
              class="border inline-block"
            />
          </div>
          <div v-else>
            {{ result.language }}
          </div>
        </li>
        <li v-show="actors.length != 0">
          <span class="fw-bolder text-light">Attori: </span>
          <span v-for="actor in actors"> {{ actor.name + ` ` }} </span>.
        </li>
      </ul>
    </div>
    <font-awesome-icon
      @click="searchActor()"
      icon="fa-solid fa-circle-info"
      class="logo-info"
    />
  </div>
</template>

<style lang="scss" scoped>
@use "../styles/partials/mixins" as *;
@use "../styles/partials/variables" as *;
.flag {
  width: 50px;
  aspect-ratio: 1;
}
.card {
  margin-bottom: 10px;
  min-width: 342px;
  background-color: black;
  border: 0;
  .poster {
    object-fit: cover;
    height: 510px;
  }
  .card-info {
    display: none;
    width: 342px;
    height: 510px;
    border: 1px solid white;
    color: grey;
    padding: 40px 10px 10px 20px;
    position: relative;
    .overview {
      max-height: 150px;
      overflow: auto;
    }
  }
  .logo-info {
    position: absolute;
    right: 10px;
    bottom: 10px;
    cursor: pointer;
    color: whitesmoke;
    display: none;
  }
}
.card:hover > .poster {
  display: none;
}
.card:hover > .card-info,
.card:hover > .logo-info {
  display: block;
}
</style>
