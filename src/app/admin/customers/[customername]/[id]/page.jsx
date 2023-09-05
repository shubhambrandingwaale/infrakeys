"use client";
import { publicRequest } from "@/libs/requestMethods";
import { getCookie } from "@/utils/getCookie";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsEnvelopeOpen, BsPhone, BsPinMap, BsSearch } from "react-icons/bs";
import { TfiDropboxAlt } from "react-icons/tfi";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Page({ params: { id } }) {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});
  const [userQueries, setUserQueries] = useState([]);
  console.log(products);

  useEffect(() => {
    async function getproducts(id) {
      try {
        const resp = await publicRequest.get(`/admin/recently-viewed/${id}`, {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        });
        setProducts(resp.data);
        console.log("recent", resp.data);
      } catch (error) {
        console.log(error);
      }
    }
    getproducts(id);

    (async function () {
      try {
        const resp = await publicRequest.get(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        });
        setUser(resp.data);
        console.log("user", resp.data);
      } catch (error) {
        console.log(error);
      }
    })();

    (async function () {
      try {
        const resp = await publicRequest.get(`/product-queries/admin/${id}`, {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        });
        setUserQueries(resp.data);
        console.log("queries", resp.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  return (
    <>
      <section className="plainSection">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4">
              <div className="commonBox">
                <h2>{user.fullname}</h2>
                <ul className="clientInfoList">
                  <li>
                    <BsPhone />
                    <span>{user.phone}</span>
                  </li>
                  <li>
                    <BsEnvelopeOpen />
                    <span>{user.email}</span>
                  </li>
                  <li>
                    <BsPinMap />
                    <span>{`${user.city}, ${user.state}`}</span>
                  </li>
                  <li>
                    <BsPinMap />
                    <span>{new Date(user.updated_at).toDateString()}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-8 mt-3">
              <div className="statsTable">
                <div className="spcbtwn mb-3">
                  <h4>
                    <TfiDropboxAlt />
                    All Raised Product Enquries by {user.fullname}
                  </h4>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Sr No.</th>
                      <th>Product</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userQueries?.map((query, key) => {
                      return (
                        <tr key={query.id}>
                          <td>{key + 1}</td>
                          <td>{query.title}</td>
                          <td>{query.timestamp}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-12 mt-3">
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
                            src={`https://infrakeysapp.in${productItem.images}`}
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
