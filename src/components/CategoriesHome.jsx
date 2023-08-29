import React from "react";
import CenterHeading from "./CenterHeading";
import CategoryCard from "./CategoryCard";
import { publicRequest } from "@/libs/requestMethods";
export default async function CategoriesHome({}) {
  const resp = await publicRequest.get("/categories");
  const data = resp.data;
  return (
    <>
      <section className="commonSection">
        <div className="container-fluid">
          <CenterHeading heading="Product Categories" />
          <div className="row">
            {data?.map((category) => {
              return <CategoryCard category={category} key={category.id} />;
            })}
          </div>
        </div>
      </section>
    </>
  );
}
