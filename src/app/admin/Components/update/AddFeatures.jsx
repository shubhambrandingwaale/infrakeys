"use client";
import React, { useEffect, useState } from "react";
import AdminHeading from "../AdminHeading";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { publicRequest } from "@/libs/requestMethods";
import { getCookie } from "@/utils/getCookie";

export default function AddFeatures({ productId, inputs, setInputs }) {
  const [features, setFeatures] = useState([]);

  async function handleFormFeatures(e) {
    e.preventDefault();
    try {
      const resp = await publicRequest.post(
        "/product-features",
        {
          features: features,
          product_id: productId,
        },
        { headers: { Authorization: `Bearer ${getCookie("token")}` } }
      );
      if (resp.status === 200) {
        toast.success("features added successfully.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddFeature() {
    if (!inputs.featureTitle) {
      return toast.error("please fill the title!");
    }
    if (!inputs.featureDesc) {
      return toast.error("please fill the feature description!");
    }

    const resp = await publicRequest.post(
      "/product-features",
      {
        features: [{ title: inputs.featureTitle, feature: inputs.featureDesc }],
        product_id: productId,
      },
      { headers: { Authorization: `Bearer ${getCookie("token")}` } }
    );

    if (resp.status === 200) {
      setFeatures((prev) => [...prev, resp.data[0]]);
    }

    setInputs((prev) => ({
      ...prev,
      featureTitle: "",
      featureDesc: "",
    }));
  }

  useEffect(() => {
    (async function getFeatures() {
      const resp = await publicRequest.get(
        `/product-features/products/${productId}`
      );
      setFeatures(resp.data);
      console.log("desc", resp.data);
    })();
  }, [productId]);

  async function handleFeatureDelete(id) {
    const resp = await publicRequest.delete(`/product-features/${id}`, {
      headers: { Authorization: `Bearer ${getCookie("token")}` },
    });
    if (resp.status === 200) {
      toast.success("Feature deleted successfully.");
      setFeatures((prev) => prev.filter((item) => item.id !== id));
    }
  }
  return (
    <div className="container-fluid">
      <AdminHeading heading="Add Features" />
      <form onSubmit={handleFormFeatures}>
        <div className="row">
          <div className="col-lg-3 mt-3">
            <div className="inputGroup">
              <input
                required
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
                required
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
          <ul className="pointList">
            {features?.map((item, key) => {
              return (
                <li key={key} className="lsn px-3">
                  <div className="row mt-3">
                    <div className="col-lg-3">
                      <b>{item.title}</b>
                    </div>
                    <div className="col-lg-8">
                      <p>{item.feature}</p>
                    </div>
                    {features.length > 0 && (
                      <div className="col-lg-1 centerit">
                        <button
                          type="button"
                          className="deleteBtn"
                          onClick={() => handleFeatureDelete(key)}
                        >
                          <AiOutlineDelete />
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
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
