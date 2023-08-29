"use client";
import Viewmore from "@/components/Viewmore";
import { publicRequest } from "@/libs/requestMethods";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
export default function Page({ params: { subCategoryId } }) {
  const [products, setProducts] = useState([]);
  console.log(subCategoryId);
  useEffect(() => {
    (async function () {
      try {
        const resp = await publicRequest.get(`/products`);
        console.log(resp.data);
        setProducts(
          resp.data.filter((item) => item.sub_category_id === +subCategoryId)
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, [subCategoryId]);
  return (
    <>
      <section className="plainSection">
        <div className="container-fluid">
          <div className="row">
            {products?.map((product) => {
              return (
                <div className="col-lg-3 col-md-4 col-sm-6" key={product.id}>
                  <div className="productCard">
                    <div className="productImg">
                      <Image
                        src={`https://infrakeys-backend-production.up.railway.app${product?.images[0]}`}
                        height={150}
                        width={300}
                        alt={`${product?.title} Products | Infrakeys`}
                      />
                    </div>
                    <div className="productContent">
                      <Link href="/">
                        <h3>{product?.title}</h3>
                      </Link>
                      <p>{product?.about}... </p>
                      <Viewmore
                        viewLink={`/products/${product?.title
                          .toLowerCase()
                          .split(" ")
                          .join("-")}/${product?.id}`}
                      />
                    </div>
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
