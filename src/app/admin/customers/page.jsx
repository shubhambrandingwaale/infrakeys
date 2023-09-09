"use client";
import { publicRequest } from "@/libs/requestMethods";
import { getCookie } from "@/utils/getCookie";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";

export default function Page() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const resp = await publicRequest.get("/users", {
          headers: { Authorization: `Bearer ${getCookie("token")}` },
        });
        setCustomers(resp.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
  }, []);
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
                  <th>actions</th>
                </tr>
              </thead>
              <tbody>
                {customers?.map((customer, key) => {
                  return (
                    customer.role === "user" && (
                      <tr key={customer.id}>
                        <td>{key}</td>
                        <td>{customer.fullname}</td>
                        <td>{customer.email}</td>
                        <td>{customer.phone}</td>
                        <td>
                          {new Date(customer.created_at).toDateString()}
                        </td>{" "}
                        <td>
                          {customer.city}, {customer.state}
                        </td>
                        <td>
                          <Link
                            className="viewBtn"
                            href={`/admin/customers/${customer.fullname
                              .toLowerCase()
                              .split(" ")
                              .join("-")}/${customer.id}`}
                          >
                            <AiOutlineEye />
                          </Link>
                        </td>
                      </tr>
                    )
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
