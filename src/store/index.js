import { reactive } from "vue";

export const store = reactive({
  research: "",
  apiUriFilms:
    "https://api.themoviedb.org/3/search/movie?api_key=fc68362da932f9ce47e099180fad846f&language=it&query= ",
  apiUriSeries:
    "https://api.themoviedb.org/3/search/tv?api_key=fc68362da932f9ce47e099180fad846f&language=it&query=",
  searchResultsFilms: [],
  searchResultsSeries: [],
  flags: ["en", "ja", "it", "fr", "de"],
});
