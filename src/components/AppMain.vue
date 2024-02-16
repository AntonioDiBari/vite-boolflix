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
  <section class="wrapper pt-3">
    <h2 v-show="store.research.firstResearch">Effettua la tua ricerca..</h2>
    <h2 v-if="store.searchResultsFilms.length != 0 && !store.noFilmFinded">
      Film
    </h2>
    <h2 v-else-if="store.noFilmFinded" class="text-danger">Film non trovato</h2>
    <div class="navigator">
      <AppCard
        v-for="result in store.searchResultsFilms"
        :result="result"
        :key="result.id"
      ></AppCard>
    </div>
    <h2
      v-if="store.searchResultsSeries.length != 0 && !store.noSerieFinded"
      class="mt-3"
    >
      Serie Tv
    </h2>
    <h2 v-else-if="store.noSerieFinded" class="text-danger mt-3">
      Serie non trovata
    </h2>
    <div class="navigator">
      <AppCard
        v-for="result in store.searchResultsSeries"
        :result="result"
        :key="result.id"
      ></AppCard>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "../styles/partials/mixins" as *;
@use "../styles/partials/variables" as *;

.navigator {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  height: 100%;
}
</style>
