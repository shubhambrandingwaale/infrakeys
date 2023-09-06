"use client";
import ProductCard from "@/components/ProductCard";
import Viewmore from "@/components/Viewmore";
import { publicRequest } from "@/libs/requestMethods";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";

export default function Page() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async function () {
      try {
        const resp = await publicRequest.get("/products");

        setProducts(resp.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <section className="plainSection">
        <div className="container-fluid">
          <div className="row">
            {products?.map((product) => {
              return (
                <div
                  className="col-lg-3 col-md-4 col-sm-6 mt-3"
                  key={product.id}
                >
                  <div className="productCard">
                    <div className="productImg">
                      <Image
                        src={`https://infrakeysapp.in${product?.images[0]}`}
                        height={150}
                        width={300}
                        alt={`${product?.title} Products | Infrakeys`}
                      />
                    </div>
                    <div className="productContent">
                      <Link
                        href={`/products/${product?.title
                          .toLowerCase()
                          .split(" ")
                          .join("-")}/${product?.id}`}
                      >
                        <h3>{product?.title}</h3>
                      </Link>
                      <p>
                        {product.about.length > 150
                          ? product.about.substring(0, 150) + "..."
                          : product.about}
                      </p>
                    </div>
                    <Link
                      title="View More"
                      className="viewMore"
                      href={`/products/${product?.title
                        .toLowerCase()
                        .split(" ")
                        .join("-")}/${product?.id}`}
                    >
                      View Product
                      <BsChevronRight />
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
