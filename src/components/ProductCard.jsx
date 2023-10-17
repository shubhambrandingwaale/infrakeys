"use client";
import IndustryCard from "@/components/IndustryCard";
import CenterAttachheading from "@/components/CenterAttachheading";
import ProductBread from "@/components/ProductBread";
import { publicRequest } from "@/libs/requestMethods";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { getCookie } from "@/utils/getCookie";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { RxCross1 } from "react-icons/rx";
import { FcApproval } from "react-icons/fc";
import { BsChevronRight } from "react-icons/bs";
import { useRouter } from "next/navigation";

export default function ProductCard({ id }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [recentltViewed, setRecentltViewed] = useState([]);
  const [product, setProduct] = useState({});
  const [applications, setApplications] = useState([]);
  const [features, setFeatures] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [productUsedBy, setProductUsedBy] = useState([]);
  const router = useRouter();

  function handleNavigate() {
    router.push("/otpverify");
  }
  // console.log(product);
  async function sendOtp(e) {
    console.log(getCookie("user_phone"));
    e.preventDefault();
    try {
      const resp = await publicRequest.post("/send-otp", {
        name: getCookie("user_fullname"),
        phone: getCookie("user_phone"),
      });
      if (resp.data.result === true) {
        toast.success("OTP has been sent to your Whatsapp");
        handleNavigate();
        console.log(resp.data);
      }
      setShowOtpinput(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRaiseEnquiry(productId, userId) {
    if (!getCookie("token")) {
      return toast((t) => (
        <span className="w300">
          <div className="d-flex justify-content-between">
            <h4>Please login first</h4>
            <button
              className="mb-3 deleteBtn"
              onClick={() => toast.dismiss(t.id)}
            >
              <RxCross1 />
            </button>
          </div>
          <br />
          <Link className="commonBtn" href={"/login"}>
            Go to login
          </Link>
        </span>
      ));
    }
    try {
      const resp = await publicRequest.post(
        "/product-queries",
        { productId, userId },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      console.log(resp.data);
      if (resp.status === 200) {
        return toast((t) => (
          <span className="w300">
            <div className="d-flex justify-content-between">
              <h4>Product Enquiry raised</h4>
              <FcApproval />
            </div>
            <h6>
              Product enquiry raised successfully <br />
              We will reach you soon
            </h6>
          </span>
        ));
      }
    } catch (error) {
      return toast((t) => (
        <span className="w300">
          <div className="d-flex justify-content-between">
            <h4>{error.response.data.message}</h4>
            <button
              className="mb-3 deleteBtn"
              onClick={() => toast.dismiss(t.id)}
            >
              <RxCross1 />
            </button>
          </div>
          <br />
          <button className="commonBtn" onClick={sendOtp}>
            Send OTP
          </button>
        </span>
      ));
    }
  }

  useEffect(() => {
    getCookie("token") &&
      (async function (id) {
        console.log("productId");
        try {
          const resp = await publicRequest.post(
            "/view-product",
            {
              productId: id,
              userId: getCookie("user_id"),
            },
            {
              headers: { Authorization: `Bearer ${getCookie("token")}` },
            }
          );
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
        console.log(resp.data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [id]);

  useEffect(() => {
    product.sub_category_id &&
      (async function () {
        try {
          const resp = await publicRequest.get(
            `/products/related-products/${product.sub_category_id}`
          );
          setRelatedProducts(resp.data);
        } catch (error) {
          console.log(error);
        }
      })();
  }, [product.sub_category_id]);

  useEffect(() => {
    async function fetchRecentlyViewed(id) {
      try {
        const resp = await publicRequest.get(`/recently-viewed/${id}`, {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        });
        setRecentltViewed(resp.data);
        console.log("recent", resp.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchRecentlyViewed(getCookie("user_id"));
  }, [id]);
  console.log(product);
  return (
    <>
      <ProductBread
        name={product?.title}
        productUrl={`/products/${product?.title}/${product.id}`}
      />
      <section className="productAbout ligtbgSection">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-5">
              <div className="productMainImg">
                <div className="productSlider">
                  <Swiper
                    pagination={true}
                    navigation={true}
                    modules={[Pagination]}
                    className="productAboutSlider"
                  >
                    {product?.images?.map((image, key) => {
                      return (
                        <SwiperSlide key={key}>
                          <div className="productSlides">
                            <Image
                              src={`https://infrakeysapp.in${image}`}
                              height={500}
                              width={800}
                              alt={`${product.title} | Infrakeys`}
                              title={`${product.title} | Infrakeys`}
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
                <p>{product?.about}</p>
                <button
                  className="commonBtn"
                  onClick={() =>
                    handleRaiseEnquiry(product.id, getCookie("user_id"))
                  }
                >
                  Raise Enquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="productDesc ligtbgSection mt-section">
        <CenterAttachheading heading="Description" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="descList">
                <ul className="p-3">
                  {descriptions?.map((item) => {
                    return (
                      <li className="lsn" key={item.id}>
                        {item.description}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {features.length > 0 ? (
        <section className="productFeatures">
          <div className="container-fluid">
            {/* <CenterAttachheading heading="Features" /> */}
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
      ) : (
        ""
      )}

      {productUsedBy.length > 0 ? (
        <section className="usedBy ligtbgSection mt-section">
          <div className="container-fluid">
            <CenterAttachheading heading=" Used By Industries" />
            <div className="row mt-3">
              {productUsedBy?.map((item) => {
                return <IndustryCard item={item} key={item.id} />;
              })}
            </div>
          </div>
        </section>
      ) : (
        ""
      )}

      {/* <section className="applications ligtbgSection mt-section">
        <CenterAttachheading heading="Applications" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="applicationBox">
                <ul className="p-3">
                  {applications?.map((item) => {
                    return (
                      <li className="lsn" key={item.id}>
                        {item.application}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {relatedProducts.length > 0 ? (
        <section className="related ligtbgSection mt-section">
          <div className="container-fluid">
            <CenterAttachheading heading="Related Products" />
            <div className="row">
              <div className="col-12">
                <Swiper
                  className="relatedProducts"
                  pagination={true}
                  modules={[Pagination]}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 40,
                    },
                    1024: {
                      slidesPerView: 4,
                      spaceBetween: 20,
                    },
                  }}
                >
                  {relatedProducts?.map((productItem, key) => (
                    <SwiperSlide key={key}>
                      <div className="productCard">
                        <div className="productImg">
                          <Image
                            src={`https://infrakeysapp.in${productItem.images[0]}`}
                            height={150}
                            width={300}
                            alt={`${productItem.title} product | Infrakeys`}
                          />
                        </div>
                        <div className="productContent">
                          <Link
                            href={`/products/${productItem.title
                              .toLowerCase()
                              .split(" ")
                              .join("-")}/${productItem.id}`}
                          >
                            <h3>{productItem.title}</h3>
                          </Link>

                          <Link
                            title="View More"
                            className="viewMore"
                            href={`/products/${productItem.title
                              .toLowerCase()
                              .split(" ")
                              .join("-")}/${productItem.id}`}
                          >
                            View Product
                            <BsChevronRight />
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}

      {recentltViewed.length > 0 ? (
        <section className="recentlyviewed ligtbgSection mt-section">
          <div className="container-fluid">
            <CenterAttachheading heading="Recently Viewed Products" />
            <div className="row">
              <div className="col-12">
                <Swiper
                  className="productAboutSlider"
                  pagination={true}
                  modules={[Pagination]}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 40,
                    },
                    1024: {
                      slidesPerView: 4,
                      spaceBetween: 20,
                    },
                  }}
                >
                  {recentltViewed?.map((productItem, key) => (
                    <SwiperSlide key={key}>
                      <div className="productCard">
                        <div className="productImg">
                          <Image
                            src={`https://infrakeysapp.in${productItem.images[0]}`}
                            height={150}
                            width={300}
                            alt={`${productItem.title} product | Infrakeys`}
                          />
                        </div>
                        <div className="productContent">
                          <Link
                            href={`/products/${productItem.title
                              .toLowerCase()
                              .split(" ")
                              .join("-")}/${productItem.id}`}
                          >
                            <h3>{productItem.title}</h3>
                          </Link>
                          <Link
                            title="View More"
                            className="viewMore"
                            href={`/products/${productItem.title
                              .toLowerCase()
                              .split(" ")
                              .join("-")}/${productItem.id}`}
                          >
                            View Product
                            <BsChevronRight />
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
}
