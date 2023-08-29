"use client";
import CenterHeading from "@/components/CenterHeading";
import { publicRequest } from "@/libs/requestMethods";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

export default function Page() {
  const router = useRouter();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [inputVals, setInputVals] = useState({
    email: "",
    password: "",
  });
  console.log(inputVals);
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const resp = await publicRequest.post(`/auth/login`, { ...inputVals });
      if (resp.status === 200) {
        toast.success("You are now logged in.");
        router.push("/");
        document.cookie = `token=${resp.data.access_token}; path="/"`;
        document.cookie = `user_fullname=${resp.data.user.fullname}; path="/"`;
        document.cookie = `user_email=${resp.data.user.email}; path="/"`;
        document.cookie = `user_id=${resp.data.user.id}; path="/"`;
        document.cookie = `user_role=${resp.data.user.role}; path="/"`;
      }
      console.log(resp.data);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  }

  return (
    <>
      <section className="loginSection">
        <div className="container">
          <div className="row centerit">
            <div className="col-lg-4 col-sm-8">
              <div className="loginForm">
                <form onSubmit={(e) => handleLogin(e)}>
                  <CenterHeading heading="Login" />
                  <input
                    type="email"
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
                    placeholder="Password"
                    name="password"
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
