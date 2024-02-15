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
    <h2 v-show="store.searchResultsFilms.length != 0" class="">Film</h2>
    <div class="navigator">
      <div v-for="result in store.searchResultsFilms">
        <AppCard :result="result"></AppCard>
      </div>
    </div>
    <h2 v-show="store.searchResultsSeries.length != 0" class="mt-3">
      Serie Tv
    </h2>
    <div class="navigator">
      <div v-for="result in store.searchResultsSeries">
        <AppCard :result="result"></AppCard>
      </div>
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
