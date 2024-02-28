import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import LeftControl from "../slider-control/LeftControl";
import RightControl from "../slider-control/RightControl";
import styled from "styled-components";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Skeleton } from "@mui/material";

var xAxis = "0";
var boxIndex = "0";
var findLastSlideAmount = "0";
const StyledSlider = styled(Slider)`
  .slick-slide {
    z-index: 10000;
    box-sizing: border-box;
    transition: box-shadow 500ms, transform 200ms ease-in-out;
    user-select: none !important;
    &:hover {
      transform: scale(1.4) translateY(-30%)
        translateX(${(props) => (props.sliderTranslateX ? xAxis : xAxis)});
      transition-delay: 400ms;
      user-select: none !important;
    }
  }
`;

export default function Sliders(props) {
  const { data, index, diffData, updateData, checkLoad } = props;
  const [mediaData, setMediaData] = useState(data);
  const [sliderState, setSliderState] = useState(false);
  const [sliderTranslateX, setSliderTranslateX] = useState(false);
  const [controlVisible, setControlVisible] = useState(false);
  const [visibleRightArrows, setVisibleRightArrows] = useState(false);
  const [visibleLeftArrows, setVisibleLeftArrows] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const slider = useRef(null);
  const sliceData = data.length - 1;
  const settings = data[sliceData];

  // When the user presses next on the slider, this function sets the slider to
  // infinite scroll.
  // It clones the original dataset and finds the index of which slider has been changed.
  // It then updates the original data with new data. This prevents any state bugs since
  // all sliders share the same states.
  function onSlideChange(infi, i) {
    const clonedData = JSON.parse(JSON.stringify(diffData));
    clonedData[i][sliceData].infinite = infi;
    updateData(clonedData);
    setSliderState(clonedData[i][sliceData].infinite);
    setControlVisible(infi);
  }

  function onBoxClick(id) {
    console.log("Box Clicked! - " + id);
  }

  function onMouseLeave() {
    setSliderTranslateX(false);
    setVisibleRightArrows(false);
    setVisibleLeftArrows(false);
  }

  function onHoverRight(arrowState) {
    if (controlVisible === true) {
      setVisibleLeftArrows(arrowState);
    }
  }

  function onHoverLeft(arrowState) {
    setVisibleRightArrows(arrowState);
  }

  const onHover = (id) => {
    setVisibleRightArrows(true);

    if (controlVisible === true) {
      setVisibleLeftArrows(true);
    }

    for (let index = 0; index < data.length - 1; index++) {
      if (Number(id.alt) === data[index].id) {
        boxIndex = index + 1;
        console.log(index);

        // Calculates where the first and last index on each slide and adjusts the css accordingly
        // also determines if it is on the last slide.
        if (activeSlide + 6 > sliceData) {
          findLastSlideAmount = Math.abs(activeSlide - sliceData);
          console.log(
            "index if adjusting for uneven: " +
              ((index - findLastSlideAmount) % 6)
          );
          if ((index - findLastSlideAmount) % 6 === 0) {
            setSliderTranslateX(true);
            xAxis = "14%";
          } else if ((index - findLastSlideAmount) % 6 === 5) {
            setSliderTranslateX(true);
            xAxis = "-14%";
          } else {
            setSliderTranslateX(false);
            xAxis = "0";
          }
        } else {
          if (index % 6 === 0) {
            setSliderTranslateX(true);
            xAxis = "14%";
          } else if (index % 6 === 5) {
            setSliderTranslateX(true);
            xAxis = "-14%";
          } else {
            setSliderTranslateX(false);
            xAxis = "0";
          }
        }
      }
    }
  };

  const imageLoad = () => {
    setLoaded(true);
  };

  return (
    <div style={{ position: "relative" }}>
      <Grid container wrap="nowrap">
        {!loaded &&
          Array.from(new Array(6)).map((item, index) => (
            <Box key={index} sx={{ width: "100%", marginRight: 1, my: 0}}>
              <Skeleton
                sx={{
                  bgcolor: "grey.900",
                  paddingBottom: "90%",
                  paddingTop: "50%",
                }}
                width={"100%"}
                variant="rectangular"
              />
            </Box>
          ))}
      </Grid>
      <StyledSlider
        sliderTranslateX={sliderTranslateX}
        boxHover={visibleRightArrows}
        ref={slider}
        {...settings}
        beforeChange={(current, next) => {
          setActiveSlide(next);
        }}
      >
        {mediaData.slice(0, sliceData).map((data) => (
          <div className="box">
            <img
              className="box img"
              style={loaded ? {} : { display: "none" }}
              src={`https://image.tmdb.org/t/p/w780${data.poster_path}`}
              alt={data.id}
              onClick={() => onBoxClick(data)}
              onMouseOver={(e) => onHover(e.currentTarget)}
              onMouseLeave={() => onMouseLeave()}
              onLoad={imageLoad}
              loading="lazy"
            />
            <div className="box text">
              <div class="icons">
                <button>Play</button>
                <button>Add to list</button>
                <button>Rate</button>
                <button>More Info</button>
              </div>
              <div class="info">
                <span class="match">98% Match</span>
                <span class="rating">18+</span>
                <span class="match">5 Seasons</span>
                <p class="genres">{data.original_title}</p>
                <p class="genres">genre 1 genre 2 genre 3</p>
              </div>
            </div>
            {/* <ImageRender
                data={data}
                onHover={(e) => onHover(e)}
                onMouseLeave={() => onMouseLeave()}
              ></ImageRender> */}
          </div>
        ))}
      </StyledSlider>
      <LeftControl
        slider={slider}
        visible={sliderState}
        onHover={visibleLeftArrows}
        leftArrowHover={(arrowState) => onHoverLeft(arrowState)}
      />
      <RightControl
        skeletonVisible={loaded}
        slider={slider}
        slideChange={(infi, i) => onSlideChange(infi, i)}
        onHover={visibleRightArrows}
        slideIndex={index - 1}
        rightArrowHover={(arrowState) => onHoverRight(arrowState)}
      />
    </div>
  );
}
