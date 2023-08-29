import CenterHeading from "@/components/CenterHeading";
import React from "react";

export default function Page() {
  return (
    <>
      <section className="loginSection">
        <div className="container">
          <div className="row centerit">
            <div className="col-md-4">
              <div className="loginForm">
                <form action="">
                  <CenterHeading heading="Login" />
                  <input type="text" placeholder="Email" />
                  <input type="password" placeholder="password" />
                  <button className="commonBtn">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
