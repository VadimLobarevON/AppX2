import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/login.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    console.log("change");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    axios
      .post("http://20.175.202.147/user/get-user", {
        email: values.email,
        password: values.password,
      })
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          // Save user data to localStorage
          localStorage.setItem('userProfile', JSON.stringify(response.data));

          console.log("redirected");
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
  // const handleSubmit = (event) =>{
  //   navigate("/profile");
  // }
  // const handleRecoveringPassword = (event) => {
  //   event.preventDefault();

  //   console.log(values.Email);

  //   if (values.Email === "") {
  //     alert("Please enter your email address.");
  //   } else {
  //     console.log("Sending an email and redirecting...");

  //     axios
  //       .post("https://soab-poc-user-api.azurewebsites.net/recovery", {
  //         Email: values.Email,
  //         Link: "https://appx.azurewebsites.net/recoveringPassword",
  //       })
  //       .then(function (response) {
  //         console.log(response);
  //       })
  //       .catch(function (error) {
  //         console.log(error, "error");
  //       });

  //     navigate("/confirmation");
  //   }
  // };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="">
          <h1 className="">Log Into Your Account</h1>
        </div>

        <div className="form-group">
          <label className="" for="email">
            Email address
          </label>{" "}
          <input
            type="email"
            name="email"
            onChange={handleChange}
            id="email"
            className=""
            placeholder="Enter a valid email address"
          />
        </div>

        <div className="form-group">
          <label className="" for="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            id="password"
            className=""
            placeholder="Enter password"
          />
        </div>

        {/* <div className="form-group forgot-password">
          <Link
            onClick={handleRecoveringPassword}
            to="/confirmation"
            className=""
          >
            Forgot password?
          </Link>
        </div> */}
        {/* <div className="">
                      <input className="" type="checkbox" value="" id="RememberMe" />
                      <label className="" for="RememberMe">
                        Remember me
                      </label>
                    </div> */}

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
