"use client";
import { publicRequest } from "@/libs/requestMethods";
import { getCookie } from "@/utils/getCookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function Page() {
  const [image, setImage] = useState({ preview: "", data: "" });
  const [inputVals, setInputVals] = useState({
    categoryId: "45",
    name: "",
  });
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  console.log(inputVals);
  function handleNavigate() {
    router.push("/admin");
  }

  useEffect(() => {
    async function fetchCategories() {
      try {
        const resp = await publicRequest.get("/categories");
        setCategories(resp.data);
      } catch (error) {
        // Handle error
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);
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
      const resp = await publicRequest.post("/sub-categories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });

      if (resp.status === 200) {
        toast.success("Sub Category Added Successfully");
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
                <h4>Create New Sub Category</h4>
                <form onSubmit={handleFormSubmit}>
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
                    <label className="user-label">Enter Category Name</label>
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
                  <button className="commonBtn">Create Category</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
