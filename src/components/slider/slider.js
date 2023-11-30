import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import LeftControl from "../slider-control/LeftControl";
import RightControl from "../slider-control/RightControl";
import styled from "styled-components";
import ImageRender from "../ImageRender";

var xAxis = "0";
var findLastSlideAmount = "0";
const StyledSlider = styled(Slider)`
  .slick-slide {
    padding: 0 3px;
    box-sizing: border-box;
    transition: box-shadow 500ms, transform 200ms ease-in-out;
    user-select: none !important;
    overflow: visible !important;
    &:hover {
      transform: scale(1.4) translateY(-34%)
        translateX(${(props) => (props.sliderTranslateX ? xAxis : xAxis)});
      transition-delay: 400ms;
      user-select: none !important;
    }
  }
`;

export default function Sliders(props) {
  const { data, index, diffData, updateData } = props;
  const [mediaData, setMediaData] = useState(data);
  const [sliderState, setSliderState] = useState(false);
  const [sliderTranslateX, setSliderTranslateX] = useState(false);
  const [controlVisible, setControlVisible] = useState(false);
  const [visibleRightArrows, setVisibleRightArrows] = useState(false);
  const [visibleLeftArrows, setVisibleLeftArrows] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const slider = useRef(null);
  const sliceData = data.length - 1;
  const settings = data[sliceData];

  // When the user presses next on the slider, this function sets the slider to
  // infinite scroll.
  // It clones the original dataset and finds the index of which slider has been changed.
  // It then updates the original data with new data. This prevents any state bugs since
  // all sliders share the same states.
  function onSlideChange(infi, i) {
    const listLocker = JSON.parse(JSON.stringify(diffData));
    listLocker[i][sliceData].infinite = infi;
    updateData(listLocker);
    setSliderState(listLocker[i][sliceData].infinite);
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
        // checks for uneven slide count and adjusts the css accordingly
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

  return (
    <div style={{ position: "relative" }}>
      <StyledSlider
        sliderTranslateX={sliderTranslateX}
        ref={slider}
        {...settings}
        beforeChange={(current, next) => {
          setActiveSlide(next);
        }}
      >
        {mediaData.slice(0, sliceData).map((data) => (
          <div>
            <div>
              <img
                className="img"
                src={`https://image.tmdb.org/t/p/w780${data.backdrop_path}`}
                alt={data.id}
                onClick={(e) => onBoxClick(e.currentTarget)}
                onMouseEnter={(e) => onHover(e.currentTarget)}
                onMouseLeave={() => onMouseLeave()}
              />
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
        slider={slider}
        slideChange={(infi, i) => onSlideChange(infi, i)}
        onHover={visibleRightArrows}
        slideIndex={index - 1}
        rightArrowHover={(arrowState) => onHoverRight(arrowState)}
      />
    </div>
  );
}
