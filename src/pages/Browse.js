import React, { useState, useEffect } from "react";
import Sliders from "../components/slider/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  getGenres,
  getPopularMovies,
  getTrending,
  getBrowseData,
} from "../data/data";

export default function Browse() {
  const [movies, setMovies] = useState([]);
  const [trending, setTrend] = useState([]);
  const [genre, setGenre] = useState([]);
  const [diffData, setDiffData] = useState([]);
  let rand = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

  function shuffle(o) {
    for (
      var j, x, i = o.length;
      i;
      j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
    );
    return o;
  }
  var random = shuffle(rand);

  useEffect(() => {
    const getData = async (e) => {
      try {
        const settings = {
          infinite: false,
          draggable: false,
          speed: 500,
          slidesToShow: 6,
          slidesToScroll: 6,
          arrows: false,
          responsive: [
            {
              breakpoint: 800,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 5,
              },
            },
            {
              breakpoint: 700,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              },
            },
            {
              breakpoint: 500,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
          ],
        };
        const [data, data2, data3] = await getPopularMovies();
        const [trend, trend2, trend3] = await getTrending();
        const genreGet = await getGenres();
        var browse = [];

        for (let i = 0; i < 20; i++) {
          data.push(data2[i]);
          if (data.length === 40) {
            for (let e = 0; e < 2; e++) {
              data.push(data3[e]);
            }
          }
        }

        for (let i = 0; i < 20; i++) {
          trend.push(trend2[i]);
          if (trend.length === 40) {
            for (let e = 0; e < 2; e++) {
              trend.push(trend3[e]);
            }
          }
        }

        for (var i = 0; i < 19; i++) {
          browse.push(genreGet.genres[random[i]]);
        }
        const genreMovies = await getBrowseData(browse);

        data.push(settings);
        trend.push(settings);

        for (let i = 0; i < genreMovies.length; i++) {
          genreMovies[i].push(settings);
        }

        setGenre(browse);
        setMovies(data);
        setTrend(trend);
        setDiffData(genreMovies);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  function updateData(newData) {
    setDiffData(newData);
  }

  return (
    <div>
      <div className="slider">
        {/* <h2 style={{ color: "lightgrey" }}> Popular on Copyflix</h2>
      <Sliders data={movies} index={0} diffData={diffData} />
      <div className="gap" />
      <h2 style={{ color: "lightgrey" }}> Trending Now</h2>
    <Sliders data={trending} index={1} diffData={diffData} /> */}
        {diffData.map((movie, i = 0) => {
          return [
            <div>
              <div className="gap" />
              <h2 style={{ color: "lightgrey" }}>{genre[i++].name} Movies</h2>
              <Sliders
                data={movie}
                index={i++}
                diffData={diffData}
                updateData={(newData) => updateData(newData)}
              />
            </div>,
          ];
        })}
        <div>
          <h2>hello i am footer</h2>
        </div>
      </div>
    </div>
  );
}
