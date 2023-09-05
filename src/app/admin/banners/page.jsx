"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { publicRequest } from "@/libs/requestMethods";
import { toast } from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { getCookie } from "@/utils/getCookie";

export default function Page() {
  const [heroslides, setHeroslides] = useState([]);

  async function handleBannerDelete(id) {
    try {
      const confirmation = confirm("Are you sure you want to delete?");
      if (confirmation) {
        const resp = await publicRequest.delete(`/banners/${id}`, {
          headers: { Authorization: `Bearer ${getCookie("token")}` },
        });
        if (resp.status === 200) {
          toast.success("Banner deleted succesfully.");
          setHeroslides((prev) => prev.filter((item) => item.id !== id));
        }
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  }

  useEffect(() => {
    async function fetchBanners() {
      try {
        const resp = await publicRequest.get("/banners");
        setHeroslides(resp.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchBanners();
  }, []);
  return (
    <>
      <section className="plainSection">
        <div className="container-fluid">
          <div className="row">
            {heroslides.length < 1 ? (
              <h1 className="text-center">Add New Banners</h1>
            ) : (
              heroslides?.map((item) => (
                <div key={item.id} className="col-lg-4 col-sm-6">
                  <div className="bannerCard">
                    <Image
                      src={`https://infrakeysapp.in${item.banner_url}`}
                      height={300}
                      width={500}
                      alt="Banners of Image"
                    />
                    <div className="spcbtwn mt-2">
                      <h4>{item.name}</h4>
                      <button
                        className="deleteBtn"
                        onClick={() => handleBannerDelete(item.id)}
                      >
                        <AiOutlineDelete />
                      </button>
                    </div>
                    Category : {item.category_name}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
