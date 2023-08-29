import Image from "next/image";
import React from "react";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsPhoneFill,
} from "react-icons/bs";
import Link from "next/link";
import { MdMarkEmailUnread } from "react-icons/md";
import { ImLocation2 } from "react-icons/im";

export default function Footer() {
  return (
    <>
      <footer>
        <div className="mainfooter">
          <div className="container">
            <div className="row">
              <div className="col-md-4 p-3">
                <div className="footerAbout">
                  <p>
                    We are utilizing the advanced hardware and refined
                    innovations for creating the items and that is under
                    proficient master’s oversight.
                  </p>
                  <ul>
                    <li>
                      <a
                        target="_blank"
                        href="https://www.facebook.com/people/Infrakeys-ByArrant/pfbid02vhLM68PxwsGnKqL6HVdYLyw6EMhnTK6VdU9NTvUWWAJqVwvjqCawMe26Lq6LWZiQl/"
                      >
                        <BsFacebook />
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        href="https://www.instagram.com/infrakeys_by_arrant/"
                      >
                        <BsInstagram />
                      </a>
                    </li>
                    <li>
                      <a target="_blank" href="">
                        <BsLinkedin />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-4 p-3">
                <div className="row">
                  <div className="col-6">
                    <div className="footerLinks">
                      <h5 className="footerHeading">Quick Links</h5>
                      <ul>
                        <li>
                          <Link href="/">Home</Link>
                        </li>
                        <li>
                          <Link href="/about">About</Link>
                        </li>
                        <li>
                          <Link href="/categories">All Categories</Link>
                        </li>
                        <li>
                          <Link href="/sub-categories">Sub Categories</Link>
                        </li>
                        <li>
                          <Link href="/contact">Contact Us</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="footerLinks">
                      <h5 className="footerHeading">Main Categories</h5>
                      <ul>
                        <li>
                          <Link href="/">
                            All Sub Categories will be map here
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 p-3">
                <div className="reachUs">
                  <h5 className="footerHeading">Reach Us At:</h5>
                  <ul>
                    <li>
                      <a href="tel:+919810103410">
                        <BsPhoneFill />
                        <span>All Categories will be map here</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottomfooter">© All rights reserved.</div>
      </footer>
    </>
  );
}
