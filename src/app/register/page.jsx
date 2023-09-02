"use client";
import CenterHeading from "@/components/CenterHeading";
import { publicRequest } from "@/libs/requestMethods";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

export default function Page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [inputVals, setInputVals] = useState({
    fullname: "",
    email: "",
    password: "",
    city: "",
    state: "",
  });

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const resp = await publicRequest.post(`/auth/register`, { ...inputVals });
      if (resp.status === 200) {
        toast.success("You registered successfully.");
        router.push("/login");
      }
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(inputVals);
  return (
    <>
      <section className="loginSection">
        <div className="container">
          <div className="row centerit">
            <div className="col-lg-4 col-sm-8">
              <div className="loginForm">
                <form onSubmit={onSubmit}>
                  <CenterHeading heading="Sign Up" />
                  <input
                    type="text"
                    placeholder="Full name"
                    name="fullname"
                    onChange={(e) => {
                      setInputVals((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }));
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    onChange={(e) => {
                      setInputVals((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }));
                    }}
                  />
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    onChange={(e) => {
                      setInputVals((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }));
                    }}
                  />
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    onChange={(e) => {
                      setInputVals((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }));
                    }}
                  />
                  <input
                    type="text"
                    placeholder="State"
                    name="state"
                    onChange={(e) => {
                      setInputVals((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }));
                    }}
                  />
                  <button type="submit" className="commonBtn">
                    Sign Up
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
