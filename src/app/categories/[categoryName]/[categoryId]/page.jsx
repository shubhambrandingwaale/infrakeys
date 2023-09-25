"use client";
import CenterHeading from "@/components/CenterHeading";
import { publicRequest } from "@/libs/requestMethods";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Page({ params: { categoryId, categoryName } }) {
  const [subCategories, setSubCategories] = useState([]);
  console.log(subCategories, categoryId);
  useEffect(() => {
    (async function () {
      try {
        const resp = await publicRequest.get(`/sub-categories`);
        // const data = resp.data;

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
        <CenterHeading
          heading={categoryName.split("-").join(" ").toUpperCase()}
        />

        <div className="categoriesGrid">
          {subCategories?.map((subcategory) => {
            return (
              <div key={subcategory.id} className="categoryCard">
                <Link
                  href={`/sub-categories/${subcategory.name
                    .toLowerCase()
                    .split(" ")
                    .join("-")}/${subcategory.id}`}
                >
                  <Image
                    src={`https://infrakeysapp.in${subcategory.image_url}`}
                    alt={`${subcategory.name} | Sub Category | Infrakeys`}
                    width={250}
                    height={150}
                  />
                  <span>{subcategory.name}</span>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
