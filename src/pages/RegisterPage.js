import React, { useState } from "react";
import "../styles/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    FirstName: "",
    LastName: "",
    BussinessOperatingNumber: "",
    BussinessNumber: "",
    BusinessLegalName: "",
    ContactNumber: "",
    Email: "",
    BusinessAddress: "",
    MailingAddress: "",
    Password: "",
  });
  // const [errors, setErrors] = useState({})
  const handleChange = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    console.log("change");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://20.175.202.147/user", {
        first_name: values.FirstName,
        last_name: values.LastName,
        business_operating_number: values.BussinessOperatingNumber,
        business_number: values.BussinessNumber,
        business_legal_name: values.BusinessLegalName,
        contact_number: values.ContactNumber,
        email: values.Email,
        business_address: values.BusinessAddress,
        mailing_address: values.MailingAddress,
        password: values.Password,
      })
      .then(function (response) {
        console.log(response);
        console.log("redirected");
        navigate("/");
      })
      .catch(function (error) {
        console.log(error, "error");
      });
    console.log(values);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="">
          <h1 className="">Create Your Account</h1>
        </div>

        <div className="form-group">
          <label className="" for="FirstName">
            First name
          </label>
          <input
            name="FirstName"
            type="FirstName"
            onChange={handleChange}
            id="FirstName"
            className=""
            placeholder="Enter your First Name"
          />
        </div>

        <div className="form-group">
          <label className="" for="LastName">
            Last name
          </label>

          <input
            name="LastName"
            type="LastName"
            onChange={handleChange}
            id="LastName"
            className=""
            placeholder="Enter your Last Name"
          />
        </div>

        <div className="form-group">
          <label className="" for="BussinessOperatingNumber">
            Business operating number
          </label>
          <input
            name="BussinessOperatingNumber"
            type="BussinessOperatingNumber"
            onChange={handleChange}
            id="BussinessOperatingNumber"
            className=""
            placeholder="Enter your Business operating number"
          />
        </div>

        <div className="form-group">
          <label className="" for="BussinessNumber">
            Business number
          </label>
          <input
            name="BussinessNumber"
            type="BussinessNumber"
            onChange={handleChange}
            id="BussinessNumber"
            className=""
            placeholder="Enter your Business number"
          />
        </div>

        <div className="form-group">
          <label className="" for="BusinessLegalName">
            Bussiness legal name
          </label>
          <input
            name="BusinessLegalName"
            type="BusinessLegalName"
            onChange={handleChange}
            id="BusinessLegalName"
            className=""
            placeholder="Enter your Bussiness legal name"
          />
        </div>

        <div className="form-group">
          <label className="" for="ContactNumber">
            Contact number
          </label>
          <input
            name="ContactNumber"
            type="ContactNumber"
            onChange={handleChange}
            id="ContactNumber"
            className=""
            placeholder="Enter your Contact number"
          />
        </div>

        <div className="form-group">
          <label className="" for="Email">
            Email address
          </label>
          <input
            name="Email"
            type="Email"
            onChange={handleChange}
            id="Email"
            className=""
            placeholder="Enter a valid email address"
          />
        </div>

        <div className="form-group">
          <label className="" for="BusinessAddress">
            Bussiness address
          </label>
          <input
            name="BusinessAddress"
            type="BusinessAddress"
            onChange={handleChange}
            id="LName"
            className=""
            placeholder="Enter your Bussiness address"
          />
        </div>

        <div className="form-group">
          <label className="" for="MailingAddress">
            Mailing address(if different)
          </label>
          <input
            name="MailingAddress"
            type="MailingAddress"
            onChange={handleChange}
            id="MailingAddress"
            className=""
            placeholder="Enter your Mailing address(if different)"
          />
        </div>

        <div className="form-group">
          <label className="" for="Password">
            Password
          </label>
          <input
            name="Password"
            type="Password"
            onChange={handleChange}
            id="Password"
            className=""
            placeholder="Enter password"
          />
        </div>

        <div className="form-group">
          <button type="submit" className="login-button">
            Sign Up
          </button>
          <p className="">
            Login to your account{" "}
            <a href="/login" className="">
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
