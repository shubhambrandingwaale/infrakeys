"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FiLogOut, FiUser } from "react-icons/fi";
import { BsBag, BsReceipt, BsSearch, BsWhatsapp } from "react-icons/bs";
import { PiHandsPraying } from "react-icons/pi";
import Link from "next/link";
import { MdOutlineDashboard } from "react-icons/md";
import { publicRequest } from "@/libs/requestMethods";
import { useRouter } from "next/navigation";
import { getCookie } from "@/utils/getCookie";
export default function Header() {
  const router = useRouter();
  const [userClicked, setUserClicked] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const debounce = (func, delay) => {
    let timerId;
    return function (...args) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  // Create a debounced version of the search function with a 500ms delay
  const debouncedSearchFunction = debounce((searchTerm) => {
    setDebouncedSearch(searchTerm);
    // You can perform your search or other action here
  }, 500);
  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    debouncedSearchFunction(newSearchTerm);
  };
  const isInputValid = searchTerm.trim() !== "";
  const barHideShow = () => {
    setUserClicked(!userClicked);
  };

  useEffect(() => {
    // Make the API request when the debouncedSearch term changes
    if (debouncedSearch) {
      publicRequest
        .get(`/search?q=${debouncedSearch}`)
        .then((response) => {
          setSearchResults(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      // Clear search results if debouncedSearch is empty
      setSearchResults([]);
    }
  }, [debouncedSearch]);

  function handleNavigate() {
    router.push("/login");
  }

  return (
    <>
      <header>
        <div className="deskHeader">
          <div className="logo">
            <Link href="/">
              <Image
                src="/logo.png"
                height={115}
                width={255}
                alt="Infrakeys | Logo"
              />
            </Link>
          </div>
          <div className="searchBar">
            <form>
              <input
                title="Search Products"
                type="text"
                placeholder="Search Products"
                value={searchTerm}
                onChange={handleInputChange}
              />
              <button>
                <BsSearch />
              </button>
            </form>
            {isInputValid && (
              <div className="searchList">
                <ul>
                  {searchResults?.length > 0 ? (
                    searchResults?.map((item, key) => {
                      return (
                        <li key={key}>
                          <Link
                            href={`/products/${item.title
                              .toLowerCase()
                              .split(" ")
                              .join("-")}/${item.id}`}
                            title={item.title}
                          >
                            <div className="searchLink">
                              <span
                                title="TMT Sariya Bars"
                                className="searchName"
                              >
                                {item.title}
                              </span>
                            </div>
                          </Link>
                        </li>
                      );
                    })
                  ) : (
                    <li>No product found</li>
                  )}
                </ul>
              </div>
            )}
          </div>
          <div className="headerBtns">
            <a className="buysell" href="/" target="_blank">
              <BsBag /> Buy
            </a>
            <a className="buysell" href="/" target="_blank">
              <BsReceipt />
              Sell
            </a>
          </div>
          <div className="userView">
            {getCookie("token") ? (
              <button onClick={barHideShow} className="username">
                <>
                  <span>{getCookie("user_fullname")}</span>
                  <FiUser />
                </>
              </button>
            ) : (
              <button onClick={barHideShow} className="username">
                Login/Signup
              </button>
            )}

            {userClicked && (
              <div className="userminiPanel">
                {getCookie("token") ? (
                  <>
                    <div className="userInfo">
                      <div className="circleUser">
                        <FiUser />
                        <div className="contact">
                          <h6>{getCookie("user_fullname")}</h6>
                          <span>{getCookie("user_email")}</span>
                        </div>
                      </div>
                    </div>
                    <ul>
                      <li>
                        <Link href="/my-dashboard">
                          <MdOutlineDashboard />
                          My Dashboard
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            document.cookie.split(";").forEach(function (c) {
                              document.cookie = c
                                .replace(/^ +/, "")
                                .replace(
                                  /=.*/,
                                  "=;expires=" +
                                    new Date().toUTCString() +
                                    ";path=/"
                                );
                            });
                            handleNavigate();
                          }}
                        >
                          <FiLogOut />
                          Logout
                        </button>
                      </li>
                    </ul>
                  </>
                ) : (
                  <>
                    <h4 className="mb-3">Please Login First</h4>
                    <Link className="commonBtn w-auto" href={"/login"}>
                      Login
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="smartHeader">
          <div className="d-flex justify-content-between align-items-center">
            <div className="logo">
              <Link href="/">
                <Image
                  src="/logo.png"
                  height={55}
                  width={120}
                  alt="Infrakeys | Logo"
                />
              </Link>
            </div>
            <div className="userView">
              {getCookie("token") ? (
                <button onClick={barHideShow} className="username">
                  <>
                    <span>{getCookie("user_fullname")}</span>
                    <FiUser />
                  </>
                </button>
              ) : (
                <button onClick={barHideShow} className="username">
                  Login/Signup
                </button>
              )}

              {userClicked && (
                <div className="userminiPanel">
                  {getCookie("token") ? (
                    <>
                      <div className="userInfo">
                        <div className="circleUser">
                          <FiUser />
                          <div className="contact">
                            <h6>{getCookie("user_fullname")}</h6>
                            <span>{getCookie("user_email")}</span>
                          </div>
                        </div>
                      </div>
                      <ul>
                        <li>
                          <Link href="/my-dashboard">
                            <MdOutlineDashboard />
                            My Dashboard
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              document.cookie.split(";").forEach(function (c) {
                                document.cookie = c
                                  .replace(/^ +/, "")
                                  .replace(
                                    /=.*/,
                                    "=;expires=" +
                                      new Date().toUTCString() +
                                      ";path=/"
                                  );
                              });
                              handleNavigate();
                            }}
                          >
                            <FiLogOut />
                            Logout
                          </button>
                        </li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <h4 className="mb-3">Please Login First</h4>
                      <Link className="commonBtn w-auto" href={"/login"}>
                        Login
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="searchBar">
            <form>
              <input
                title="Search Products"
                type="text"
                placeholder="Search Products"
                value={searchTerm}
                onChange={handleInputChange}
              />
              <button>
                <BsSearch />
              </button>
            </form>
            {isInputValid && (
              <div className="searchList">
                <ul>
                  {searchResults?.map((item, key) => {
                    return (
                      <li key={key}>
                        <Link
                          href={`/products/${item.title
                            .toLowerCase()
                            .split(" ")
                            .join("-")}/${item.id}`}
                          title={item.title}
                        >
                          <div className="searchLink">
                            <span
                              title="TMT Sariya Bars"
                              className="searchName"
                            >
                              {item.title}
                            </span>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
