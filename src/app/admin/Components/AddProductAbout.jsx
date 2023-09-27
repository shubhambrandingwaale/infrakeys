"use client";
import { publicRequest } from "@/libs/requestMethods";
import { getCookie } from "@/utils/getCookie";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function AddProductAbout({
  setProductId,
  productId,
  inputs,
  setInputs,
}) {
  const [subCategories, setSubCategories] = useState([]);
  const [images, setImages] = useState([]);
  async function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      const originalFileName = images[i].data.name;
      const trimmedName = originalFileName
        .trim()
        .replace(/\s+/g, "-")
        .toLowerCase()
        .split("(")
        .join("")
        .split(")")
        .join("");

      formData.append("file", images[i].data, trimmedName);
    }
    formData.append("title", inputs.title);
    formData.append("sub_category_id", inputs.sub_category_id);
    formData.append("about", inputs.about);

    try {
      const resp = await publicRequest.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });
      if (resp.status === 200) {
        toast.success("Product About added successfully.");
        setProductId(resp.data.id);
      }

      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  }
  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    const newImages = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const img = {
        preview: URL.createObjectURL(selectedFiles[i]),
        data: selectedFiles[i],
      };
      newImages.push(img);
    }

    setImages((prev) => [...prev, ...newImages]);
  };
  useEffect(() => {
    const getSubCategories = async () => {
      try {
        const resp = await publicRequest.get("/sub-categories");
        console.log(resp.data);
        setSubCategories(resp.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSubCategories();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="addHeading">
            <h4>About Product</h4>
          </div>
        </div>
      </div>
      <form className="row" onSubmit={handleFormSubmit}>
        <div className="col-lg-5">
          <div className="inputGroup">
            <input
              type="text"
              name="title"
              autoComplete="off"
              className="createInput"
              onChange={(e) =>
                setInputs((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <label className="user-label">Product Title</label>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="inputGroup">
            <select
              required
              type="text"
              name="sub_category_id"
              autoComplete="off"
              className="createInput"
              onChange={(e) =>
                setInputs((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            >
              <option value="" hidden></option>
              {subCategories.length === 0 ? (
                <option disabled>Loading...</option>
              ) : (
                subCategories?.map((category) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  );
                })
              )}
            </select>
            <label className="user-label">Select Category</label>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="inputGroup">
            <input
              required
              type="file"
              name="text"
              multiple
              autoComplete="off"
              className="createInput"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="col-12 mt-3">
          <div className="inputGroup">
            <textarea
              required
              type="text"
              name="about"
              autoComplete="off"
              className="createInput"
              rows="5"
              onChange={(e) =>
                setInputs((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <label className="user-label">About Description</label>
          </div>
        </div>

        <div className="col-12 centerit mt-3">
          <button className="commonBtn">Save Product Basic info</button>
        </div>
      </form>
    </div>
  );
}
