import React from "react";
import Link from "next/link";
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";
import { AiOutlineEye } from "react-icons/ai";
import { TfiDropboxAlt } from "react-icons/tfi";

export default function StatsTable() {
  return (
    <>
      <div className="col-md-3 col-sm-6">
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
    </>
  );
}
