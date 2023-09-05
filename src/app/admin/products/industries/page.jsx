"use client";
import CenterHeading from "@/components/CenterHeading";
import { publicRequest } from "@/libs/requestMethods";
import { getCookie } from "@/utils/getCookie";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";

export default function Page() {
  const [industries, setIndustries] = useState([]);
  useEffect(() => {
    async function fetchIndustries() {
      try {
        const resp = await publicRequest.get("industries");
        setIndustries(resp.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchIndustries();
  }, []);
  async function handleBannerDelete(id) {
    try {
      const confirmation = confirm("Are you sure you want to delete?");
      if (confirmation) {
        const resp = await publicRequest.delete(`/industries/${id}`, {
          headers: { Authorization: `Bearer ${getCookie("token")}` },
        });
        if (resp.status === 200) {
          toast.success("Industry deleted succesfully.");
          setIndustries((prev) =>
            prev.filter((industry) => industry.id !== id)
          );
        }
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  }
  return (
    <>
      <section className="commonSection">
        <div className="container-fluid">
          <CenterHeading heading="All Industries" />
          <div className="row">
            {industries?.map((industry) => (
              <div key={industry.id} className="col-lg-2 col-md-3 col-sm-4">
                <div className="indsutryCard">
                  <div className="d-flex justify-content-between align-items-center">
                    <Image
                      src={`https://infrakeysapp.in${industry.image}`}
                      width={50}
                      height={50}
                      alt="Used by Category Img"
                    />
                    <button
                      className="deleteBtn"
                      onClick={() => handleBannerDelete(industry.id)}
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                  <h5>{industry.title}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
