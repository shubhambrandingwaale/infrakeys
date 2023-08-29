import React from "react";
import HeroSlider from "./HeroSlider";
import AboutHome from "./AboutHome";

export default function Hero() {
  return (
    <>
      <section className="hero">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-7">
              <HeroSlider />
            </div>
            <div className="col-md-5">
              <AboutHome />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
