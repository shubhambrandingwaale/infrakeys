"use client";
import { publicRequest } from "@/libs/requestMethods";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { TfiDropboxAlt } from "react-icons/tfi";

export default function Page() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    (async function () {
      const resp = await publicRequest.get("/categories");
      setCategories(resp.data);
      console.log(resp.data);
    })();
  }, []);

  async function handleDelete(e, id) {
    e.preventDefault();
    try {
      const confirmation = confirm("Are you sure you want to delete?");
      if (confirmation) {
        const resp = await publicRequest.delete(`/categories/${id}`);
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
      <section className="viewSection">
        <div className="container-fluid">
          <div className="statsTable">
            <div className="spcbtwn mb-3">
              <h4>
                <TfiDropboxAlt />
                All Sub Categories List
              </h4>
              <div className="searchBar">
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
                  <th>Category name</th>
                  <th>Sub Category in this</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((category) => {
                  return (
                    <tr key={category.id}>
                      <td>{category.id}</td>
                      <td>{category.name}</td>
                      <td>25</td>
                      <td>
                        <div className="actionBox d-flex gap-10 justify-content-center">
                          <Link className="viewBtn" href="/">
                            <BiSolidEdit />
                          </Link>
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
