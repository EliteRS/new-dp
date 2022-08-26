import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import images from "../../images";
import "./style.scss";

const Carousel = () => {
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);
  // 21760 1352
  return (
    <section className="car-appendix" data-scroll-section>
    <h1 className="car-carousel-h1">APPENDIX</h1>
      <motion.div ref={carousel} className="car-carousel" whileTap={{cursor: "grabbing"}}>
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="car-inner-carousel"
        >
          {images.map((image, index) => {
            return (
              <motion.div className="car-item" key={index}>
                <img src={image} alt="Documentations "></img>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Carousel;
