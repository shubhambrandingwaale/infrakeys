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
import Image from "next/image";
import { publicRequest } from "@/libs/requestMethods";

import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import AddDesc from "../../Components/AddDesc";
import AddProductAbout from "../../Components/AddProductAbout";
import AddFeatures from "../../Components/AddFeatures";
import AddUsedby from "../../Components/AddUsedby";
import AddApplications from "../../Components/AddApplications";

export default function Page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [inputs, setInputs] = useState({
    title: "",
    about: "",
    sub_category_id: "",
    description: "",
    featureTitle: "",
    featureDesc: "",
    applicationText: "",
  });
  const [productId, setProductId] = useState(null);
  const [addInput, setAddInput] = useState([{ id: uuidv4(), singleInput: "" }]);
  const handleAddInput = () => {
    setAddInput([...addInput, { id: uuidv4(), singleInput: "" }]);
  };
  const handleDeleteInput = (index) => {
    setAddInput((prev) => prev.filter((item) => item.id !== index));
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
                        About Product <AiOutlineInfoCircle />
                      </Tab>
                      <Tab>
                        Description <BiBookContent />
                      </Tab>
                      <Tab>
                        Features <MdOutlineFeaturedPlayList />
                      </Tab>
                      <Tab>
                        Used by Industries <MdOutlineFactory />
                      </Tab>
                      <Tab>
                        Applications <TbBrandAppleArcade />
                      </Tab>
                    </TabList>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="tabContent">
                    <div className="tabForm">
                      <TabPanel className="tabEditor" id="addAbout">
                        <AddProductAbout
                          productId={productId}
                          inputs={inputs}
                          setInputs={setInputs}
                          setProductId={setProductId}
                        />
                      </TabPanel>
                      <TabPanel className="tabEditor" id="addDesc">
                        <AddDesc
                          productId={productId}
                          inputs={inputs}
                          setInputs={setInputs}
                        />
                      </TabPanel>
                      <TabPanel className="tabEditor" id="features">
                        <AddFeatures
                          productId={productId}
                          inputs={inputs}
                          setInputs={setInputs}
                        />
                      </TabPanel>
                      <TabPanel className="tabEditor" id="usedBy">
                        <AddUsedby
                          productId={productId}
                          inputs={inputs}
                          setInputs={setInputs}
                        />
                      </TabPanel>
                      <TabPanel className="tabEditor" id="applications">
                        <AddApplications
                          productId={productId}
                          inputs={inputs}
                          setInputs={setInputs}
                        />
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
