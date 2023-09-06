import React, { useEffect, useState } from "react";
import AdminHeading from "./AdminHeading";
import { publicRequest } from "@/libs/requestMethods";
import { toast } from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import Image from "next/image";
import { getCookie } from "@/utils/getCookie";

export default function AddUsedby({ productId }) {
  const [options, setOptions] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  // console.log(selectedItems);
  // console.log(options);
  useEffect(() => {
    async function fetchIndustries() {
      try {
        const resp = await publicRequest.get("/industries");
        setOptions(resp.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchIndustries();
  }, []);

  function handleSelectChange(e) {
    console.log(e);
    // setSelected((prev) => [...prev, e[0]]);
  }

  const handleAddItem = (option) => {
    console.log(JSON.parse(option));
    setSelectedItems((prev) => [...prev, JSON.parse(option)]);

    setOptions((prev) =>
      prev.filter((item) => item.id !== JSON.parse(option).id)
    );
  };

  const handleRemoveItem = (itemToRemove) => {
    setSelectedItems(
      selectedItems.filter((item) => item.id !== JSON.parse(itemToRemove).id)
    );
    setOptions((prev) => [...prev, JSON.parse(itemToRemove)]);
  };

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      const resp = await publicRequest.post(
        `/product-used-by`,
        {
          data: selectedItems,
          product_id: productId,
        },
        {
          headers: { Authorization: `Bearer ${getCookie("token")}` },
        }
      );
      if (resp.status === 200) {
        toast.success("Industries added to this Product");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <AdminHeading heading="Used by Industries" />
      </div>
      <form
        id="selectIndustry"
        className="selectIndustry"
        onSubmit={handleFormSubmit}
      >
        <div className="row">
          <div>
            <div className="inputGroup">
              <select
                className="createInput"
                onChange={(e) => handleAddItem(e.target.value)}
              >
                <option value="not selected" defaultValue="Not Selected" hidden>
                  Select Industries
                </option>
                {options.map((option) => (
                  <option key={option.id} value={JSON.stringify(option)}>
                    {option.title}
                  </option>
                ))}
              </select>
              <label className="user-label">Select Industries</label>
            </div>
          </div>

          <div className="col-12 mt-3 centerit">
            <button type="submit" className="commonBtn">
              Add all Industries
            </button>
          </div>
        </div>
      </form>
      {selectedItems.map((item) => {
        return (
          <div key={item.id} className="col-md-4 col-sm-4 col-6 mt-3">
            <div className="cardIndustry">
              <Image
                src={`https://infrakeysapp.in${item.image}`}
                width={40}
                height={40}
                alt="will change later"
              />
              <span>{item.title}</span>

              <button
                className="deleteBtn scalehalf"
                onClick={() => handleRemoveItem(JSON.stringify(item))}
              >
                <AiFillDelete />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
