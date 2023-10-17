import ProductCard from "@/components/ProductCard";
import { publicRequest } from "@/libs/requestMethods";

export async function generateStaticParams() {
  const products = await publicRequest.get(`/products`);
  // console.log(products);
  if (!products) return [];
  return products?.data?.map((product) => ({
    id: product.id.toString(),
  }));
}

export async function generateMetadata({ params: { id } }) {
  try {
    const { data } = await publicRequest.get(`/products/${id}`);

    if (!data) {
      return {
        title: "Not Found!",
        description: "The page you you looking for does not exist!",
      };
    }
    return {
      title: data.title,
      description: data.about,
    };
  } catch (error) {
    console.log(error);
    return {
      title: "Not Found!",
      description: "The page you you looking for does not exist!",
    };
  }
}

export default async function Page({ params: { id } }) {
  return <ProductCard id={id} />;
}
