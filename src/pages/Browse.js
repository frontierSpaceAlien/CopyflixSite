import React, { Component, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import apiKey from "../utils/key";

require("../scss/App.scss");

export default function Browse() {
  const [movies, setMovies] = useState([]);
  const [trending, setTrend] = useState([]);
  const [sliderState, setSliderState] = useState(false);

  useEffect(() => {
    const getData = async (e) => {
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
        setMovies(data.results);
        setTrend(dataTrend.results);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);
  const settings = {
    infinite: sliderState,
    draggable: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
  };

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;

    console.log(onClick);

    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }

  function onBoxClick(id) {
    console.log("Box Clicked! - " + id.alt);
    console.log(document.getElementById("p"));
  }

  return (
    <div className="slider">
      <h2 style={{ color: "lightgrey" }}> Popular on Copyflix</h2>
      <Slider {...settings}>
        {movies.map((movie) => {
          return (
            <div>
              <img
                className="slideImage"
                src={`http://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
                alt={movie.title}
                onClick={(e) => onBoxClick(e.currentTarget)}
              />
            </div>
          );
        })}
      </Slider>
      <div className="gap" />
      <h2 style={{ color: "lightgrey" }}> Trending Now</h2>
      <Slider {...settings}>
        {trending.map((trend) => {
          return (
            <img
              className="slideImage"
              src={`http://image.tmdb.org/t/p/w780${trend.backdrop_path}`}
              alt={trend.title}
              onClick={(e) => onBoxClick(e.currentTarget)}
            />
          );
        })}
      </Slider>
    </div>
  );
}
