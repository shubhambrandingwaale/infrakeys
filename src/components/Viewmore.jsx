import Link from "next/link";
import React from "react";
import { HiOutlineDocumentMagnifyingGlass } from "react-icons/hi2";

export default function Viewmore(props) {
  return (
    <Link className="viewMore" href={props.viewLink} title="View More">
      View More <HiOutlineDocumentMagnifyingGlass />
    </Link>
  );
}
