<script>
import { store } from "../store/index";
import AppCard from "../components/AppCard.vue";

export default {
  data() {
    return {
      store,
    };
  },
  components: {
    AppCard,
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
};
</script>

<template>
  <h2 class="text-danger">Film</h2>
  <div v-for="result in store.searchResultsFilms">
    <AppCard :result="result"></AppCard>
  </div>
  <h2 class="text-danger">Serie Tv</h2>
  <div v-for="result in store.searchResultsSeries">
    <AppCard :result="result"></AppCard>
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
