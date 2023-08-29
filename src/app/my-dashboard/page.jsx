"use client";
import React, { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MdOutlineFactory, MdOutlineFeaturedPlayList } from "react-icons/md";
import { TbBrandAppleArcade, TbLogout } from "react-icons/tb";
import { BiBookContent, BiListCheck } from "react-icons/bi";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import LeftHeading from "@/components/LeftHeading";
import IndustryCard from "@/components/IndustryCard";
import Image from "next/image";
import { BsEye, BsInfoCircle, BsKey } from "react-icons/bs";

export default function Page() {
  const [visible, setVisible] = useState(false);
  const handleSetVisible = () => {
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
  };

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
                      <Tab>
                        Logout <TbLogout />
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
                            <form action="">
                              <div className="col-lg-6">
                                <div className="inputGroup">
                                  <input
                                    required
                                    type="text"
                                    name="text"
                                    autoComplete="off"
                                    className="createInput"
                                  />
                                  <label className="user-label">My Name</label>
                                </div>
                              </div>
                              <div className="col-lg-3">
                                <div className="inputGroup">
                                  <select
                                    required
                                    type="text"
                                    name="text"
                                    autoComplete="off"
                                    className="createInput"
                                  >
                                    <option value=""></option>
                                    <option value="Categroy 1">
                                      Categroy 1
                                    </option>
                                    <option value="Categroy 2">
                                      Categroy 2
                                    </option>
                                    <option value="Categroy 3">
                                      Categroy 3
                                    </option>
                                    <option value="Categroy 4">
                                      Categroy 4
                                    </option>
                                  </select>
                                  <label className="user-label">
                                    Select Category
                                  </label>
                                </div>
                              </div>
                              <div className="col-lg-3">
                                <div className="inputGroup">
                                  <select
                                    required
                                    type="text"
                                    name="text"
                                    autoComplete="off"
                                    className="createInput"
                                  >
                                    <option value=""></option>
                                    <option value="Sub Category 1">
                                      Sub Category 2
                                    </option>
                                    <option value="Sub Category 1">
                                      Sub Category 4
                                    </option>
                                    <option value="Sub Category 1">
                                      Sub Category 3
                                    </option>
                                  </select>
                                  <label className="user-label">
                                    Select Sub Category
                                  </label>
                                </div>
                              </div>
                              <div className="col-12 mt-3">
                                <div className="inputGroup">
                                  <textarea
                                    required
                                    type="text"
                                    name="text"
                                    autoComplete="off"
                                    className="createInput"
                                    rows="5"
                                  />
                                  <label className="user-label">
                                    About Description
                                  </label>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel className="tabEditor" id="addDesc">
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-12">
                              <div className="addHeading">
                                <h4>Add Product About</h4>
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
                      <TabPanel className="tabEditor">
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-12">
                              <div className="addHeading">
                                <h4>Add Product About</h4>
                              </div>
                            </div>
                            <div className="col-lg-3 mt-3">
                              <div className="inputGroup">
                                <input
                                  required
                                  type="text"
                                  name="text"
                                  autoComplete="off"
                                  className="createInput"
                                />
                                <label className="user-label">
                                  Table Feature Points
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-9 mt-3">
                              <div className="inputGroup">
                                <input
                                  required
                                  type="text"
                                  name="text"
                                  autoComplete="off"
                                  className="createInput"
                                />
                                <label className="user-label">
                                  Write Point Description
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-3 mt-3">
                              <div className="inputGroup">
                                <input
                                  required
                                  type="text"
                                  name="text"
                                  autoComplete="off"
                                  className="createInput"
                                />
                                <label className="user-label">
                                  Table Feature Points
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-9 mt-3">
                              <div className="inputGroup">
                                <input
                                  required
                                  type="text"
                                  name="text"
                                  autoComplete="off"
                                  className="createInput"
                                />
                                <label className="user-label">
                                  Write Point Description
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-3 mt-3">
                              <div className="inputGroup">
                                <input
                                  required
                                  type="text"
                                  name="text"
                                  autoComplete="off"
                                  className="createInput"
                                />
                                <label className="user-label">
                                  Table Feature Points
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-9 mt-3">
                              <div className="inputGroup">
                                <input
                                  required
                                  type="text"
                                  name="text"
                                  autoComplete="off"
                                  className="createInput"
                                />
                                <label className="user-label">
                                  Write Point Description
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-3 mt-3">
                              <div className="inputGroup">
                                <input
                                  required
                                  type="text"
                                  name="text"
                                  autoComplete="off"
                                  className="createInput"
                                />
                                <label className="user-label">
                                  Table Feature Points
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-9 mt-3">
                              <div className="inputGroup">
                                <input
                                  required
                                  type="text"
                                  name="text"
                                  autoComplete="off"
                                  className="createInput"
                                />
                                <label className="user-label">
                                  Write Point Description
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel className="tabEditor">
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-12">
                              <div className="addHeading">
                                <h4>Add Product About</h4>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="inputGroup">
                                <input
                                  required
                                  type="text"
                                  name="text"
                                  autoComplete="off"
                                  className="createInput"
                                />
                                <label className="user-label">
                                  Product Name
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                              <div className="industrySelect">
                                <label htmlFor="industryCheck">
                                  <div className="cardIndustry">
                                    {/* <Image
                                      src={industryImg}
                                      width={40}
                                      height={40}
                                      alt="will chanbge later"
                                    /> */}
                                    <span>Construction</span>
                                  </div>
                                  <input type="checkbox" id="industryCheck" />
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                              <div className="industrySelect">
                                <label htmlFor="industryCheck">
                                  <div className="cardIndustry">
                                    {/* <Image
                                      src={industryImg}
                                      width={40}
                                      height={40}
                                      alt="will chanbge later"
                                    /> */}
                                    <span>Construction</span>
                                  </div>
                                  <input type="checkbox" id="industryCheck" />
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                              <div className="industrySelect">
                                <label htmlFor="industryCheck">
                                  <div className="cardIndustry">
                                    {/* <Image
                                      src={industryImg}
                                      width={40}
                                      height={40}
                                      alt="will chanbge later"
                                    /> */}
                                    <span>Construction</span>
                                  </div>
                                  <input type="checkbox" id="industryCheck" />
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                              <div className="industrySelect">
                                <label htmlFor="industryCheck">
                                  <div className="cardIndustry">
                                    {/* <Image
                                      src={industryImg}
                                      width={40}
                                      height={40}
                                      alt="will chanbge later"
                                    /> */}
                                    <span>Construction</span>
                                  </div>
                                  <input type="checkbox" id="industryCheck" />
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                              <div className="industrySelect">
                                <label htmlFor="industryCheck">
                                  <div className="cardIndustry">
                                    {/* <Image
                                      src={industryImg}
                                      width={40}
                                      height={40}
                                      alt="will chanbge later"
                                    /> */}
                                    <span>Construction</span>
                                  </div>
                                  <input type="checkbox" id="industryCheck" />
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                              <div className="industrySelect">
                                <label htmlFor="industryCheck">
                                  <div className="cardIndustry">
                                    {/* <Image
                                      src={industryImg}
                                      width={40}
                                      height={40}
                                      alt="will chanbge later"
                                    /> */}
                                    <span>Construction</span>
                                  </div>
                                  <input type="checkbox" id="industryCheck" />
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                              <div className="industrySelect">
                                <label htmlFor="industryCheck">
                                  <div className="cardIndustry">
                                    {/* <Image
                                      src={industryImg}
                                      width={40}
                                      height={40}
                                      alt="will chanbge later"
                                    /> */}
                                    <span>Construction</span>
                                  </div>
                                  <input type="checkbox" id="industryCheck" />
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                              <div className="industrySelect">
                                <label htmlFor="industryCheck">
                                  <div className="cardIndustry">
                                    {/* <Image
                                      src={industryImg}
                                      width={40}
                                      height={40}
                                      alt="will chanbge later"
                                    /> */}
                                    <span>Construction</span>
                                  </div>
                                  <input type="checkbox" id="industryCheck" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel className="tabEditor">
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-12">
                              <div className="addHeading">
                                <h4>Add Product About</h4>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="inputGroup">
                                <input
                                  required
                                  type="text"
                                  name="text"
                                  autoComplete="off"
                                  className="createInput"
                                />
                                <label className="user-label">
                                  Product Name
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-3">
                              <div className="inputGroup">
                                <input
                                  required
                                  type="text"
                                  name="text"
                                  autoComplete="off"
                                  className="createInput"
                                />
                                <label className="user-label">
                                  Product Name
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-3">
                              <div className="inputGroup">
                                <input
                                  required
                                  type="text"
                                  name="text"
                                  autoComplete="off"
                                  className="createInput"
                                />
                                <label className="user-label">
                                  Product Name
                                </label>
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
