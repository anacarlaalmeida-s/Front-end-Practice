//galeria
const moviesGallery = document.querySelector(".movies");
const btnPreview = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

const promiseMovies = fetch(
  "https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false"
);
promiseMovies.then(function (data) {
  const promiseData = data.json();
  promiseData.then(function (response) {
    let firstMovie = 0;
    let lastMovie = 5;
    let maxMovies = 15;
    const moviesArray = response.results;

    function moviesShown(movies) {
      const inGallery = movies.slice(firstMovie, lastMovie);
      inGallery.forEach(function (item) {
        const id = item.id;

        const divMovie = document.createElement("div");
        divMovie.classList.add("movie");
        divMovie.style.backgroundImage = `url(${item.poster_path})`;

        const divInfo = document.createElement("div");
        divInfo.classList.add("movie__info");

        const titulo = document.createElement("span");
        titulo.classList.add("movie__title");
        titulo.textContent = item.title;

        const imgScore = document.createElement("img");
        imgScore.src = "./assets/estrela.svg";

        const score = document.createElement("span");
        score.classList.add("movie__rating");
        score.textContent = item.vote_average;

        divInfo.append(titulo, imgScore, score);
        divMovie.append(divInfo);
        moviesGallery.append(divMovie);

        //modal
        const modal = document.querySelector(".modal");
        const modalTitle = document.querySelector(".modal__title");
        const modalImg = document.querySelector(".modal__img");
        const modalSinopse = document.querySelector(".modal__description");
        const modalClose = document.querySelector(".modal__close");

        divMovie.addEventListener("click", function abrirModal() {
          modal.classList.remove("hidden");

          fetch(
            `https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${id}?language=pt-BR`
          ).then(function (resposta) {
            const promiseResposta = resposta.json();

            promiseResposta.then(function (resposta) {
              modalTitle.textContent = resposta.title;
              modalImg.style.backgroundImage = `url(${resposta.backdrop_path})`;
              modalSinopse.textContent = resposta.overview;
            });
          });
        });

        modalClose.addEventListener("click", function () {
          modal.classList.add("hidden");
        });

        modalImg.addEventListener("click", function (event) {
          event.stopPropagation();
        });
      });
    }
    moviesShown(moviesArray);

    btnNext.addEventListener("click", function () {
      const divMovie = document.querySelectorAll(".movie");
      divMovie.forEach((div) => {
        div.remove();
      });
      firstMovie += 5;
      lastMovie += 5;

      if (firstMovie < maxMovies + 5) {
        moviesShown(moviesArray);
      } else {
        firstMovie = 0;
        lastMovie = 5;
        moviesShown(moviesArray);
      }
    });

    btnPreview.addEventListener("click", function () {
      const divMovie = document.querySelectorAll(".movie");
      divMovie.forEach((div) => {
        div.remove();
      });
      firstMovie -= 5;
      lastMovie -= 5;

      if (firstMovie > -1) {
        moviesShown(moviesArray);
      } else {
        firstMovie = 15;
        lastMovie = 15 + 5;
        moviesShown(moviesArray);
      }
    });

    //busca de filmes
    const input = document.querySelector(".input");

    input.addEventListener("keydown", function (event) {
      if (
        event.code === "Enter" ||
        (event.code === "NumpadEnter" && input.value !== "")
      ) {
        fetch(
          `https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false&query=${input.value}`
        ).then(function (resposta) {
          const promiseResposta = resposta.json();

          promiseResposta.then(function (resposta) {
            const divMovie = document.querySelectorAll(".movie");
            divMovie.forEach((div) => {
              div.remove();
            });

            let firstReturn = 0;
            let maxReturn = 15;
            const searchedArray = resposta.results;

            moviesShown(searchedArray);

            btnNext.addEventListener("click", function () {
              const divMovie = document.querySelectorAll(".movie");
              divMovie.forEach((div) => {
                div.remove();
              });

              firstReturn += 5;

              if (firstReturn < maxReturn + 5) {
                moviesShown(searchedArray);
              } else {
                firstReturn = 0;
                maxReturn = 5;
                moviesShown(searchedArray);
              }
            });

            btnPreview.addEventListener("click", function () {
              const divMovie = document.querySelectorAll(".movie");
              divMovie.forEach((div) => {
                div.remove();
              });
              firstReturn -= 5;

              if (firstReturn > -1) {
                moviesShown(searchedArray);
              } else {
                firstReturn = 15;
                moviesShown(searchedArray);
              }
            });
            moviesShown();
          });
        });

        input.value = "";
        input.addEventListener("keydown", function (event) {
          if (
            event.code === "Enter" ||
            (event.code === "NumpadEnter" && !input.value)
          ) {
            location.reload();
          }
        });
      }
    });
  });
});

//filme do dia
const movieImage = document.querySelector(".highlight__video");
const titleMovie = document.querySelector(".highlight__title");
const ratingMovie = document.querySelector(".highlight__rating");
const genre = document.querySelector(".highlight__genres");
const dateMovie = document.querySelector(".highlight__launch");
const sinopse = document.querySelector(".highlight__description");

fetch(
  "https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR"
).then(function (resposta) {
  const promiseResposta = resposta.json();

  promiseResposta.then(function (resposta) {
    movieImage.style.backgroundImage = `url(${resposta.backdrop_path})`;
    titleMovie.textContent = resposta.title;
    ratingMovie.textContent = resposta.vote_average;
    for (let item of resposta.genres) {
      const generos = document.createElement("span");
      generos.classList.add("highlight__genres");
      generos.textContent = `${item.name}, `;
      genre.append(generos);
    }
    dateMovie.textContent = `${resposta.release_date
      .substr(0, 10)
      .split("-")
      .reverse()
      .join("-")}`;
    sinopse.textContent = resposta.overview;
  });
});

const movieLink = document.querySelector(".highlight__video-link");

//trailer do filme do dia
fetch(
  "https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR"
).then(function (resposta) {
  const promiseResposta = resposta.json();

  promiseResposta.then(function (resposta) {
    movieLink.href = `https://www.youtube.com/watch?v=${resposta.results[0].key}`;
  });
});


//modo light e dark
const body = document.querySelector("body");
const themeButton = document.querySelector(".btn-theme");

themeButton.addEventListener("click", function () {
  let imgValue = themeButton.attributes[1];
  let preview = btnPreview.attributes[1];
  let next = btnNext.attributes[1];

  imgValue.textContent === "./assets/dark-mode.svg"
    ? (imgValue.textContent = "./assets/light-mode.svg")
    : (imgValue.textContent = "./assets/dark-mode.svg");

  if (preview.textContent === "./assets/seta-esquerda-preta.svg") {
    preview.textContent = "./assets/seta-esquerda-branca.svg";
  } else if (preview.textContent === "./assets/seta-esquerda-branca.svg") {
    preview.textContent = "./assets/seta-esquerda-preta.svg";
  }

  if (next.textContent === "./assets/seta-direita-preta.svg") {
    next.textContent = "./assets/seta-direita-branca.svg";
  } else if (next.textContent === "./assets/seta-direita-branca.svg") {
    next.textContent = "./assets/seta-direita-preta.svg";
  }

  body.style.setProperty(
    "--cor-de-fundo",
    body.style.getPropertyValue("--cor-de-fundo") === "#242424"
      ? "#E5E5E5"
      : "#242424"
  );
  body.style.setProperty(
    "--cor-do-texto",
    body.style.getPropertyValue("--cor-do-texto") === "#FFFFFF"
      ? "#000"
      : "#FFFFFF"
  );
});
