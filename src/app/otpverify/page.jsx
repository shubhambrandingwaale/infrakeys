"use client";
import { publicRequest } from "@/libs/requestMethods";
import { getCookie } from "@/utils/getCookie";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const router = useRouter();
  function redirectHome() {
    router.push("/");
  }
  const [inputVals, setInputVals] = useState({
    otp: "",
  });
  async function verifyOtp(e) {
    e.preventDefault();
    try {
      const resp = await publicRequest.post(
        `/verify-otp`,
        { userId: getCookie("user_id"), otp: inputVals.otp },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      if (resp.status === 200) {
        toast.success("OTP verified successfully");
        redirectHome();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <>
      <section className="plainSection">
        <div className="container-fluid">
          <div className="row centerit vh-100">
            <div className="col-lg-4">
              <div className="loginForm">
                <form onSubmit={verifyOtp}>
                  <div className="inputGroup">
                    <input
                      required
                      autoComplete="off"
                      className="createInput"
                      type="text"
                      name="otp"
                      placeholder="Enter Otp"
                      onChange={(e) =>
                        setInputVals((prev) => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }))
                      }
                    />
                    <button
                      type="submit"
                      className="commonBtn mx-auto d-block mt-3"
                    >
                      Verify
                    </button>
                  </div>
                </form>
              </div>
            </div>{" "}
          </div>
        </div>
      </section>
    </>
  );
}
