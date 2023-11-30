import React, { useState } from "react";

export default function ImageButton(props) {
  const { data, onHover, onMouseLeave } = props;

  function onImageHover(targetValue) {
    onHover(targetValue);
  }

  return (
    <div>
      <img
        className="img"
        src={`https://image.tmdb.org/t/p/w780${data.backdrop_path}`}
        alt={data.id}
        // onClick={(e) => onBoxClick(e.currentTarget)}
        onMouseEnter={(e) => onImageHover(e.currentTarget)}
        onMouseLeave={() => onMouseLeave()}
      />
    </div>
  );
}
