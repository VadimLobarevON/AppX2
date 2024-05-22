import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/login.css";
export default function RecoveringPasswordPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    Email: "",
    Password: "",
  });

  const handleChange = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    console.log("change");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    axios
      .post("https://soab-poc-user-api.azurewebsites.net/editedUser", {
        Email: values.Email,
        Password: values.Password,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error, "error");
      });
    navigate("/login");
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="">
          <h1 className="">Recovering Password</h1>
        </div>

        <div className="form-group">
          <label className="" for="Email">
            Email address
          </label>{" "}
          <input
            type="email"
            name="Email"
            onChange={handleChange}
            id="Email"
            className=""
            placeholder="Enter a valid email address"
          />
        </div>

        <div className="form-group">
          <label className="" for="Password">
            Password
          </label>
          <input
            type="password"
            name="Password"
            onChange={handleChange}
            id="Password"
            className=""
            placeholder="Enter password"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="login-button">
            Submit and redirect
          </button>
        </div>
      </form>
    </div>
  );
}
