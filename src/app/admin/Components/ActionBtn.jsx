import React from "react";
import Link from "next/link";
import { AiOutlineAppstoreAdd } from "react-icons/ai";

export default function ActionBtn(props) {
  return (
    <>
      <div className="col-sm-6 mb-3">
        <Link className="actionBtn" href={props.link}>
          {props.icon}
          {props.name}
        </Link>
      </div>
    </>
  );
}
