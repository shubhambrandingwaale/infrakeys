"use client";
import CenterHeading from "@/components/CenterHeading";
import { publicRequest } from "@/libs/requestMethods";
import { getCookie } from "@/utils/getCookie";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

export default function Page() {
  const router = useRouter();
  function handleNavigate() {
    router.push("/admin");
  }
  function handleNavigateHome() {
    router.push("/");
  }

  if (getCookie("token")) {
    if (getCookie("role") === "user") {
      return handleNavigate();
    } else {
      return handleNavigateHome();
    }
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [inputVals, setInputVals] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    state: "",
  });

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const resp = await publicRequest.post(`/auth/register`, { ...inputVals });
      if (resp.status === 200) {
        toast.success("You registered successfully.");
        document.cookie = `token=${resp.data.access_token}; path="/"`;
        document.cookie = `user_fullname=${resp.data.user.fullname}; path="/"`;
        document.cookie = `user_email=${resp.data.user.email}; path="/"`;
        document.cookie = `user_id=${resp.data.user.id}; path="/"`;
        document.cookie = `user_role=${resp.data.user.role}; path="/"`;
        if (resp.data.user.role === "user") {
          handleNavigateHome();
        } else {
          handleNavigate();
        }
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
                    type="tel"
                    placeholder="Contact Number"
                    name="phone"
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
