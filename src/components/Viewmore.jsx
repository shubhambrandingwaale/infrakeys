import Link from "next/link";
import React from "react";
import { BsChevronRight } from "react-icons/bs";

export default function Viewmore(props) {
  return (
    <Link className="viewMore" href={props.viewLink} title="View More">
      View More <BsChevronRight />
    </Link>
  );
}
