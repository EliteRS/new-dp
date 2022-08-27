import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import useOnScreen from "../../hooks/useOnScreen";
import cn from "classnames";
// import images from "../../pics"

import "./style.scss";
// import images from "../../pics";
const images = [
  {
    src: "../../../pics/dept2.png",
    // "https://images.unsplash.com/photo-1566204773863-cf63e6d4ab88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1345&q=100",
    //title: "III",
    // subtitle: "III",
    //category: "III",
  },
  {
    src: "../../../pics/exp3.png",
    // "https://images.unsplash.com/photo-1558603668-6570496b66f8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1300&q=100"
    // title: "Cereus Penuvianus",
    // subtitle: "Live the Beauty",
    // category: "Shooting / Adv.Campaing",
  },
  {
    src: "../../../pics/overall3.png",
    //   "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=934&q=100",
    // title: "Calliope",
    // subtitle: "Live the Beauty",
    // category: "Shooting / Adv.Campaing",
  },
  {
    src: "../../../pics/est2.png",
    //   "https://images.unsplash.com/photo-1611145367651-6303b46e4040?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2006&q=100",
    // title: "Golden Pothos",
    // subtitle: "Living Room",
    // category: "Shooting / Adv.Campaing",
  },
];
function GalleryItem({
  src,
  category,
  subtitle,
  title,
  updateActiveImage,
  index,
}) {
  const ref = useRef(null);

  const onScreen = useOnScreen(ref, 0.5);

  useEffect(() => {
    if (onScreen) {
      updateActiveImage(index);
    }
  }, [onScreen, updateActiveImage]);

  return (
    <div className="wrapper">
      <div
        className={cn("gallery-item-wrapper", { "is-reveal": onScreen })}
        ref={ref}
      >
        <div></div>
        <div className="gallery-item">
          <div className="gallery-item-info">
            <h1 className="gallery-info-title">{title}</h1>
            <h2 className="gallery-info-subtitle">{subtitle}</h2>
            <p className="gallery-info-category">{category}</p>
          </div>
          <div
            className="gallery-item-image"
            style={{ backgroundImage: `url(${src})` }}
          ></div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default function Gallery({ src, index, columnOffset }) {
  const [activeImage, setActiveImage] = useState(1);

  const ref = useRef(null);

  useEffect(() => {
    // This does not seem to work without a settimeout
    setTimeout(() => {
      console.log(ref.current.offsetWidth);
      console.log(ref.current.clientWidth);
      console.log({ current: ref.current });
      gsap.registerPlugin(ScrollTrigger);

      let sections = gsap.utils.toArray(".gallery-item-wrapper");
      let maxWidth = 0;

      const getMaxWidth = () => {
        maxWidth = 0;
        sections.forEach((section) => {
          maxWidth += section.offsetWidth;
          maxWidth += gsap.getProperty(section, "marginLeft");
        });
        maxWidth += 20;
        maxWidth += window.innerWidth;
        maxWidth -= sections[0].offsetWidth;
        return maxWidth;
      };

      getMaxWidth();
      ScrollTrigger.addEventListener("refreshInit", getMaxWidth);

      gsap.set("section.spacer", {
        minHeight:
          window.innerHeight -
          document.querySelector(".gallery-item-wrapper").offsetHeight,
      });

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".gallery-item-wrapper",
          scroller: "#main-container",
          pin: ".wrapper",
          pinSpacer: false,
          // pinSpace: false,
          // markers: true,
          scrub: 0.5,
          snap: 1 / (sections.length - 1),
          end: () => `+=${maxWidth}`,
          invalidateOnRefresh: true,
          // end: "200%",
        },
      });


      sections.forEach((sct, i) => {
        ScrollTrigger.create({
          trigger: sct,
          start: () => 'top top-=' + (sct.offsetLeft - window.innerWidth / 2) * (maxWidth / (maxWidth - window.innerWidth)),
          end: () => '+=' + sct.offsetWidth * (maxWidth / (maxWidth - window.innerWidth)),
          toggleClass: { targets: sct, className: "active" } });
      
      });
      
      
      ScrollTrigger.refresh();
      
    });
  }, []);

  const handleUpdateActiveImage = (index) => {
    setActiveImage(index + 1);
  };

  return (
    <section data-scroll-section className="section-wrapper gallery-wrap">
     <div className="wrapper">
        <div className="gallery" ref={ref}>
          <div className="gallery-counter">
            <h2 style={{ color: "white", marginBottom: "30px" }}>
              Scroll to discover more
            </h2>
            <span>{activeImage}</span>
            <span className="divider" />
            <span>{images.length}</span>
          </div>
          {images.map((image, index) => (
            <GalleryItem
              key={index}
              index={index}
              {...image}
              updateActiveImage={handleUpdateActiveImage}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
