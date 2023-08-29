"use client";
import CenterHeading from "@/components/CenterHeading";
import { publicRequest } from "@/libs/requestMethods";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Page({ params: { categoryId } }) {
  const [subCategories, setSubCategories] = useState([]);
  console.log(subCategories, categoryId);
  useEffect(() => {
    (async function () {
      try {
        const resp = await publicRequest.get(`/sub-categories`);
        // const data = resp.data;
        console.log(resp.data);
        setSubCategories(
          resp.data.filter((item) => item.category_id === +categoryId)
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, [categoryId]);

  return (
    <>
      <section className="subCategories commonSection">
        <CenterHeading heading="Sub Categories" />
        <div className="container-fluid">
          <div className="row mt-3">
            {subCategories?.map((subcategory) => {
              return (
                <div
                  key={subcategory.id}
                  className="col-lg-2 col-md-3 col-sm-4 col-6"
                >
                  <div className="categoryCard">
                    <Link
                      href={`/sub-categories/${subcategory.name
                        .toLowerCase()
                        .split(" ")
                        .join("-")}/${subcategory.id}`}
                    >
                      <Image
                        src={`https://infrakeys-backend-production.up.railway.app${subcategory.image_url}`}
                        alt={`${subcategory.name} | Sub Category | Infrakeys`}
                        width={100}
                        height={100}
                      />
                      <span>{subcategory.name}</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
