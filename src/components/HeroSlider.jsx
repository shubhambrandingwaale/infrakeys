/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Link from "next/link";
import { publicRequest } from "@/libs/requestMethods";
import { toast } from "react-hot-toast";
import Image from "next/image";
export default function HeroSlider() {
  const [heroslides, setHeroslides] = useState([]);
  useEffect(() => {
    async function fetchBanners() {
      try {
        const resp = await publicRequest.get("/banners");
        setHeroslides(resp.data);
        console.log(resp.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchBanners();
  }, []);
  return (
    <>
      <div className="heroSliderBox">
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="heroslider"
        >
          {heroslides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="homeSlides">
                <Link
                  className="d-block"
                  href={`/categories/${slide.category_name}/${slide.category_id}`}
                  title={slide.name}
                >
                  <Image
                    src={`https://infrakeys-backend-production.up.railway.app${slide.banner_url}`}
                    width={720}
                    alt={`${slide.name} | Home Screen Banners | Infrakeys`}
                    height={300}
                  />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
