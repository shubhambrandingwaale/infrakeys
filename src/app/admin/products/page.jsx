"use client";
import { publicRequest } from "@/libs/requestMethods";
import { getCookie } from "@/utils/getCookie";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BsSearch } from "react-icons/bs";
import { HiMiniPencilSquare, HiMiniTrash } from "react-icons/hi2";
import { TfiDropboxAlt } from "react-icons/tfi";

export default function Page() {
  const [products, setProducts] = useState([]);

  async function handleDelete(e, id) {
    e.preventDefault();

    try {
      const confirmation = confirm("Are you sure you want to delete?");
      if (confirmation) {
        const resp = await publicRequest.delete(`/products/${id}`, {
          headers: { Authorization: `Bearer ${getCookie("token")}` },
        });
        if (resp.status === 200) {
          toast.success(resp.data.message);
          setProducts((prev) => prev.filter((product) => product.id !== id));
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    (async function () {
      const resp = await publicRequest.get("/products");
      setProducts(resp.data);
      console.log(resp.data);
    })();
  }, []);

  return (
    <>
      <section className="viewSection mt-3">
        <div className="container-fluid">
          <div className="statsTable">
            <div className="spcbtwn mb-3">
              <h4>
                <TfiDropboxAlt />
                Recently Added Products
              </h4>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Sr No.</th>
                  <th>Product Name</th>
                  <th>Sub Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product, key) => {
                  return (
                    <tr key={product.id}>
                      <td>{key + 1}</td>
                      <td>{product.title}</td>
                      <td>{product.sub_category_name}</td>
                      <td>
                        <div className="actionBox d-flex gap-10 justify-content-center">
                          <Link
                            className="viewBtn"
                            href={`/admin/products/${product.id}/update`}
                          >
                            <HiMiniPencilSquare />
                          </Link>
                          <button
                            className="deleteBtn"
                            onClick={(e) => handleDelete(e, product.id)}
                          >
                            <HiMiniTrash />
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
