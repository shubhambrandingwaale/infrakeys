// "use client";
// import React, { useRef, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import ProductCard from "./ProductCard";
// import "swiper/css/navigation";
// import { Navigation } from "swiper/modules";
// export default function Relatedproducts() {
//   return (
//     <>
//       <div className="relatedProducts">
//         <Swiper
//           navigation={true}
//           modules={[Navigation]}
//           slidesPerView={1}
//           spaceBetween={10}
//           pagination={{
//             clickable: true,
//           }}
//           breakpoints={{
//             640: {
//               slidesPerView: 2,
//               spaceBetween: 20,
//             },
//             768: {
//               slidesPerView: 3,
//               spaceBetween: 20,
//             },
//             1024: {
//               slidesPerView: 3.7,
//               spaceBetween: 20,
//             },
//           }}
//           modules={[Pagination]}
//           className="relatedproductslider"
//         >
//           <SwiperSlide>
//             <ProductCard />
//           </SwiperSlide>
//           <SwiperSlide>
//             <ProductCard />
//           </SwiperSlide>
//           <SwiperSlide>
//             <ProductCard />
//           </SwiperSlide>
//           <SwiperSlide>
//             <ProductCard />
//           </SwiperSlide>
//           <SwiperSlide>
//             <ProductCard />
//           </SwiperSlide>
//           <SwiperSlide>
//             <ProductCard />
//           </SwiperSlide>
//         </Swiper>
//       </div>
//     </>
//   );
// }
