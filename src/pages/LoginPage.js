import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/login.css";

export default function LoginPage() {
  const navigate = useNavigate();

  // State hook for managing form input values
  const [values, setValues] = useState({
    Email__address: "", // Initial state for email address
    Password: "", // Initial state for password
  });

  // Handler function for input changes
  const handleChange = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    console.log("change");
  };

  // Handler function for form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Make a POST request to the server with email and password
    axios
      .post("http://20.175.202.147/user/get-user", {
        Email__address: values.Email__address,
        Password: values.Password,
      })
      .then(function (response) {
        console.log(response); // Log the server response

        if (response.status === 200) {
          // Save user data to localStorage
          localStorage.setItem('userProfile', JSON.stringify(response.data));
          navigate("/profile", { state: { user: response.data } });
        } else {
          alert("Credentials are incorrect");
        }
      })
      .catch(function (error) {
        console.log(error, "error");
        alert("Credentials are incorrect");
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="">
          <h1 className="">Log Into Your Account</h1>
        </div>

        <div className="form-group">
          <label className="" for="Email__address">
            Email address
          </label>{" "}
          <input
            type="email"
            name="Email__address"
            onChange={handleChange}
            id="Email__address"
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
            Login
          </button>
          <p className="">
            Don't have an account?{" "}
            <Link to="/register" className="">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
