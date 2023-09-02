"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FiUser } from "react-icons/fi";
import { BsBag, BsReceipt, BsSearch, BsWhatsapp } from "react-icons/bs";
import { PiHandsPraying } from "react-icons/pi";
import Link from "next/link";
import logo from "../images/logo.png";
export default function Header() {
  const [validInput, setValidInput] = useState("");
  const [userClicked, setUserClicked] = useState("");
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setValidInput(inputValue);
  };
  const isInputValid = validInput.trim() !== "";
  const barHideShow = () => {
    setUserClicked(!userClicked);
  };
  return (
    <>
      <header>
        <div className="deskHeader">
          <div className="logo">
            <Link href="/">
              <Image
                src={logo}
                height={115}
                width={255}
                alt="Infrakeys | Logo"
              />
            </Link>
          </div>
          <div className="searchBar">
            <form>
              <input
                type="text"
                placeholder="Search Products"
                value={validInput}
                onChange={handleInputChange}
              />
              <button>
                <BsSearch />
              </button>
            </form>
            {isInputValid && (
              <div className="searchList">
                <ul>
                  <li>
                    <Link href="/" title="TMT Sariya Bars | Steel and Iron">
                      <div className="searchLink">
                        <span title="steel and Iron" className="categoryBadge">
                          Steel and Iron
                        </span>
                        <span title="TMT Sariya Bars" className="searchName">
                          TMT Sariya Bars
                        </span>
                      </div>
                    </Link>
                  </li>
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
            <a href="wa.me/+919810505025" target="_blank">
              <BsWhatsapp />
            </a>
          </div>
          <div className="userView">
            <button onClick={barHideShow} className="username">
              Hello
              <PiHandsPraying />
              &nbsp;
              <span>Shubham Solanki</span>
            </button>
            {userClicked ? (
              <div className="userminiPanel">
                <div className="userInfo">
                  <div className="circleUser">
                    <FiUser />
                    <div className="contact">
                      <h6>Shubham Solanki</h6>
                      <span>example@gmail.com</span>
                    </div>
                  </div>
                </div>
                <ul>
                  <li>
                    <Link href="/my-dashboard">
                      <BsBag />
                      My Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <BsBag />
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="smartHeader">
          <div className="logo">
            <h2>Infrakeys</h2>
          </div>
          <div className="searchBar">
            <form action="">
              <input type="text" />
              <button className="search">Search</button>
            </form>
          </div>
        </div>
      </header>
    </>
  );
}
