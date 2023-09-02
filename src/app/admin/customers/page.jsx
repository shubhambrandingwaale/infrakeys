import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

export default function Page() {
  return (
    <>
      <section className="commonSection">
        <div className="container-fluid">
          <div className="statsTable">
            <table>
              <thead>
                <tr>
                  <th>Sr. No</th>
                  <th>Customer Name</th>
                  <th>Email</th>
                  <th>Contact Number</th>
                  <th>Joined at</th>
                  <th>Location</th>
                  <th>Enquiries raised</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>01</td>
                  <td>Sandeep Gupta</td>
                  <td>sandeep@gmail.com</td>
                  <td>9898898887</td>
                  <td>27 June 2023</td>
                  <td>City, state</td>
                  <td>02</td>
                  <td>
                    <div className="actionBox d-flex gap-10 justify-content-center">
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
