"use client";
import { publicRequest } from "@/libs/requestMethods";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsEnvelopeOpen, BsPhone, BsPinMap } from "react-icons/bs";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Page({ params: { id } }) {
  const [products, setProducts] = useState([]);
  console.log(products);
  useEffect(() => {
    async function getproducts(id) {
      try {
        const resp = await publicRequest.get(`/recently-viewed/${id}`);
        setProducts(resp.data);
      } catch (error) {
        console.log(error);
      }
    }
    getproducts(id);
  }, [id]);

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
                  <li>
                    <BsPinMap />
                    <span>Joined at</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="commonBox">
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
                      slidesPerView: 3,
                      spaceBetween: 50,
                    },
                  }}
                >
                  {products?.map((productItem, key) => (
                    <SwiperSlide key={key}>
                      <div className="productCard">
                        <div className="productImg">
                          <Image
                            src={`https://infrakeys-backend-production.up.railway.app${productItem.images}`}
                            height={150}
                            width={300}
                            alt={`${productItem.title} product | Infrakeys`}
                          />
                        </div>
                        <div className="productContent">
                          <Link href="/">
                            <h3>{productItem.title}</h3>
                          </Link>
                          <p>{productItem.about}... </p>
                          <Link
                            href={`/products/${productItem.title
                              .toLowerCase()
                              .split(" ")
                              .join("-")}/${productItem.id}`}
                          >
                            View Product
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
