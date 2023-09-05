"use client";
import { publicRequest } from "@/libs/requestMethods";
import { getCookie } from "@/utils/getCookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
export default function Page() {
  const router = useRouter();
  function handleNavigate() {
    router.push("/admin");
  }
  const [image, setImage] = useState({ preview: "", data: "" });
  const [inputs, setInputs] = useState({
    name: "",
  });
  console.log(image);
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
    formData.append("name", inputs.name);
    formData.append("file", image.data, trimmedName);
    const resp = await publicRequest.post("/categories", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getCookie("token")}`,
      },
    });
    if (resp.status === 200) {
      toast.success("Category Added Successfully");

      handleNavigate();
    } else {
      toast.error(response.error);
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
                <h4>Create New Category</h4>
                <form onSubmit={handleFormSubmit}>
                  <div className="inputGroup">
                    <input
                      required
                      autoComplete="off"
                      className="createInput"
                      type="text"
                      name="name"
                      onChange={(e) =>
                        setInputs((prev) => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }))
                      }
                    />
                    <label className="user-label">Category Name</label>
                  </div>
                  <div className="inputGroup">
                    {image.preview && (
                      <Image
                        src={image?.preview}
                        alt="ashfb"
                        width={100}
                        height={100}
                      />
                    )}
                    <input
                      required
                      autoComplete="off"
                      className="createInput"
                      type="file"
                      name="text"
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
