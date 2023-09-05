"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { TfiDropboxAlt } from "react-icons/tfi";
import { publicRequest } from "@/libs/requestMethods";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { getCookie } from "@/utils/getCookie";

export default function Page() {
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    async function fetchSubCategories() {
      try {
        const resp = await publicRequest.get("/sub-categories", {
          headers: { Authorization: `Bearer ${getCookie("token")}` },
        });
        setSubCategories(resp.data);
        if (resp.data.length === 0) {
          toast.error("Sub Category not available");
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchSubCategories();
  }, []);

  async function handleDeleteSubCategory(id) {
    try {
      const confirmation = confirm("Are you sure to delete sub categories");
      if (confirmation) {
        const resp = await publicRequest.delete(`/sub-categories/${id}`);

        if (resp.status === 200) {
          toast.success("Sub Category Deleted Successfully");
          setSubCategories((prevSubCategories) =>
            prevSubCategories.filter((subCategory) => subCategory.id !== id)
          );
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
                All Sub Categories List
              </h4>
              <div className="searchBar d-none">
                <form>
                  <input type="text" placeholder="Search Products" />
                  <button>
                    <BsSearch />
                  </button>
                </form>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Sr No.</th>
                  <th>Sub Category name</th>
                  <th>in Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {subCategories?.map((subCategory, key) => (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{subCategory.name}</td>
                    <td>{subCategory.category_name}</td>
                    <td>
                      <div className="actionBox d-flex gap-10 justify-content-center">
                        <button
                          className="deleteBtn"
                          onClick={() =>
                            handleDeleteSubCategory(subCategory.id)
                          }
                        >
                          <AiOutlineDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
