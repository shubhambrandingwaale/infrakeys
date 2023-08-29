import React from "react";

export default function Page() {
  return (
    <>
      <section className="centerForm">
        <div className="container-fluid">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-4">
              <div className="formSmall">
                <h4>Create New Category</h4>
                <form action="">
                  <div className="inputGroup">
                    <input
                      required
                      autoComplete="off"
                      className="createInput"
                      type="text"
                      name="text"
                    />
                    <label className="user-label">Product Name</label>
                  </div>
                  <div className="inputGroup">
                    <input
                      required
                      autoComplete="off"
                      className="createInput"
                      type="file"
                      name="text"
                    />
                  </div>
                  <button className="commonBtn">Update</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
