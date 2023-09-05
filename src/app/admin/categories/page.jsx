"use client";
import { publicRequest } from "@/libs/requestMethods";
import { getCookie } from "@/utils/getCookie";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { TfiDropboxAlt } from "react-icons/tfi";

export default function Page() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    (async function () {
      const resp = await publicRequest.get("/categories");
      setCategories(resp.data);
    })();
  }, []);

  async function handleDelete(e, id) {
    e.preventDefault();
    try {
      const confirmation = confirm("Are you sure you want to delete?");
      if (confirmation) {
        const resp = await publicRequest.delete(`/categories/${id}`, {
          headers: { Authorization: `Bearer ${getCookie("token")}` },
        });
        if (resp.status === 200) {
          toast.success("Category deleted successfully.");
          setCategories((prev) => prev.filter((item) => item.id !== id));
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <section className="viewSection mt-3">
        <div className="container-fluid">
          <div className="statsTable">
            <div className="spcbtwn mb-3">
              <h4>
                <TfiDropboxAlt />
                All Categories List
              </h4>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Sr No.</th>
                  <th>Category name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((category, key) => {
                  return (
                    <tr key={category.id}>
                      <td>{key + 1}</td>
                      <td>{category.name}</td>
                      <td>
                        <div className="actionBox d-flex gap-10 justify-content-center">
                          <button
                            className="deleteBtn"
                            onClick={(e) => handleDelete(e, category.id)}
                          >
                            <AiOutlineDelete />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
