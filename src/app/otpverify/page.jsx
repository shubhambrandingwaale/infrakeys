import React from "react";

export default function Page() {
  return (
    <>
      <section className="plainSection">
        <div className="container-fluid">
          <div className="row centerit vh-100">
            <div className="col-lg-4">
              <div className="loginForm">
                <form>
                  <div className="inputGroup">
                    <label className="user-label">Enter OTP</label>
                    <input
                      required
                      autoComplete="off"
                      className="createInput"
                      type="text"
                      name="categoryId"
                    />
                    <button className="commonBtn mx-auto d-block mt-3">
                      Verify
                    </button>
                  </div>
                </form>
              </div>
            </div>{" "}
          </div>
        </div>
      </section>
    </>
  );
}
