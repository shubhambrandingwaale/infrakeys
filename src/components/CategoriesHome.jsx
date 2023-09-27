"use client";
import React, { useEffect, useRef, useState } from "react";
import CenterHeading from "./CenterHeading";
import CategoryCard from "./CategoryCard";
import { publicRequest } from "@/libs/requestMethods";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import Image from "next/image";

export default function CategoriesHome() {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async function () {
      try {
        const resp = await publicRequest.get("/sub-categories");
        setData(resp.data);
        console.log(resp.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      {/* d-flex justify-content-start row-cols-xs-2 row-cols-lg-8 */}
      <section className="commonSection">
        <div className="container-fluid">
          <CenterHeading heading="Product Categories" />
          <div className="categoriesGrid">
            {data?.map((category) => {
              return (
                <div
                  className="categoryCard"
                  category={category}
                  key={category.id}
                >
                  <Link
                    href={`sub-categories/${category.name
                      .toLowerCase()
                      .split(" ")
                      .join("-")}/${category.id}`}
                  >
                    <Image
                      src={`https://infrakeysapp.in${category.image_url}`}
                      alt={` ${category.name}  | Main Categories in Infrakeys`}
                      width={250}
                      height={150}
                    />
                    <span>{category.name}</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
