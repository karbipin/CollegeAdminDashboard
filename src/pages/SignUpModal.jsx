import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function SignUpModal() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <>
      {/* Button to Open Modal */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#signUpModal"
      >
        Sign Up
      </button>

      {/* Modal */}
      <div className="modal fade" id="signUpModal" tabIndex="-1" aria-labelledby="signUpModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body d-flex flex-column flex-md-row">

              {/* Left Column: Sign Up */}
              <div className="column p-4" id="main">
                <h1>Sign Up</h1>
                <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="E-mail"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">
                    Sign Up
                  </button>
                </form>
              </div>

              {/* Center SVG Divider */}
              <div className="d-none d-md-block">
                <svg width="67px" height="578px" viewBox="0 0 67 578" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.3847656,-5.68434189e-14 C-7.44726562,36.7213542 5.14322917,126.757812 49.15625,270.109375 
                    C70.9827986,341.199016 54.8877465,443.829224 0.87109375,578 L67,578 L67,-5.68434189e-14 
                    L11.3847656,-5.68434189e-14 Z"
                    fill="#F9BC35"
                  />
                </svg>
              </div>

              {/* Right Column: Welcome/Login */}
              <div className="column p-4 bg-light text-center" id="secondary">
                <div className="sec-content">
                  <h2>Welcome Back!</h2>
                  <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
                  <button type="button" className="btn btn-primary mt-3">
                    Login
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpModal;
