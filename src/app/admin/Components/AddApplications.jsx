"use client";
import React, { useState } from "react";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import AdminHeading from "./AdminHeading";
import { toast } from "react-hot-toast";
import { publicRequest } from "@/libs/requestMethods";
import { getCookie } from "@/utils/getCookie";
export default function AddApplications({ productId, inputs, setInputs }) {
  const [applications, setApplications] = useState([]);
  async function handleFormApplications(e) {
    e.preventDefault();
    try {
      const resp = await publicRequest.post(
        "/product-applications",
        {
          applications: applications,
          product_id: productId,
        },
        {
          headers: { Authorization: `Bearer ${getCookie("token")}` },
        }
      );
      if (resp.status === 200) {
        toast.success("Product Applications Added Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleAddApplication() {
    if (!inputs.applicationText) {
      return toast.error("please fill the application input!");
    }

    setApplications((prev) => [...prev, inputs.applicationText]);

    setInputs((prev) => ({
      ...prev,
      applicationText: "",
    }));
  }
  async function handleApplicationDelete(id) {
    setApplications((prev) => prev.filter((item, key) => key !== id));
    // const resp = await publicRequest.delete(`/product-applications/${id}`, {
    //   headers: { Authorization: `Bearer ${getCookie("token")}` },
    // });
    // if (resp.status === 200) {
    //   toast.success("Application deleted successfully.");
    //   setApplications((prev) => prev.filter((item) => item.id !== id));
    // }
  }
  return (
    <div className="container-fluid">
      <AdminHeading heading="Add Applications" />
      <form onSubmit={handleFormApplications}>
        <div className="row">
          <div className="col-lg-11 mt-3">
            <div className="inputGroup">
              <input
                type="text"
                name="applicationText"
                autoComplete="off"
                className="createInput"
                value={inputs.applicationText}
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
            <button
              type="button"
              onClick={handleAddApplication}
              className="addMore"
            >
              <AiOutlinePlus />
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-11 mt-3">
            <ul className="pointList">
              {applications?.map((item, key) => {
                return (
                  <li key={key} className="lsn row">
                    <div className="col-lg-11">{item}</div>
                    {applications.length > 0 && (
                      <div className="col-lg-1 centerit mt-3">
                        <button
                          type="button"
                          className="deleteBtn"
                          onClick={() => handleApplicationDelete(key)}
                        >
                          <AiOutlineDelete />
                        </button>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="row">
          <div className="col-12 mt-3 centerit">
            <button
              type="submit"
              className="commonBtn"
              disabled={applications.length > 0 ? false : true}
            >
              Save Applications
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
