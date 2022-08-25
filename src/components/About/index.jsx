import React, { useEffect, useRef, useState } from "react";
import cn from "classnames";

import SectionHeader from "../SectionHeader";

import gsap from "gsap";
import SplitText from "../../utils/Split3.min";
import useOnScreen from "../../hooks/useOnScreen";

import "./style.scss";

export default function About() {
  const ref = useRef(null);

  const [reveal, setReveal] = useState(false);
  const onScreen = useOnScreen(ref);

  useEffect(() => {
    if (onScreen) setReveal(onScreen);
  }, [onScreen]);

  useEffect(() => {
    if (reveal) {
      const split = new SplitText("#headline", { type: "lines" });

      gsap.to(split.lines, {
        duration: 1,
        y: -20,
        opacity: 1,
        stagger: 0.1,
        ease: "power4.out",
        // onComplete: () => split.revert(),
      });
    }
  }, [reveal]);

  return (
    <section
      className={cn("about-section", { "is-reveal": reveal })}
      data-scroll-section
    >
      <SectionHeader title="Company Profile" />
      {/* <h2 className="title-h2">Company Profile</h2> */}
      <h1 className="company-h1">Sun*</h1> 
      <p ref={ref} id="headline" className={cn({ "is-reveal": reveal })}>
        is a Japanese-owned Digital Creative Studio to support many startups & new businesses of enterprise companies. Founded on March 2013, a Japanese IT startup company that has a global team of over 1,000 digital creators such as business producers, service designers, UX designers, and software developers across 4 countries in Asia.
      </p>
    </section>
  );
}