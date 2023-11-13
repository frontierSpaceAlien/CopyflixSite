import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Icon } from "@iconify/react";
import chevronLeft from "@iconify/icons-mdi/chevron-left";
import chevronRight from "@iconify/icons-mdi/chevron-right";
import chevronDownCircleOutline from "@iconify/icons-mdi/chevron-down-circle-outline";
import styled from "styled-components";

var xAxis = "0";
const StyledSlider = styled(Slider)`
  .img {
    width: 100%;
    transition: transform 200ms ease-in-out;
    border-radius: 4px;
    user-select: none;
    &:hover {
      transition: box-shadow 500ms transform 200ms ease-out;
      box-shadow: 0px 0px 5px 0px #000000;
      transform: scale(1.4) translateY(-54px)
        translateX(${(props) => (props.sliderX ? xAxis : (xAxis = "0"))});
      transition-delay: 400ms;
      user-select: none !important;
    }
  }
`;

export default function Sliders(props) {
  const { data } = props;
  const [sliderState, setSliderState] = useState(false);
  const [sliderX, setSliderX] = useState(false);
  const slider = React.useRef(null);
  const sliceData = data.length - 1;
  const settings = data[sliceData];

  function onSlideChange() {
    slider?.current?.slickNext();
    data[sliceData].infinite = true;
    setSliderState(data[sliceData].infinite);
  }

  function onBoxClick(id) {
    console.log("Box Clicked! - " + id.alt);
  }

  function onMouseOut() {
    setSliderX(false);
  }

  function onHover(id) {
    xAxis = "0";
    setSliderState((data[sliceData].infinite = sliderState));
    console.log("slider State = " + sliderState);
    console.log("infinte in array = " + data[sliceData].infinite);

    for (var index = 0; index < data.length - 1; index++) {
      if (Number(id.alt) === data[index].id) {
        xAxis = "0";
        if (index % 6 === 0) {
          setSliderX(true);
          xAxis = "40px";
        } else if (index % 6 === 5) {
          setSliderX(true);
          xAxis = "-40px";
        } else {
          setSliderX(false);
        }
      }
    }
  }

  return (
    <div style={{ position: "relative" }}>
      <StyledSlider sliderX={sliderX} ref={slider} {...settings}>
        {data.slice(0, sliceData).map((data) => {
          return (
            <div>
              <img
                className="img"
                src={`https://image.tmdb.org/t/p/w780${data.backdrop_path}`}
                alt={data.id}
                onClick={(e) => onBoxClick(e.currentTarget)}
                onMouseOver={(e) => onHover(e.currentTarget)}
                onMouseOut={() => onMouseOut()}
              />
            </div>
          );
        })}
      </StyledSlider>
      <button
        className="slider-left"
        onClick={() => slider?.current?.slickPrev()}
      >
        <Icon className="arrow-icon" icon={chevronLeft}></Icon>
      </button>
      <button className="slider-right" onClick={() => onSlideChange()}>
        <Icon className="arrow-icon" icon={chevronRight}></Icon>
      </button>
    </div>
  );
}
