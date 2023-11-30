import React, { useState } from "react";
import { Icon } from "@iconify/react";
import chevronLeft from "@iconify/icons-mdi/chevron-left";
import styled from "styled-components";

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

const LeftIcon = styled(Icon)`
  color: white;
  transition: transform 50ms linear;
  visibility: ${(props) =>
    props.visible || props.visiblearrow ? "visible" : "hidden"};
  transform: scale(${(props) => (props.visible && props.scale ? "5" : "4")});
`;

export default function LeftControl(props) {
  const { slider, visible, onHover, leftArrowHover } = props;
  const [arrowLeftVisible, setArrowLeftVisibile] = useState(false);
  const [scale, setScale] = useState(false);

  function onArrowHover() {
    if (visible === true) {
      setArrowLeftVisibile(visible);
    }
    leftArrowHover(true);
    setScale(true);
  }

  function onArrowExit() {
    setArrowLeftVisibile(false);
    leftArrowHover(false);
    setScale(false);
  }

  return (
    <LeftButton
      onMouseOver={() => onArrowHover()}
      onMouseOut={() => onArrowExit()}
      visible={visible}
      onClick={() => slider?.current?.slickPrev()}
    >
      <LeftIcon
        visible={arrowLeftVisible}
        visiblearrow={onHover}
        scale={scale}
        icon={chevronLeft}
      />
    </LeftButton>
  );
}
