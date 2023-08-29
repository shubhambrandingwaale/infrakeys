"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FiUser } from "react-icons/fi";
import { BsBag, BsReceipt, BsSearch, BsWhatsapp } from "react-icons/bs";
import Link from "next/link";

export default function Header() {
  const [validInput, setValidInput] = useState("");

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setValidInput(inputValue);
  };

  const isInputValid = validInput.trim() !== "";
  return (
    <>
      <header>
        <div className="deskHeader">
          <div className="logo">
            <h3>Infrakeys</h3>
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
          <div className="loginBtn">
            <button className="login">
              <FiUser /> Login
            </button>
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
