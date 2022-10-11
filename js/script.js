const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "78dec1f8e721c138fea01530c676d001";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const SEARCH = `${BASE_URL}/search/movie?api_key=78dec1f8e721c138fea01530c676d001`;
const API_URL =
  BASE_URL +
  "/discover/movie?api_key=78dec1f8e721c138fea01530c676d001&sort_by=popularity.desc";

const main = document.getElementById("list-movie");
const form = document.getElementById("form");
const search = document.getElementById("search");

let getMovies = (API_URL) => {
  fetch(API_URL)
    .then((res) => res.json())
    .then((listMovie) => {
      console.log(listMovie.results);
      showMovies(listMovie.results);
    });
};

getMovies(API_URL);

let showMovies = (listMovie) => {
  main.innerHTML = "";
  listMovie.forEach((item) => {
    const containerMovie = document.getElementById("list-movie");
    const { title, poster_path, vote_average, release_date } = item;
    containerMovie.innerHTML += `
        <div class="col-md-3">
        <div class="card mx-auto">
            <img src="${
              IMG_URL + poster_path
            }" class="card-img-top" alt="${title}">
            <div class="card-title d-flex">
                <p class="judul-film">${title}</p>
                <p class="rating ms-auto ${getColor(
                  vote_average
                )}">${vote_average}</p>
            </div>
            <div class="card-date">
                <p>${release_date}</p>
            </div>
        </div>
    </div>`;
  });
};

function getColor(vote) {
  if (vote >= 7) {
    return "text-success";
  } else if (vote >= 5) {
    return "text-warning";
  } else {
    return "text-danger";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputSearch = search.value;
  if (inputSearch) {
    let searchMovies = () => {
      fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${inputSearch}&page=1`
      )
        .then((res) => res.json())
        .then((listMovie) => {
          console.log(listMovie.results);
          showMovies(listMovie.results);
        });
    };
    searchMovies();
  } else {
    getMovies(API_URL);
  }
});
