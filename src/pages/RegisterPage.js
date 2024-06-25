import React, { useState } from "react";
import "../styles/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    First__name: "",
    Last__name: "",
    Business__operating__number: "",
    Business__number: "",
    Business__legal__name: "",
    Contact__number: "",
    Email__address: "",
    Business__address: "",
    Mailing__address: "",
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
        First__name: values.First__name,
        Last__name: values.Last__name,
        Business__operating__number: values.Business__operating__number,
        Business__number: values.Business__number,
        Business__legal__name: values.Business__legal__name,
        Contact__number: values.Contact__number,
        Email__address: values.Email__address,
        Business__address: values.Business__address,
        Mailing__address: values.Mailing__address,
        Password: values.Password,
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
          <label className="" for="First__name">
            First name
          </label>
          <input
            name="First__name"
            type="First__name"
            onChange={handleChange}
            id="First__name"
            className=""
            placeholder="Enter your First Name"
          />
        </div>

        <div className="form-group">
          <label className="" for="Last__name">
            Last name
          </label>

          <input
            name="Last__name"
            type="Last__name"
            onChange={handleChange}
            id="Last__name"
            className=""
            placeholder="Enter your Last Name"
          />
        </div>

        <div className="form-group">
          <label className="" for="Business__operating__number">
            Business operating number
          </label>
          <input
            name="Business__operating__number"
            type="Business__operating__number"
            onChange={handleChange}
            id="Business__operating__number"
            className=""
            placeholder="Enter your Business operating number"
          />
        </div>

        <div className="form-group">
          <label className="" for="Business__number">
            Business number
          </label>
          <input
            name="Business__number"
            type="Business__number"
            onChange={handleChange}
            id="Business__number"
            className=""
            placeholder="Enter your Business number"
          />
        </div>

        <div className="form-group">
          <label className="" for="Business__legal__name">
            Business legal name
          </label>
          <input
            name="Business__legal__name"
            type="Business__legal__name"
            onChange={handleChange}
            id="Business__legal__name"
            className=""
            placeholder="Enter your Business legal name"
          />
        </div>

        <div className="form-group">
          <label className="" for="Contact__number">
            Contact number
          </label>
          <input
            name="Contact__number"
            type="Contact__number"
            onChange={handleChange}
            id="Contact__number"
            className=""
            placeholder="Enter your Contact number"
          />
        </div>

        <div className="form-group">
          <label className="" for="Email__address">
            Email address
          </label>
          <input
            name="Email__address"
            type="email"
            onChange={handleChange}
            id="Email__address"
            className=""
            placeholder="Enter a valid email address"
          />
        </div>

        <div className="form-group">
          <label className="" for="Business__address">
            Business address
          </label>
          <input
            name="Business__address"
            type="Business__address"
            onChange={handleChange}
            id="Business__address"
            className=""
            placeholder="Enter your Business address"
          />
        </div>

        <div className="form-group">
          <label className="" for="Mailing__address">
            Mailing address (if different)
          </label>
          <input
            name="Mailing__address"
            type="Mailing__address"
            onChange={handleChange}
            id="Mailing__address"
            className=""
            placeholder="Enter your Mailing address (if different)"
          />
        </div>

        <div className="form-group">
          <label className="" for="Password">
            Password
          </label>
          <input
            name="Password"
            type="password"
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
