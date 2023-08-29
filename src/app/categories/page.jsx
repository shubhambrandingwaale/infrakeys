import React from "react";
import { publicRequest } from "@/libs/requestMethods";
import CenterHeading from "@/components/CenterHeading";
import CategoryCard from "@/components/CategoryCard";
export default async function Page() {
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
