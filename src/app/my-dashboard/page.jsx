"use client";
import React, { useEffect, useState } from "react";
import { BiListCheck } from "react-icons/bi";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Image from "next/image";
import { BsChevronRight, BsEye, BsInfoCircle, BsKey } from "react-icons/bs";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { publicRequest } from "@/libs/requestMethods";
import AdminHeading from "../admin/Components/AdminHeading";
import { getCookie } from "@/utils/getCookie";
import { toast } from "react-hot-toast";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});
  const [userQueries, setUserQueries] = useState([]);

  const [inputVals, setInputVals] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    state: "",
  });
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
    getproducts(getCookie("user_id"));

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
        const resp = await publicRequest.get(
          `/product-queries/${getCookie("user_id")}`,
          {
            headers: {
              Authorization: `Bearer ${getCookie("token")}`,
            },
          }
        );
        setUserQueries(resp.data);
        console.log("queries", resp.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const [visible, setVisible] = useState(false);
  const handleSetVisible = () => {
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
  };
  useEffect(() => {
    (async function () {
      try {
        const resp = await publicRequest.get(`/users/${getCookie("user_id")}`, {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        });
        setInputVals((prev) => ({ ...prev, fullname: resp.data.fullname }));
        setInputVals((prev) => ({ ...prev, email: resp.data.email }));
        setInputVals((prev) => ({ ...prev, password: resp.data.password }));
        setInputVals((prev) => ({ ...prev, phone: resp.data.phone }));
        setInputVals((prev) => ({ ...prev, state: resp.data.state }));
        setInputVals((prev) => ({ ...prev, city: resp.data.city }));
      } catch (error) {}
    })();
  }, []);

  async function handleUpdate(e, id) {
    e.preventDefault();
    try {
      const resp = await publicRequest.put(
        `/users/${id}`,
        { ...inputVals },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );

      if (resp.status === 200) {
        toast.success(resp.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
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
                    </TabList>
                  </div>
                </div>
                <div className="col-lg-9 p-0">
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
                          <form
                            className="row"
                            onSubmit={(e) =>
                              handleUpdate(e, getCookie("user_id"))
                            }
                          >
                            <div className="col-lg-4 col-sm-6 mt-3">
                              <div className="inputGroup">
                                <input
                                  required
                                  type="text"
                                  name="fullname"
                                  autoComplete="off"
                                  className="createInput"
                                  value={inputVals.fullname}
                                  onChange={(e) => {
                                    setInputVals((prev) => ({
                                      ...prev,
                                      [e.target.name]: e.target.value,
                                    }));
                                  }}
                                />
                                <label className="user-label">Full Name</label>
                              </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 mt-3">
                              <div className="inputGroup">
                                <input
                                  required
                                  type="text"
                                  name="email"
                                  autoComplete="off"
                                  className="createInput"
                                  value={inputVals.email}
                                  onChange={(e) => {
                                    setInputVals((prev) => ({
                                      ...prev,
                                      [e.target.name]: e.target.value,
                                    }));
                                  }}
                                />
                                <label className="user-label">Email</label>
                              </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 mt-3">
                              <div className="inputGroup">
                                <input
                                  required
                                  type="tel"
                                  name="phone"
                                  value={inputVals.phone}
                                  autoComplete="off"
                                  className="createInput"
                                  onChange={(e) => {
                                    setInputVals((prev) => ({
                                      ...prev,
                                      [e.target.name]: e.target.value,
                                    }));
                                  }}
                                />
                                <label className="user-label">Email</label>
                              </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 mt-3">
                              <div className="inputGroup">
                                <input
                                  required
                                  type="text"
                                  name="city"
                                  autoComplete="off"
                                  className="createInput"
                                  value={inputVals.city}
                                  onChange={(e) => {
                                    setInputVals((prev) => ({
                                      ...prev,
                                      [e.target.name]: e.target.value,
                                    }));
                                  }}
                                />
                                <label className="user-label">City</label>
                              </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 mt-3">
                              <div className="inputGroup">
                                <input
                                  required
                                  type="text"
                                  name="state"
                                  autoComplete="off"
                                  className="createInput"
                                  value={inputVals.state}
                                  onChange={(e) => {
                                    setInputVals((prev) => ({
                                      ...prev,
                                      [e.target.name]: e.target.value,
                                    }));
                                  }}
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
                                        <td>
                                          {new Date(
                                            query.timestamp
                                          ).toDateString()}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
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
                                            src={`https://infrakeysapp.in${productItem.images[0]}`}
                                            height={150}
                                            width={300}
                                            alt={`${productItem.title} product | Infrakeys`}
                                          />
                                        </div>
                                        <div className="productContent">
                                          <Link
                                            className="d-block"
                                            href={`/products/${productItem.title
                                              .toLowerCase()
                                              .split(" ")
                                              .join("-")}/${productItem.id}`}
                                          >
                                            <h3>{productItem.title}</h3>
                                          </Link>
                                          <Link
                                            className="viewMore"
                                            href={`/products/${productItem.title
                                              .toLowerCase()
                                              .split(" ")
                                              .join("-")}/${productItem.id}`}
                                          >
                                            View Product
                                            <BsChevronRight />
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
