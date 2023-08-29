"use client";
import CenterHeading from "@/components/CenterHeading";
import IndustryCard from "@/components/IndustryCard";
import Relatedproducts from "@/components/Relatedproducts";
import Productslider from "@/components/Productslider";
import Recentviewed from "@/components/Recentviewed";
import CenterAttachheading from "@/components/CenterAttachheading";
import ProductBread from "@/components/ProductBread";
import { publicRequest } from "@/libs/requestMethods";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { getCookie } from "@/utils/getCookie";

// export async function generateStaticParams() {
//   const products = await publicRequest.get(`/products`).then((res) => res.data);
//   console.log(
//     products.map((product) => ({
//       id: product.id,
//     }))
//   );
//   return products.map((product) => ({
//     id: product.id,
//   }));
// }

export default function Page({ params: { id } }) {
  // console.log(id);
  const [product, setProduct] = useState({});
  const [applications, setApplications] = useState([]);
  const [features, setFeatures] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [productUsedBy, setProductUsedBy] = useState([]);
  // console.log(product);

  useEffect(() => {
    getCookie("token") &&
      (async function (id) {
        console.log("productId");
        try {
          const resp = await publicRequest.post("/view-product", {
            productId: id,
            userId: getCookie("user_id"),
          });
        } catch (error) {
          console.log(error);
        }
      })(id);

    (async function () {
      try {
        const resp = await publicRequest.get(`/products/${id}`);
        setProduct(resp.data);
      } catch (error) {
        console.log(error);
      }
    })();

    (async function () {
      try {
        const resp = await publicRequest.get(
          `/product-applications/products/${id}`
        );
        setApplications(resp.data);
        // console.log("applications", resp.data);
      } catch (error) {
        console.log(error);
      }
    })();

    (async function () {
      try {
        const resp = await publicRequest.get(
          `/product-features/products/${id}`
        );
        setFeatures(resp.data);
        // console.log("features", resp.data);
      } catch (error) {
        console.log(error);
      }
    })();

    (async function () {
      try {
        const resp = await publicRequest.get(
          `/product-descriptions/products/${id}`
        );
        setDescriptions(resp.data);
        // console.log("descriptions", resp.data);
      } catch (error) {
        console.log(error);
      }
    })();

    (async function () {
      try {
        const resp = await publicRequest.get(`/product-used-by/products/${id}`);
        setProductUsedBy(resp.data);
        // console.log("product-used-by", resp.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  return (
    <>
      <ProductBread name={product?.title} />
      <section className="productAbout commonSection">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-5">
              <div className="productMainImg">
                <div className="productSlider">
                  <Swiper
                    pagination={true}
                    modules={[Pagination]}
                    className="productAboutSlider"
                  >
                    {product?.images?.map((image, key) => {
                      return (
                        <SwiperSlide key={key}>
                          <div className="productSlides">
                            <Image
                              src={`https:/infrakeys-backend-production.up.railway.app${image}`}
                              height={500}
                              width={800}
                              alt="shubs"
                              title="Shubham"
                            />
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <div className="productPage">
                <h1>{product?.title}</h1>
                <span className="infoCategories">sdf</span>
                <p>{product?.about}</p>
                <button className="commonBtn">defrgbhfbgvdcs</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="productDesc ligtbgSection mt-section">
        <CenterAttachheading heading="Description" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="descList">
                <ul>
                  {descriptions?.map((item) => {
                    return <li key={item.id}>{item.description}</li>;
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="productFeatures">
        <div className="container-fluid">
          <CenterHeading heading="Features" />
          <div className="row">
            <div className="col-12">
              <div className="featureBox">
                <table>
                  <tbody>
                    {features?.map((item) => {
                      return (
                        <tr key={item.id}>
                          <th>{item.title}</th>
                          <td>{item.feature}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="usedBy commonSection">
        <div className="container-fluid">
          <CenterHeading heading=" Used By Industries" />
          <div className="row mt-3">
            {productUsedBy?.map((item) => {
              return <IndustryCard item={item} key={item.id} />;
            })}
          </div>
        </div>
      </section>
      <section className="applications commonSection">
        <CenterHeading heading="Applications" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="applicationBox">
                <ul>
                  {applications?.map((item) => {
                    return <li key={item.id}>{item.application}</li>;
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="related ligtbgSection mt-section">
        <div className="container-fluid">
          <CenterAttachheading heading="Related Products" />
          <div className="row">
            <div className="col-12"></div>
          </div>
        </div>
      </section>

      <section className="related ligtbgSection mt-section">
        <div className="container-fluid">
          <CenterAttachheading heading="Recently Viewed Products" />
          <div className="row">
            <div className="col-12"></div>
          </div>
        </div>
      </section>
    </>
  );
}
