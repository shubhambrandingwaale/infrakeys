"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { publicRequest } from "@/libs/requestMethods";

import { toast } from "react-hot-toast";
import { getCookie } from "@/utils/getCookie";
import AdminHeading from "./AdminHeading";

export default function AddDesc({ productId, inputs, setInputs }) {
  const [descriptions, setDescriptions] = useState([]);
  console.log(inputs);
  console.log(descriptions);

  async function handleFormDesc(e) {
    e.preventDefault();
    try {
      const resp = await publicRequest.post(
        "/product-descriptions",
        {
          descriptions: descriptions,
          product_id: productId,
        },
        { headers: { Authorization: `Bearer ${getCookie("token")}` } }
      );
      if (resp.status === 200) {
        toast.success("descriptions added successfully.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddDesc(id) {
    if (!inputs.description) {
      return toast.error("Input can't be empty!");
    }
    setDescriptions((prev) => [...prev, inputs.description]);
    // const resp = await publicRequest.post(
    //   `/product-descriptions`,
    //   {
    //     descriptions: [inputs.description],
    //     product_id: productId,
    //   },
    //   { headers: { Authorization: `Bearer ${getCookie("token")}` } }
    // );
    // console.log(resp.data.descriptions[0]);
    // if (resp.status === 200) {
    //   toast.success("description added successfully");
    //   setDescriptions((prev) => [...prev, resp.data.descriptions[0]]);
    // }

    setInputs((prev) => ({
      ...prev,
      description: "",
    }));
  }

  useEffect(() => {
    async function getDescriptions(id) {
      const resp = await publicRequest.get(
        `/product-descriptions/products/${id}`
      );
      setDescriptions(resp.data);
      console.log("desc", resp.data);
    }
    getDescriptions(productId);
  }, [productId]);

  async function handleDescDelete(id) {
    setDescriptions((prev) => prev.filter((item, key) => key !== id));
    // const resp = await publicRequest.delete(`/product-descriptions/${id}`, {
    //   headers: { Authorization: `Bearer ${getCookie("token")}` },
    // });
    // if (resp.status === 200) {
    //   toast.success("Desc deleted successfully.");
    //   setDescriptions((prev) => prev.filter((item) => item.id !== id));
    // }
  }

  return (
    <div className="container-fluid">
      <AdminHeading heading="Add Description" />
      <form className="row" onSubmit={handleFormDesc}>
        <div className="col-lg-11 mt-3">
          <div className="inputGroup">
            <input
              type="text"
              name="description"
              autoComplete="off"
              className="createInput"
              value={inputs.description}
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
        <div className="col-lg-1 centerit mt-3">
          <button type="button" onClick={handleAddDesc} className="addMore">
            <AiOutlinePlus />
          </button>
        </div>
        <div className="col-12 mt-3 centerit">
          <button
            type="submit"
            className="commonBtn"
            disabled={descriptions.length > 0 ? false : true}
          >
            Save description
          </button>
        </div>
      </form>
      <div className="row">
        <div className="col-lg-3 mt-3">
          <ul className="pointList">
            {descriptions?.map((item, key) => {
              return (
                <li key={key} className="lsn">
                  {item}
                  <div className="col-lg-1 centerit mt-3">
                    <button
                      type="button"
                      className="deleteBtn"
                      onClick={() => handleDescDelete(key)}
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
