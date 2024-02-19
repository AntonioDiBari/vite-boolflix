import { reactive } from "vue";

export const store = reactive({
  research: { userResearch: "", firstResearch: true },
  noFilmFinded: false,
  noSerieFinded: false,
  apiUriFilms:
    "https://api.themoviedb.org/3/search/movie?api_key=fc68362da932f9ce47e099180fad846f&language=it&query= ",
  apiUriSeries:
    "https://api.themoviedb.org/3/search/tv?api_key=fc68362da932f9ce47e099180fad846f&language=it&query=",
  apiCredits: "https://api.themoviedb.org/3/",
  searchResultsFilms: [],
  searchResultsSeries: [],
  genres: {
    film: [],
    tv: [],
  },
  apiUriGenresFilm:
    "https://api.themoviedb.org/3/genre/movie/list?api_key=fc68362da932f9ce47e099180fad846f",
  apiUriGenresSeries:
    "https://api.themoviedb.org/3/genre/tv/list?api_key=fc68362da932f9ce47e099180fad846f",
  flags: ["en", "ja", "it", "fr", "de"],
});
