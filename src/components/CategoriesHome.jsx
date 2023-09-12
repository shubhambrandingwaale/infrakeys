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
        const resp = await publicRequest.get("/categories");
        setData(resp.data);
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
          <div className="row d-flex justify-content-start row-cols-xs-2 row-cols-lg-8">
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 8,
                  spaceBetween: 20,
                },
              }}
              modules={[Pagination]}
              className="relatedproductslider"
            >
              {data?.map((category) => {
                return (
                  <SwiperSlide category={category} key={category.id}>
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
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
}
