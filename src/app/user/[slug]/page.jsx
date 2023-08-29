import React from "react";

export async function generateMetadata({ params: { slug } }) {
  const resp = await fetch(
    `https://jsonplaceholder.typicode.com/users/${slug}`
  );
  const data = await resp.json();
  if (!data) {
    return {
      title: "Not found!",
      description: "user not exist",
    };
  }
  return {
    title: data.name,
  };
}

export async function generateStaticParams() {
  const resp = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await resp.json();

  return data.map((user) => ({
    slug: toString(user.id),
  }));
}

const Page = async ({ params: { slug } }) => {
  const resp = await fetch(
    `https://jsonplaceholder.typicode.com/users/${slug}`
  );
  const data = await resp.json();
  return <div>{data.name}</div>;
};

export default Page;
