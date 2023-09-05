"use client";
import React, { useEffect, useState } from "react";
import { publicRequest } from "@/libs/requestMethods";
import Image from "next/image";
import { getCookie } from "@/utils/getCookie";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [image, setImage] = useState({ preview: "", data: "" });
  const [inputVals, setInputVals] = useState({
    categoryId: "",
    name: "",
  });
  const [categories, setCategories] = useState([]);
  console.log(inputVals);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const resp = await publicRequest.get("/categories", {
          headers: { Authorization: `Bearer ${getCookie("token")}` },
        });
        setCategories(resp.data);
      } catch (error) {
        // Handle error
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);
  function handleNavigate() {
    router.push("/admin");
  }
  // console.log(image);
  async function handleFormSubmit(e) {
    e.preventDefault();
    let formData = new FormData();
    const originalFileName = image.data.name;
    const trimmedName = originalFileName
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase()
      .split("(")
      .join("")
      .split(")")
      .join("");
    formData.append("name", inputVals.name);
    formData.append("file", image.data, trimmedName);
    formData.append("category_id", inputVals.categoryId);
    try {
      const resp = await publicRequest.post("/banners", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });

      if (resp.status === 200) {
        toast.success("Banner Created successfully");
        handleNavigate();
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  return (
    <>
      <section className="centerForm">
        <div className="container-fluid">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-4">
              <div className="formSmall">
                <h4>Create New Banner</h4>
                <form onSubmit={handleFormSubmit}>
                  <div className="inputGroup">
                    <label className="user-label">Select Category</label>
                    <select
                      required
                      autoComplete="off"
                      className="createInput"
                      type="text"
                      name="categoryId"
                      value={inputVals.categoryId}
                      onChange={(e) =>
                        setInputVals((prev) => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }))
                      }
                    >
                      <option value="" hidden></option>
                      {categories?.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="inputGroup">
                    <input
                      required
                      autoComplete="off"
                      className="createInput"
                      type="text"
                      name="name"
                      onChange={(e) =>
                        setInputVals((prev) => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }))
                      }
                    />
                    <label className="user-label">Enter Banner Name</label>
                  </div>
                  <div className="inputGroup">
                    {image.preview && (
                      <Image
                        src={image.preview}
                        alt="kdb"
                        width={100}
                        height={100}
                      />
                    )}
                    <input
                      required
                      autoComplete="off"
                      className="createInput"
                      type="file"
                      name="image"
                      onChange={handleFileChange}
                    />
                  </div>
                  <button className="commonBtn">Add New Banner</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
