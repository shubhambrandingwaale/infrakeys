import Link from "next/link";
import React from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { TfiDropboxAlt } from "react-icons/tfi";

export default function Page() {
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
                  <th>Customer name</th>
                  <th>Contact Number</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>01</td>
                  <td>Vishaal</td>
                  <td>9898989898</td>
                  <td>thevishaaltopa@gmail.com</td>
                  <td>
                    <div className="actionBox d-flex gap-10 justify-content-center">
                      <Link className="viewBtn" href="/">
                        <AiOutlineEye />
                      </Link>
                      <button className="deleteBtn">
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
