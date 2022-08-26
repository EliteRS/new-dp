import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import images from "../../pics";
import "./styles.scss";

const Docs = () => {
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);
  // 21760 1352
  return (
    <section className="docs-appendix" data-scroll-section>
    <h1 className="docs-carousel-h1">Grab & Swipe to see more</h1>
      <motion.div ref={carousel} className="docs-carousel" whileTap={{cursor: "grabbing"}}>
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="docs-inner-carousel"
        >
          {images.map((image, index) => {
            return (
              <motion.div className="docs-item" key={index}>
                <img src={image} alt="Documentations "></img>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Docs;
