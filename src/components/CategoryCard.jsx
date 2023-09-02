/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CategoryCard({ category }) {
  return (
    <>
      <div className="col-lg-2 col-md-3 col-sm-4 col-6">
        <div className="categoryCard">
          <Link
            href={`/categories/${category.name
              .toLowerCase()
              .split(" ")
              .join("-")}/${category.id}`}
          >
            <Image
              src={`http://62.72.59.14${category.image_url}`}
              alt={` ${category.name}  | Main Categories in Infrakeys`}
              height={100}
              width={100}
            />
            <span>{category.name}</span>
          </Link>
        </div>
      </div>
    </>
  );
}
