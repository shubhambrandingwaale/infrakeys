"use client";
import CenterHeading from "@/components/CenterHeading";
import { publicRequest } from "@/libs/requestMethods";
import { getCookie } from "@/utils/getCookie";
import Image from "next/image";
import Link from "next/link";
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
      return handleNavigateHome();
    } else {
      return handleNavigate();
    }
  }
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
        document.cookie = `token=${resp.data.access_token}; path=/`;
        document.cookie = `user_fullname=${resp.data.user.fullname}; path=/`;
        document.cookie = `user_phone=${resp.data.user.phone}; path="/"`;
        document.cookie = `user_email=${resp.data.user.email}; path=/`;
        document.cookie = `user_id=${resp.data.user.id}; path=/`;
        document.cookie = `user_role=${resp.data.user.role}; path=/`;

        if (resp.data.user.role === "user") {
          handleNavigateHome();
        } else {
          handleNavigate();
        }
      }
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
                  <Image src="/logo.png" height={65} width={150} alt="Logo" />
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
                    Login
                  </button>
                </form>
              </div>
              <div className="signupBar text-center mt-3">
                Don't have an account ?<Link href="/register"> Register</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
