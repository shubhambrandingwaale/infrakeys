import Image from "next/image";
import React from "react";
import {
  BsBag,
  BsFacebook,
  BsFillEnvelopeAtFill,
  BsFillGeoAltFill,
  BsInstagram,
  BsLinkedin,
  BsPhoneFill,
  BsReceipt,
  BsWhatsapp,
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
            <div className="showsmall justify-content-end gap-10">
              <a className="buysell" href="/" target="_blank">
                <BsBag /> Buy
              </a>
              <a className="buysell" href="/" target="_blank">
                <BsReceipt />
                Sell
              </a>
              <a
                className="whatsapp"
                href="wa.me/+919810505025"
                target="_blank"
              >
                <BsWhatsapp />
              </a>
            </div>
            <div className="row">
              <div className="col-md-4 p-3">
                <div className="footerAbout">
                  <Image src="/logo.png" alt="logo" height={90} width={250} />
                  <p>
                    We are utilizing the advanced hardware and refined
                    innovations for creating the items and that is under
                    proficient master’s oversight.
                  </p>
                  <ul>
                    <li>
                      <a
                        target="_blank"
                        href="https://www.facebook.com/profile.php?id=100094620322702"
                      >
                        <BsFacebook />
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        href="https://www.instagram.com/infrakeys_technologies/"
                      >
                        <BsInstagram />
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        href="https://www.linkedin.com/company/infrakeys.com/"
                      >
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
                          <Link href="/products">All Products</Link>
                        </li>
                        <li>
                          <Link href="/categories">All Categories</Link>
                        </li>
                        <li>
                          <Link href="/sub-categories">Sub Categories</Link>
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
                      <a href="tel:+918130376622">
                        <BsPhoneFill />
                        <span>+91 8130376622</span>
                      </a>
                      <a href="mail:info@infrakeys.com">
                        <BsFillEnvelopeAtFill />
                        <span>info@infrakeys.com</span>
                      </a>
                      <a href="#">
                        <BsFillGeoAltFill />
                        <span>
                          519 & 520, the business hub, sec-81, greater
                          faridabad-121007
                        </span>
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
