import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Icon } from "@iconify/react";
import chevronLeft from "@iconify/icons-mdi/chevron-left";
import chevronRight from "@iconify/icons-mdi/chevron-right";
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
      transform: scale(1.4) translateY(-67px)
        translateX(${(props) => (props.sliderX ? xAxis : (xAxis = "0"))});
      transition-delay: 400ms;
      user-select: none !important;
    }
  }
`;

const LeftButton = styled.button`
  position: absolute;
  display: block;

  border-radius: 3px;
  background-color: black;
  border: rgba(0, 0, 0, 0);
  opacity: 40%;

  align-items: center;
  justify-content: center;
  width: 4.3%;
  top: 0;
  height: 100%;
  left: -4vw;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};

  cursor: pointer;
  color: #ffffff;
  z-index: 1;

  &:hover {
    opacity: 60%;
  }
`;

const RightIcon = styled(Icon)`
  color: white;
  transition: transform 50ms linear;
  transform: scale(${(props) => (props.visible && props.scale ? "4.5" : "4")});
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
`;

const LeftIcon = styled(Icon)`
  color: white;
  transition: transform 50ms linear;
  transform: scale(${(props) => (props.visible && props.scale ? "4.5" : "4")});
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
`;

const RightButton = styled.button`
  position: absolute;
  display: flex;

  border-radius: 4px;
  background-color: black;
  border: rgba(0, 0, 0, 0);
  opacity: 40%;

  align-items: center;
  justify-content: center;
  width: 4.1%;
  top: 0;
  height: 100%;
  right: -4vw;

  cursor: pointer;
  color: #ffffff;
  z-index: 1;

  &:hover {
    opacity: 60%;
  }
`;

export default function Sliders(props) {
  const { data } = props;
  const [sliderState, setSliderState] = useState(false);
  const [sliderX, setSliderX] = useState(false);
  const [controlVisible, setControlVisible] = useState(false);
  const [arrowRightVisible, setArrowRightVisibile] = useState(false);
  const [arrowLeftVisible, setArrowLeftVisibile] = useState(false);
  const [scale, setScale] = useState(false);
  const slider = React.useRef(null);
  const sliceData = data.length - 1;
  const settings = data[sliceData];

  function onSlideChange() {
    slider?.current?.slickNext();
    data[sliceData].infinite = true;
    setSliderState(data[sliceData].infinite);
    setControlVisible(true);
    setArrowLeftVisibile(true);
  }

  function onBoxClick(id) {
    console.log("Box Clicked! - " + id.alt);
  }

  function onMouseOut() {
    setSliderX(false);
    setArrowRightVisibile(false);
    setArrowLeftVisibile(false);
  }

  function onHover(id) {
    xAxis = "0";
    setSliderState((data[sliceData].infinite = sliderState));
    setArrowRightVisibile(true);
    if (controlVisible === true) {
      setArrowLeftVisibile(true);
    }

    for (var index = 0; index < data.length - 1; index++) {
      if (Number(id.alt) === data[index].id) {
        xAxis = "0";
        if (index % 6 === 0) {
          setSliderX(true);
          xAxis = "45px";
        } else if (index % 6 === 5) {
          setSliderX(true);
          xAxis = "-45px";
        } else {
          setSliderX(false);
        }
      }
    }
  }

  function onArrowHover() {
    setArrowRightVisibile(true);
    if (controlVisible === true) {
      setArrowLeftVisibile(true);
    }
    setScale(true);
    setSliderState((data[sliceData].infinite = sliderState));
  }

  function onArrowExit() {
    setArrowRightVisibile(false);
    setArrowLeftVisibile(false);
    setScale(false);
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
                onMouseEnter={(e) => onHover(e.currentTarget)}
                onMouseOut={() => onMouseOut()}
              />
            </div>
          );
        })}
      </StyledSlider>
      <LeftButton
        onMouseOver={() => onArrowHover()}
        onMouseOut={() => onArrowExit()}
        visible={controlVisible}
        onClick={() => slider?.current?.slickPrev()}
      >
        <LeftIcon visible={arrowLeftVisible} scale={scale} icon={chevronLeft} />
      </LeftButton>
      <RightButton
        onMouseOver={() => onArrowHover()}
        onMouseOut={() => onArrowExit()}
        onClick={() => onSlideChange()}
      >
        <RightIcon
          visible={arrowRightVisible}
          scale={scale}
          icon={chevronRight}
        />
      </RightButton>
    </div>
  );
}
