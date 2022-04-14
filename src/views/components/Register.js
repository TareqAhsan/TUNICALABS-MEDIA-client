import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Layout from "../layout";

const Register = () => {
  const [loginData, setLoginData] = useState();
  const navigate = useNavigate();
  const { registerUser, user, loading } = useAuth();
  const hanleChange = (e) => {
    const field = e.target.name;

    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const newvalue = { ...loginData };
    newvalue[field] = value;
    setLoginData(newvalue);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginData.password !== loginData.password2) {
      alert("password did not match");
      return;
    }
    registerUser(loginData.email, loginData.password, navigate);
  };
  return (
    <Layout>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "900px" }}
      >
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <form
            onSubmit={handleSubmit}
            className="shadow p-3 text-center"
            style={{ width: "450px", borderRadius: "10px" }}
          >
            <h4 className="text-danger">Sign in now</h4>
            <div className="mb-3">
              <input
                type="email"
                onBlur={hanleChange}
                name="email"
                className="form-control form-control-lg"
                placeholder="Your Email"
                style={{ borderRadius: "14px" }}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                onBlur={hanleChange}
                name="password"
                className="form-control form-control-lg"
                placeholder="Your password"
                style={{ borderRadius: "14px" }}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                onBlur={hanleChange}
                name="password2"
                className="form-control form-control-lg"
                placeholder="Confirm password"
                style={{ borderRadius: "14px" }}
                required
              />
            </div>
            <div className="mb-3">
              <input
                className="form-check-input"
                name="checkbox"
                onBlur={hanleChange}
                type="checkbox"
                value=""
                required
              />
              <label className="form-check-label">
                i agree to the terms of services
              </label>
            </div>
            <div className="mb-3">
              <input
                type="submit"
                value="Register"
                className="btn btn-danger form-control form-control-lg"
                style={{ borderRadius: "14px" }}
              />
            </div>
            <div className="mb-3">
              <Link to="/">Already have an acount ? Signin</Link>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default Register;
