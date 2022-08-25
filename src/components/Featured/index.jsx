import React from "react";
import photos from "../../data";
import "./style.scss";

export default function Featured() {
  const [firstImage] = photos;
  return (
    <section className="featured-section"  data-scroll-section>
      <div className="featured-row-layout">
       
        <img src={firstImage} alt="logo" data-scroll/>
      </div>
    </section>
  );
}