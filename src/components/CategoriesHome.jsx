import React from "react";
import CenterHeading from "./CenterHeading";
import CategoryCard from "./CategoryCard";
import { publicRequest } from "@/libs/requestMethods";
export default async function CategoriesHome({}) {
  const resp = await publicRequest.get("/categories");
  const data = resp.data;

  return (
    <>
      {/* d-flex justify-content-start row-cols-xs-2 row-cols-lg-8 */}
      <section className="commonSection">
        <div className="container-fluid">
          <CenterHeading heading="Product Categories" />
          <div className="row d-flex justify-content-start row-cols-xs-2 row-cols-lg-8">
            {data?.map((category) => {
              return <CategoryCard category={category} key={category.id} />;
            })}
          </div>
        </div>
      </section>
    </>
  );
}
