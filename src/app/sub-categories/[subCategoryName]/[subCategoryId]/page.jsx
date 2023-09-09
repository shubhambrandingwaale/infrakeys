"use client";
import Viewmore from "@/components/Viewmore";
import { publicRequest } from "@/libs/requestMethods";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
export default function Page({ params: { subCategoryId } }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async function () {
      try {
        const resp = await publicRequest.get(`/products`);

        setProducts(
          resp.data.filter((item) => item.sub_category_id === +subCategoryId)
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, [subCategoryId]);
  return (
    <>
      <section className="plainSection">
        <div className="container-fluid">
          <div className="productSlider">
            <Swiper
              className="productAboutSlider"
              pagination={true}
              modules={[Pagination]}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 50,
                },
              }}
            >
              {products?.map((product, key) => {
                return (
                  <SwiperSlide key={key}>
                    <div className="productCard" key={product.id}>
                      <div className="productImg">
                        <Image
                          src={`https://infrakeysapp.in${product?.images[0]}`}
                          height={150}
                          width={300}
                          alt={`${product?.title} Products | Infrakeys`}
                        />
                      </div>
                      <div className="productContent">
                        <Link href="/">
                          <h3>{product?.title}</h3>
                        </Link>
                        <p>
                          {product.about.length > 150
                            ? product.about.substring(0, 150) + "..."
                            : product.about}
                        </p>
                        <Viewmore
                          viewLink={`/products/${product?.title
                            .toLowerCase()
                            .split(" ")
                            .join("-")}/${product?.id}`}
                        />
                      </div>
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
