/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CategoryCard({ category }) {
  return (
    <>
      <div className="col">
        <div className="categoryCard">
          <Link
            href={`/categories/${category.name
              .toLowerCase()
              .split(" ")
              .join("-")}/${category.id}`}
          >
            <Image
              src={`https://infrakeysapp.in${category.image_url}`}
              alt={` ${category.name}  | Main Categories in Infrakeys`}
              width={150}
              height={100}
            />
            <span>{category.name}</span>
          </Link>
        </div>
      </div>
    </>
  );
}
