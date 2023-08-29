// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import Viewmore from "./Viewmore";

// export default function ProductCard({ product }) {
//   // console.log(product);
//   const altproductimg = "Temporary Alt Tag Infrakeys";
//   return (
//     <>
//       <div className="col-lg-3 col-md-4 col-sm-6">
//         <div className="productCard">
//           <div className="productImg">
//             <Image
//               src={`https://infrakeys-backend-production.up.railway.app${product?.images[0]}`}
//               height={150}
//               width={300}
//               alt={`${product?.title} Products | Infrakeys`}
//             />
//           </div>
//           <div className="productContent">
//             <Link href="/">
//               <h3>{product?.title}</h3>
//             </Link>
//             <p>{product?.about}... </p>
//             <Viewmore viewLink={`/products/${product?.title}/${product?.id}`} />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
