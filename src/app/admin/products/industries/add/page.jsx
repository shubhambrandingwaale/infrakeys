"use client";
import React, { useRef, useState } from "react";
import { publicRequest } from "@/libs/requestMethods";
import { toast } from "react-hot-toast";
import AdminHeading from "@/app/admin/Components/AdminHeading";
import { getCookie } from "@/utils/getCookie";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  function handleNavigate() {
    router.push("/admin");
  }
  const [image, setImage] = useState({});
  const inputRef = useRef();
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
    formData.append("title", inputRef.current.value);
    formData.append("file", image.data, trimmedName);
    try {
      const resp = await publicRequest.post("/industries", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });
      if (resp.status === 200) {
        toast.success("New Industry added Successfully");
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
    <section className="commonSection">
      <div className="container">
        <AdminHeading heading="Add New Industry" />
        <form className="row" onSubmit={handleFormSubmit}>
          <div className="col-lg-5 mt-3">
            <div className="inputGroup">
              <input
                required
                type="text"
                name="name"
                autoComplete="off"
                className="createInput"
                ref={inputRef}
              />
              <label className="user-label">Write Industry Name</label>
            </div>
          </div>
          <div className="col-lg-5 mt-3">
            <div className="inputGroup">
              <input
                required
                type="file"
                autoComplete="off"
                className="createInput"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="col-lg-2 centerit mt-3">
            <button className="commonBtn">Add New Industry</button>
          </div>
        </form>
      </div>
    </section>
  );
}
