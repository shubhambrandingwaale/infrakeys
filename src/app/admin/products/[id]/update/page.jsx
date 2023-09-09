"use client";
import React, { useEffect, useState } from "react";
import {
  AiOutlineDelete,
  AiOutlineInfoCircle,
  AiOutlinePlus,
} from "react-icons/ai";
import { MdOutlineFactory, MdOutlineFeaturedPlayList } from "react-icons/md";
import { TbBrandAppleArcade } from "react-icons/tb";
import { BiBookContent } from "react-icons/bi";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { v4 as uuidv4 } from "uuid";
import LeftHeading from "@/components/LeftHeading";
import { publicRequest } from "@/libs/requestMethods";
import AddProductAbout from "@/app/admin/Components/update/AddProductAbout";
import AddApplications from "@/app/admin/Components/update/AddApplications";
import AddUsedby from "@/app/admin/Components/update/AddUsedby";
import AddFeatures from "@/app/admin/Components/update/AddFeatures";
import AddDesc from "@/app/admin/Components/update/AddDesc";

export default function Page({ params: { id } }) {
  const [productData, setProductData] = useState({});
  const [inputs, setInputs] = useState({
    title: "",
    about: "",
    images: [],
    sub_category_id: "",
    description: "",
    featureTitle: "",
    featureDesc: "",
    applicationText: "",
  });
  const [productId, setProductId] = useState(null);
  const [subCategoryId, setSubCategoryId] = useState(null);
  const [addInput, setAddInput] = useState([{ id: uuidv4(), singleInput: "" }]);
  const [descriptions, setDescriptions] = useState([]);
  const [features, setFeatures] = useState([]);
  const [applications, setApplications] = useState([]);
  const handleAddInput = () => {
    setAddInput([...addInput, { id: uuidv4(), singleInput: "" }]);
  };
  const handleDeleteInput = (index) => {
    setAddInput((prev) => prev.filter((item) => item.id !== index));
  };

  async function getDescriptions(id) {
    const resp = await publicRequest.get(
      `/product-descriptions/products/${id}`
    );
    setDescriptions(resp.data);
    console.log("desc", resp.data);
  }

  async function getFeatures(id) {
    const resp = await publicRequest.get(`/product-features/products/${id}`);
    setFeatures(resp.data);
    console.log("features", resp.data);
  }

  async function getApplications(id) {
    const resp = await publicRequest.get(
      `/product-applications/products/${id}`
    );
    setApplications(resp.data);
    console.log("applications", resp.data);
  }

  async function getProductUsedBy(id) {
    const resp = await publicRequest.get(`/product-used-by/products/${id}`);
    setApplications(resp.data);
    console.log("usedby", resp.data);
  }

  // console.log(productData, productId);

  useEffect(() => {
    (async function () {
      await publicRequest.get(`/products/${id}`).then((resp) => {
        setProductData(resp.data);
        setProductId(resp.data.id);
        // setSubCategoryId(resp.data.sub_category_id);
      });
    })();
  }, [id]);

  return (
    <>
      <section className="createSection">
        <div className="container-fluid">
          <LeftHeading heading="Edit Product" />
          <div className="formBox">
            <Tabs>
              <div className="row">
                <div className="col-lg-3">
                  <div className="tabLinks">
                    <TabList>
                      <Tab>
                        About Product <AiOutlineInfoCircle />
                      </Tab>
                      {/* <Tab>
                        Description <BiBookContent />
                      </Tab> */}
                      <Tab>
                        Features <MdOutlineFeaturedPlayList />
                      </Tab>
                      <Tab>
                        Used by Industries <MdOutlineFactory />
                      </Tab>
                      {/* <Tab>
                        Applications <TbBrandAppleArcade />
                      </Tab> */}
                    </TabList>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="tabContent">
                    <div className="tabForm">
                      <TabPanel className="tabEditor" id="addAbout">
                        {productId && (
                          <AddProductAbout
                            productId={productId}
                            inputs={inputs}
                            setInputs={setInputs}
                            setProductId={setProductId}
                          />
                        )}
                      </TabPanel>
                      {/* <TabPanel className="tabEditor" id="addDesc">
                        {productId && (
                          <AddDesc
                            productId={productId}
                            inputs={inputs}
                            setInputs={setInputs}
                          />
                        )}
                      </TabPanel> */}
                      <TabPanel className="tabEditor" id="features">
                        {productId && (
                          <AddFeatures
                            productId={productId}
                            inputs={inputs}
                            setInputs={setInputs}
                          />
                        )}
                      </TabPanel>
                      <TabPanel className="tabEditor" id="usedBy">
                        {productId && (
                          <AddUsedby
                            productId={productId}
                            inputs={inputs}
                            setInputs={setInputs}
                          />
                        )}
                      </TabPanel>
                      {/* <TabPanel className="tabEditor" id="applications">
                        {productId && (
                          <AddApplications
                            productId={productId}
                            inputs={inputs}
                            setInputs={setInputs}
                          />
                        )}
                      </TabPanel> */}
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
