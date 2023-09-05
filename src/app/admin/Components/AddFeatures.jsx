"use client";
import React, { useState } from "react";
import AdminHeading from "./AdminHeading";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { publicRequest } from "@/libs/requestMethods";
import { getCookie } from "@/utils/getCookie";

export default function AddFeatures({ productId, inputs, setInputs }) {
  const [features, setFeatures] = useState([]);
  console.log(features, inputs);

  async function handleFormFeatures(e) {
    e.preventDefault();
    try {
      const resp = await publicRequest.post(
        "/product-features",
        {
          features: features,
          product_id: productId,
        },
        {
          headers: { Authorization: `Bearer ${getCookie("token")}` },
        }
      );
      if (resp.status === 200) {
        toast.success("features added successfully.");
      }
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  }
  function handleAddFeature() {
    if (!inputs.featureTitle) {
      return toast.error("please fill the title!");
    }
    if (!inputs.featureDesc) {
      return toast.error("please fill the feature description!");
    }

    setFeatures((prev) => [
      ...prev,
      {
        title: inputs.featureTitle,
        feature: inputs.featureDesc,
      },
    ]);

    setInputs((prev) => ({
      ...prev,
      featureTitle: "",
      featureDesc: "",
    }));
  }
  return (
    <div className="container-fluid">
      <AdminHeading heading="Add Features" />
      <form onSubmit={handleFormFeatures}>
        <div className="row">
          <div className="col-lg-3 mt-3">
            <div className="inputGroup">
              <input
                type="text"
                name="featureTitle"
                autoComplete="off"
                className="createInput"
                value={inputs.featureTitle}
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
              <label className="user-label">Write Feature</label>
            </div>
          </div>
          <div className="col-lg-8 mt-3">
            <div className="inputGroup">
              <input
                type="text"
                name="featureDesc"
                autoComplete="off"
                className="createInput"
                value={inputs.featureDesc}
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
              <label className="user-label">Write Description Point</label>
            </div>
          </div>
          <div className="col-lg-1 mt-3 centerit">
            <button
              type="button"
              onClick={handleAddFeature}
              className="addMore"
            >
              <AiOutlinePlus />
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 mt-3">
            <ul className="pointList">
              {features?.map((item, key) => {
                return (
                  <li key={key} className="lsn">
                    <b>{item.title}</b>
                    <p>{item.feature}</p>
                  </li>
                );
              })}
            </ul>
          </div>
          {features.length > 0 && (
            <div className="col-lg-1 centerit mt-3">
              <button type="button" className="deleteBtn">
                <AiOutlineDelete />
              </button>
            </div>
          )}
        </div>
        <div className="row">
          <div className="col-12 mt-3 centerit">
            <button type="submit" className="commonBtn">
              Save Features
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
