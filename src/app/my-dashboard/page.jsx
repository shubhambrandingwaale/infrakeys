"use client";
import React, { useEffect, useState } from "react";
import { BiListCheck } from "react-icons/bi";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Image from "next/image";
import { BsEye, BsInfoCircle, BsKey } from "react-icons/bs";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { publicRequest } from "@/libs/requestMethods";
import AdminHeading from "../admin/Components/AdminHeading";

export default function Page(id) {
  const [products, setProducts] = useState([]);

  const [visible, setVisible] = useState(false);
  const handleSetVisible = () => {
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
  };
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
      <section className="createSection">
        <div className="container-fluid">
          <div className="formBox">
            <Tabs>
              <div className="row">
                <div className="col-lg-3">
                  <div className="tabLinks">
                    <TabList>
                      <Tab>
                        About Me <BsInfoCircle />
                      </Tab>
                      <Tab>
                        Enquiry List <BiListCheck />
                      </Tab>
                      <Tab>
                        Recently Viewed <BsEye />
                      </Tab>
                      <Tab>
                        Change Password <BsKey />
                      </Tab>
                    </TabList>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="tabContent">
                    <div className="tabForm">
                      <TabPanel className="tabEditor" id="addAbout">
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-12">
                              <div className="addHeading">
                                <h4>About Me</h4>
                              </div>
                            </div>
                          </div>
                          <form className="row">
                            <div className="col-lg-6 mt-3">
                              <div className="inputGroup">
                                <input
                                  required
                                  type="text"
                                  name="text"
                                  autoComplete="off"
                                  className="createInput"
                                />
                                <label className="user-label">Full Name</label>
                              </div>
                            </div>
                            <div className="col-lg-6 mt-3">
                              <div className="inputGroup">
                                <input
                                  required
                                  type="text"
                                  name="text"
                                  autoComplete="off"
                                  className="createInput"
                                />
                                <label className="user-label">Email</label>
                              </div>
                            </div>
                            <div className="col-lg-6 mt-3">
                              <div className="inputGroup">
                                <input
                                  required
                                  type="text"
                                  name="text"
                                  autoComplete="off"
                                  className="createInput"
                                />
                                <label className="user-label">City</label>
                              </div>
                            </div>
                            <div className="col-lg-6 mt-3">
                              <div className="inputGroup">
                                <input
                                  required
                                  type="text"
                                  name="text"
                                  autoComplete="off"
                                  className="createInput"
                                />
                                <label className="user-label">State</label>
                              </div>
                            </div>
                            <div className="col-12 centerit mt-3">
                              <button className="commonBtn">
                                Change Details
                              </button>
                            </div>
                          </form>
                        </div>
                      </TabPanel>
                      <TabPanel className="tabEditor" id="recentlyWatched">
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-12">
                              <div className="addHeading">
                                <h4>Product Enquiry List</h4>
                              </div>
                            </div>
                            <div className="statsTable">
                              <table>
                                <thead>
                                  <th>Sr. No</th>
                                  <th>Product Name</th>
                                  <th>Enquiry Timing</th>
                                </thead>
                              </table>
                            </div>
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel className="tabEditor" id="recentlyViewed">
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-12">
                              <div className="addHeading">
                                <h4>Recently Watched Products</h4>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="recentlyMyDashboard">
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
                      </TabPanel>
                      <TabPanel className="tabEditor" id="changePassword">
                        <div className="container-fluid">
                          <AdminHeading heading="Change Password" />
                          <div className="col-lg-4  mt-2 mx-auto">
                            <form action="">
                              <div className="inputGroup">
                                <input
                                  required
                                  type="text"
                                  name="text"
                                  autoComplete="off"
                                  className="createInput"
                                />
                                <label className="user-label">Password</label>
                              </div>
                              <div className="inputGroup mt-3">
                                <input
                                  required
                                  type="text"
                                  name="text"
                                  autoComplete="off"
                                  className="createInput"
                                />
                                <label className="user-label">
                                  Re-enter Password
                                </label>
                              </div>
                              <button className="commonBtn mt-3 mx-auto">
                                Change Password
                              </button>
                            </form>
                          </div>
                        </div>
                      </TabPanel>
                    </div>
                  </div>
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </section>
    </>
  );
}
