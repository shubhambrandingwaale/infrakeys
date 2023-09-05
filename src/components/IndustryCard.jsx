import Image from "next/image";
import React from "react";

export default function IndustryCard({ item }) {
  return (
    <>
      <div className="col-lg-2 col-md-3 col-sm-4">
        <div className="indsutryCard">
          <Image
            src={`https://infrakeysapp.in${item.image}`}
            width={50}
            height={50}
            alt="Used by Category Img"
          />
          <h5>{item.title}</h5>
        </div>
      </div>
    </>
  );
}
