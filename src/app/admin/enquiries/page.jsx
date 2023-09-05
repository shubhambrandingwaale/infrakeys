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
  const [queries, setQueries] = useState([]);
  useEffect(() => {
    (async function () {
      const resp = await publicRequest.get("/product-queries", {
        headers: { Authorization: `Bearer ${getCookie("token")}` },
      });
      setQueries(resp.data);
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
                All Categories List
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
                  <th>Customer Name</th>
                  <th>Product</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {queries?.map((query, key) => {
                  return (
                    <tr key={query.id}>
                      <td>{key + 1}</td>
                      <td>
                        <Link
                          href={`customers/${query.user_name}/${query.user_id}`}
                        >
                          {query.user_name}
                        </Link>
                      </td>
                      <td>{query.product_name}</td>
                      <td>{new Date(query.timestamp).toDateString()}</td>
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
