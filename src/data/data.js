import apiKey from "../utils/key";

export async function getGenres() {
  try {
    const resGenre = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${apiKey}`
    );
    const dataGenre = await resGenre.json();

    return dataGenre;
  } catch (err) {
    console.log(err);
  }
}

export async function getPopularMovies() {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${apiKey}`
    );
    const resP2 = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=2&api_key=${apiKey}`
    );
    const resP3 = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=3&api_key=${apiKey}`
    );
    const data = await res.json();
    const dataP2 = await resP2.json();
    const dataP3 = await resP3.json();

    return [data.results, dataP2.results, dataP3.results];
  } catch (err) {
    console.log(err);
  }
}

export async function getTrending() {
  try {
    const resTrend = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?language=en-US&&page=1&api_key=${apiKey}`
    );
    const resTrend2 = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=2&api_key=${apiKey}`
    );
    const resTrend3 = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=3&api_key=${apiKey}`
    );
    const dataTrend = await resTrend.json();
    const dataTrend2 = await resTrend2.json();
    const dataTrend3 = await resTrend3.json();

    return [dataTrend.results, dataTrend2.results, dataTrend3.results];
  } catch (err) {
    console.log(err);
  }
}
export async function getBrowseData(genreID) {
  var res = null;
  var data = null;
  var browseData = [];
  for (var i = 0; i < genreID.length - 1; i++) {
    res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=1&with_genres=${genreID[i].id}`
    );
    // const res2 = await fetch(
    //   `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=2&with_genres=${genreID}`
    // );
    // const res3 = await fetch(
    //   `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=3&with_genres=${genreID}`
    // );
    data = await res.json();
    // const data2 = await res2.json();
    // const data3 = await res3.json();.
    browseData.push(data.results);
  }

  return browseData;
}
