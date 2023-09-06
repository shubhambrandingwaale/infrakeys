"use client";
import { getCookie } from "@/utils/getCookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { MdLogout } from "react-icons/md";
import { TbArrowBackUp } from "react-icons/tb";

const Adminlayout = ({ children }) => {
  const router = useRouter();
  // console.log(router);
  useEffect(() => {
    if (getCookie("user_role") !== "admin") {
      return router.push("/");
    }
  }, []);
  function handleNavigate() {
    router.push("/login");
  }
  function clearCookie() {
    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    handleNavigate();
  }
  return (
    <>
      <div className="d-flex justify-content-between pt-3 px-3">
        <button className="whiteBtn" onClick={() => router.back()}>
          <TbArrowBackUp />
          back
        </button>
        <div className="logoDashBoard">
          <Link className="d-block" href="/admin">
            <Image src="/logo.png" height={70} width={140} alt="Logo" />
          </Link>
        </div>
        <button className="whiteBtn" onClick={() => clearCookie()}>
          Logout
          <MdLogout />
        </button>
      </div>
      {children}
    </>
  );
};

export default Adminlayout;
