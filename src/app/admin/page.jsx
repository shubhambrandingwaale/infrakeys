"use client";
import React, { useEffect, useState } from "react";
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";
import Link from "next/link";
import { MdFormatListBulletedAdd, MdOutlineFactory } from "react-icons/md";
import { AiOutlineApartment, AiOutlinePartition } from "react-icons/ai";
import { TfiDropboxAlt } from "react-icons/tfi";
import ActionBtn from "./Components/ActionBtn";
import { HiViewGridAdd } from "react-icons/hi";
import { FaUsers } from "react-icons/fa";
import { TbUserQuestion } from "react-icons/tb";
import { BiSolidPieChartAlt2 } from "react-icons/bi";
import { publicRequest } from "@/libs/requestMethods";
import { getCookie } from "@/utils/getCookie";
import { useRouter } from "next/navigation";
import { BsBoxSeam, BsCardImage } from "react-icons/bs";

export default function Page() {
  const [stats, setStats] = useState([]);
  const [queries, setQueries] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
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
  useEffect(() => {
    (async function () {
      const resp = await publicRequest.get("/product-queries", {
        headers: { Authorization: `Bearer ${getCookie("token")}` },
      });
      setQueries(resp.data);
    })();

    (async function () {
      const resp = await publicRequest.get("/users", {
        headers: { Authorization: `Bearer ${getCookie("token")}` },
      });
      setUsers(resp.data);
      console.log("User data", resp.data);
    })();
  }, []);

  useEffect(() => {
    (async function () {
      try {
        const resp = await publicRequest.get("/dashboard/details", {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        });
        setStats(resp.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  console.log(stats);
  const router = useRouter();
  return (
    <>
      <section className="adminPanel">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-5 ">
              <div className="actionPanel statsTable">
                <div className="spcbtwn mb-3">
                  <h4>
                    <MdFormatListBulletedAdd />
                    Control Panel
                  </h4>
                </div>
                <div className="row" id="actionProducts">
                  <ActionBtn
                    name="Add Products"
                    link="/admin/products/add"
                    icon={<HiViewGridAdd />}
                  />
                  <ActionBtn
                    name="View All Products"
                    link="/admin/products"
                    icon={<BsBoxSeam />}
                  />
                </div>
                <div className="row" id="actionSubCategories">
                  <ActionBtn
                    name="Add Categories"
                    link="/admin/sub-categories/add"
                    icon={<HiViewGridAdd />}
                  />
                  <ActionBtn
                    name="View All Categories"
                    link="/admin/sub-categories"
                    icon={<AiOutlinePartition />}
                  />
                </div>
                <div className="row" id="actionProducts">
                  <ActionBtn
                    name="Add Industries"
                    link="/admin/products/industries/add"
                    icon={<HiViewGridAdd />}
                  />
                  <ActionBtn
                    name="View All Industries"
                    link="/admin/products/industries"
                    icon={<MdOutlineFactory />}
                  />
                  <ActionBtn
                    name="Add Banners"
                    link="/admin/banners/add"
                    icon={<HiViewGridAdd />}
                  />
                  <ActionBtn
                    name="View All Banners"
                    link="/admin/banners"
                    icon={<BsCardImage />}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="actionPanel  statsTable">
                <div className="spcbtwn mb-3">
                  <h4>
                    <BiSolidPieChartAlt2 />
                    Stats Panel
                  </h4>
                </div>
                <div className="row">
                  <div className="col-sm-4 mb-3 col-12">
                    <div className="statsCard">
                      <BsBoxSeam />
                      <h2>{stats[0]?.total_products}</h2>
                      <span>Total Products</span>
                    </div>
                  </div>
                  <div className="col-sm-4 mb-3 col-12">
                    <div className="statsCard">
                      <AiOutlinePartition />
                      <h2>{stats[0]?.total_sub_categories}</h2>
                      <span>Total Categories</span>
                    </div>
                  </div>
                  <div className="col-sm-4 mb-3 col-12">
                    <div className="statsCard">
                      <FaUsers />
                      <h2>{stats[0]?.total_users}</h2>
                      <span>Total Customers</span>
                    </div>
                  </div>
                  <div className="col-sm-4 mb-3 col-12">
                    <div className="statsCard">
                      <TbUserQuestion />
                      <h2>{stats[0]?.total_product_queries}</h2>
                      <span>Total Enquiries raised</span>
                    </div>
                  </div>
                  <div className="col-sm-4 mb-3 col-12">
                    <div className="statsCard">
                      <BsCardImage />
                      <h2>{stats[0]?.total_banners}</h2>
                      <span>Total Banners </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="adminPanel">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-5">
              <div className="statsTable">
                <div className="spcbtwn mb-3">
                  <h4>
                    <TbUserQuestion />
                    Recently Raised Enquries
                  </h4>
                  <Link className="viewAll" href="/admin/enquiries">
                    View All
                    <HiOutlineArrowTopRightOnSquare />
                  </Link>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Sr. No</th>
                      <th>Client Name</th>
                      <th>Product Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {queries?.slice(0, 10)?.map((query, key) => {
                      return (
                        <tr key={query.id}>
                          <td>{key + 1}</td>
                          <td>
                            <Link
                              href={`admin/customers/${query.user_name
                                .toLowerCase()
                                .split(" ")
                                .join("-")}/${query.user_id}`}
                            >
                              {query.user_name}
                            </Link>
                          </td>
                          <td>{query.product_name}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div className="statsTable">
                <div className="spcbtwn mb-3">
                  <h4>
                    <TfiDropboxAlt />
                    Recently Added Products
                  </h4>
                  <Link className="viewAll" href="/admin/products">
                    View All
                    <HiOutlineArrowTopRightOnSquare />
                  </Link>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Sr No.</th>
                      <th>Product Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products?.slice(0, 10).map((product, key) => {
                      return (
                        <tr key={product.id}>
                          <td>{key + 1}</td>
                          <td>{product.title}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="statsTable">
                <div className="spcbtwn mb-3">
                  <h4>
                    <TfiDropboxAlt />
                    New Customers
                  </h4>
                  <Link className="viewAll" href="/admin/customers">
                    View
                    <HiOutlineArrowTopRightOnSquare />
                  </Link>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Sr No.</th>
                      <th>Customer Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users
                      ?.filter((item) => item.role === "user")
                      .slice(0, 10)
                      .map((user, key) => {
                        return (
                          <tr key={user.id}>
                            <td>{key + 1}</td>
                            <td>{user.fullname}</td>
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
    </>
  );
}
