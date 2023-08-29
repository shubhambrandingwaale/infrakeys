import Link from "next/link";
import React from "react";

export default function ProductBread(props) {
  return (
    <section className="productBread">
      <h3>{props.name}</h3>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/">Category Name</Link>
        </li>
        <li>
          <Link href="/">Sub Category Name</Link>
        </li>
        <li>
          <Link href="/">{props.name}</Link>
        </li>
      </ul>
    </section>
  );
}
