import React from "react";
import { BsEnvelopeOpen, BsPhone, BsPinMap } from "react-icons/bs";

export default function Page() {
  return (
    <>
      <section className="plainSection">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4">
              <div className="commonBox">
                <h2>Client Name</h2>
                <ul className="clientInfoList">
                  <li>
                    <BsPhone />
                    <span>9572674853</span>
                  </li>
                  <li>
                    <BsEnvelopeOpen />
                    <span>email@gmail.com</span>
                  </li>
                  <li>
                    <BsPinMap />
                    <span>City, State</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="commonBox">
                <h2>Recently Viewed Products Slider of Clients</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
