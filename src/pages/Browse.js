import React, { useState, useEffect } from "react";
import Sliders from "../components/slider/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import apiKey from "../utils/key";

export default function Browse() {
  const [movies, setMovies] = useState([]);
  const [trending, setTrend] = useState([]);

  useEffect(() => {
    const getData = async (e) => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=6a304f46872c2178f9aa2189cb4cda43`
        );
        const resP2 = await fetch(
          `https://api.themoviedb.org/3/movie/popular?language=en-US&page=2&api_key=6a304f46872c2178f9aa2189cb4cda43`
        );
        const resP3 = await fetch(
          `https://api.themoviedb.org/3/movie/popular?language=en-US&page=3&api_key=6a304f46872c2178f9aa2189cb4cda43`
        );
        const data = await res.json();
        const dataP2 = await resP2.json();
        const dataP3 = await resP3.json();

        const resTrend = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?language=en-US&&page=1&api_key=6a304f46872c2178f9aa2189cb4cda43`
        );
        const resTrend2 = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=2&api_key=6a304f46872c2178f9aa2189cb4cda43`
        );
        const resTrend3 = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=3&api_key=6a304f46872c2178f9aa2189cb4cda43`
        );
        const dataTrend = await resTrend.json();
        const dataTrend2 = await resTrend2.json();
        const dataTrend3 = await resTrend3.json();

        for (let i = 0; i < 20; i++) {
          data.results.push(dataP2.results[i]);
          if (data.results.length === 40) {
            for (let e = 0; e < 2; e++) {
              data.results.push(dataP3.results[e]);
            }
          }
        }

        for (let i = 0; i < 20; i++) {
          dataTrend.results.push(dataTrend2.results[i]);
          if (dataTrend.results.length === 40) {
            for (let e = 0; e < 2; e++) {
              dataTrend.results.push(dataTrend3.results[e]);
            }
          }
        }

        const settings = {
          infinite: false,
          draggable: false,
          speed: 500,
          slidesToShow: 6,
          slidesToScroll: 6,
          arrows: false,
        };

        data.results.push(settings);
        dataTrend.results.push(settings);

        setMovies(data.results);
        setTrend(dataTrend.results);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  return (
    <div className="slider">
      <h2 style={{ color: "lightgrey" }}> Popular on Copyflix</h2>
      <Sliders data={movies} />
      <div className="gap" />
      <h2 style={{ color: "lightgrey" }}> Trending Now</h2>
      <Sliders data={trending} />
    </div>
  );
}
