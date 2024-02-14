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
    fetchResearch() {
      const researchValue = store.research.toLowerCase().trim();
      axios.get(`${store.apiUriFilms} ${researchValue}`).then((res) => {
        store.searchResultsFilms = res.data.results;
        console.log("FILM", res.data.results);
      });
      axios.get(`${store.apiUriSeries} ${researchValue}`).then((res) => {
        store.searchResultsSeries = res.data.results;
        console.log("SERIE", res.data.results);
      });
    },
  },
  components: {
    AppHeader,
    AppMain,
  },
};
</script>

<template>
  <AppHeader @user-research="fetchResearch"></AppHeader>
  <AppMain></AppMain>
</template>

<style lang="scss">
@use "./styles/general.scss";
</style>
