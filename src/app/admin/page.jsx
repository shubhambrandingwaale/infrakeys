"use client";
import React, { useEffect, useState } from "react";
import StatsCard from "./Components/StatsCard";
import ActionPanel from "./Components/ActionPanel";
import StatsTable from "./Components/StatsTable";
import { TbUserQuestion } from "react-icons/tb";
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";
import Link from "next/link";
import {
  MdFormatListBulletedAdd,
  MdOutlineFactory,
  MdTrolley,
} from "react-icons/md";
import {
  AiOutlineApartment,
  AiOutlineEye,
  AiOutlinePartition,
} from "react-icons/ai";
import { TfiDropboxAlt } from "react-icons/tfi";
import ActionBtn from "./Components/ActionBtn";
import { HiViewGridAdd } from "react-icons/hi";
import { BsBoxSeam } from "react-icons/bs";
import { BiSolidPieChartAlt2 } from "react-icons/bi";
import { publicRequest } from "@/libs/requestMethods";

export default function Page() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const resp = await publicRequest.get("/dashboard/details");
        setStats(resp.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  console.log(stats);

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
                <div className="row" id="actionCategories">
                  <ActionBtn
                    name="Add Categories"
                    link="/admin/categories/add"
                    icon={<HiViewGridAdd />}
                  />
                  <ActionBtn
                    name="View all Categories"
                    link="/admin/categories"
                    icon={<AiOutlineApartment />}
                  />
                </div>
                <div className="row" id="actionSubCategories">
                  <ActionBtn
                    name="Add Sub catego.."
                    link="/admin/sub-categories/add"
                    icon={<HiViewGridAdd />}
                  />
                  <ActionBtn
                    name="View All Sub cate.."
                    link="/admin/sub-categories"
                    icon={<AiOutlinePartition />}
                  />
                </div>
                <div className="row" id="actionProducts">
                  <ActionBtn
                    name="Add Industries"
                    link="/admin/categories/add"
                    icon={<HiViewGridAdd />}
                  />
                  <ActionBtn
                    name="View All Industries"
                    link="/admin/categories"
                    icon={<MdOutlineFactory />}
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
                      <MdTrolley />
                      <h2>{stats[0]?.total_products}</h2>
                      <span>Total Products</span>
                    </div>
                  </div>
                  <div className="col-sm-4 mb-3 col-12">
                    <div className="statsCard">
                      <MdTrolley />
                      <h2>{stats[0]?.total_categories}</h2>
                      <span>Total Categories</span>
                    </div>
                  </div>
                  <div className="col-sm-4 mb-3 col-12">
                    <div className="statsCard">
                      <MdTrolley />
                      <h2>{stats[0]?.total_sub_categories}</h2>
                      <span>Total Sub Categories</span>
                    </div>
                  </div>
                  <div className="col-sm-4 mb-3 col-12">
                    <div className="statsCard">
                      <MdTrolley />
                      <h2>{stats[0]?.total_users}</h2>
                      <span>Total Customers</span>
                    </div>
                  </div>
                  <div className="col-sm-4 mb-3 col-12">
                    <div className="statsCard">
                      <MdTrolley />
                      <h2>{stats[0]?.total_product_queries}</h2>
                      <span>Total Enquiries raised</span>
                    </div>
                  </div>
                  <div className="col-sm-4 mb-3 col-12">
                    <div className="statsCard">
                      <MdTrolley />
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
                  <Link className="viewAll" href="/">
                    View All
                    <HiOutlineArrowTopRightOnSquare />
                  </Link>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Sr. No</th>
                      <th>Product Name</th>
                      <th>Client Name</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Product B</td>
                      <td>Ashok Sharma</td>
                      <td>15:20, 17 Sept, 2023</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Product A</td>
                      <td>Vishal Gautam</td>
                      <td>11:35, 20 Sept, 2023</td>
                    </tr>
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
                  <Link className="viewAll" href="/">
                    View All
                    <HiOutlineArrowTopRightOnSquare />
                  </Link>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Sr No.</th>
                      <th>Product Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>01</td>
                      <td>Steel Iron</td>
                      <td className="centerit">
                        <Link className="viewBtn" href="/">
                          <AiOutlineEye />
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>01</td>
                      <td>Steel Iron</td>
                      <td className="centerit">
                        <Link className="viewBtn" href="/">
                          <AiOutlineEye />
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>01</td>
                      <td>Steel Iron</td>
                      <td className="centerit">
                        <Link className="viewBtn" href="/">
                          <AiOutlineEye />
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>01</td>
                      <td>Steel Iron</td>
                      <td className="centerit">
                        <Link className="viewBtn" href="/">
                          <AiOutlineEye />
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>01</td>
                      <td>Steel Iron</td>
                      <td className="centerit">
                        <Link className="viewBtn" href="/">
                          <AiOutlineEye />
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>01</td>
                      <td>Steel Iron</td>
                      <td className="centerit">
                        <Link className="viewBtn" href="/">
                          <AiOutlineEye />
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>01</td>
                      <td>Steel Iron</td>
                      <td className="centerit">
                        <Link className="viewBtn" href="/">
                          <AiOutlineEye />
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>01</td>
                      <td>Steel Iron</td>
                      <td className="centerit">
                        <Link className="viewBtn" href="/">
                          <AiOutlineEye />
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>01</td>
                      <td>Steel Iron</td>
                      <td className="centerit">
                        <Link className="viewBtn" href="/">
                          <AiOutlineEye />
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>01</td>
                      <td>Steel Iron</td>
                      <td className="centerit">
                        <Link className="viewBtn" href="/">
                          <AiOutlineEye />
                        </Link>
                      </td>
                    </tr>
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
                  <Link className="viewAll" href="/">
                    View
                    <HiOutlineArrowTopRightOnSquare />
                  </Link>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Sr No.</th>
                      <th>Product Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>01</td>
                      <td>Steel Iron</td>
                      <td className="centerit">
                        <Link className="viewBtn" href="/">
                          <AiOutlineEye />
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>01</td>
                      <td>Steel Iron</td>
                      <td className="centerit">
                        <Link className="viewBtn" href="/">
                          <AiOutlineEye />
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>01</td>
                      <td>Steel Iron</td>
                      <td className="centerit">
                        <Link className="viewBtn" href="/">
                          <AiOutlineEye />
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>01</td>
                      <td>Steel Iron</td>
                      <td className="centerit">
                        <Link className="viewBtn" href="/">
                          <AiOutlineEye />
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>01</td>
                      <td>Steel Iron</td>
                      <td className="centerit">
                        <Link className="viewBtn" href="/">
                          <AiOutlineEye />
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>01</td>
                      <td>Steel Iron</td>
                      <td className="centerit">
                        <Link className="viewBtn" href="/">
                          <AiOutlineEye />
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>01</td>
                      <td>Steel Iron</td>
                      <td className="centerit">
                        <Link className="viewBtn" href="/">
                          <AiOutlineEye />
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>01</td>
                      <td>Steel Iron</td>
                      <td className="centerit">
                        <Link className="viewBtn" href="/">
                          <AiOutlineEye />
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>01</td>
                      <td>Steel Iron</td>
                      <td className="centerit">
                        <Link className="viewBtn" href="/">
                          <AiOutlineEye />
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>01</td>
                      <td>Steel Iron</td>
                      <td className="centerit">
                        <Link className="viewBtn" href="/">
                          <AiOutlineEye />
                        </Link>
                      </td>
                    </tr>
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
