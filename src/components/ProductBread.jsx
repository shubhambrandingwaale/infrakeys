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
          <Link href="/products">Products</Link>
        </li>
        <li>
          <Link href={props.productUrl.toLowerCase().split(" ").join("-")}>
            {props.name}
          </Link>
        </li>
      </ul>
    </section>
  );
}
