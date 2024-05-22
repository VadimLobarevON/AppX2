import React, { useState } from "react";
import "../styles/profile.css";
import axios from "axios";
import { json, useLocation } from "react-router-dom";

// import {Link} from 'react-router-dom';
import Navbar from "../components/Navbar";

const UserDetailsView = ({ user }) => {
  localStorage.setItem("user", JSON.stringify(user));
  let stored = localStorage.getItem("user");
  console.log(JSON.parse(stored));
  return (
    <div className="user-details-container">
      <h2>User Details</h2>
      <div>
        <strong>Email:</strong> {user.Email}
      </div>
      <div>
        <strong>Password:</strong> {user.Password}
      </div>
      <div>
        <strong>First Name:</strong> {user.FirstName}
      </div>
      <div>
        <strong>Last Name:</strong> {user.LastName}
      </div>
      <div>
        <strong>Business Operating Number:</strong>{" "}
        {user.BussinessOperatingNumber}
      </div>
      <div>
        <strong>Business Number:</strong> {user.BussinessNumber}
      </div>
      <div>
        <strong>Business Legal Name:</strong> {user.BusinessLegalName}
      </div>
      <div>
        <strong>Contact Number:</strong> {user.ContactNumber}
      </div>
      <div>
        <strong>Business Address:</strong> {user.BusinessAddress}
      </div>
      <div>
        <strong>Mailing Address:</strong> {user.MailingAddress}
      </div>
    </div>
  );
};

const UserDetailsEdit = ({ user, onSave }) => {
  const [editedUser, setEditedUser] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSave = () => {
    onSave(editedUser);
    console.log(editedUser);
    localStorage.setItem("user", JSON.stringify(editedUser));
    axios
      .post("https://soab-poc-user-api.azurewebsites.net/editedUser", {
        FirstName: editedUser.FirstName,
        LastName: editedUser.LastName,
        BussinessOperatingNumber: editedUser.BussinessOperatingNumber,
        BussinessNumber: editedUser.BussinessNumber,
        BusinessLegalName: editedUser.BusinessLegalName,
        ContactNumber: editedUser.ContactNumber,
        Email: editedUser.Email,
        BusinessAddress: editedUser.BusinessAddress,
        MailingAddress: editedUser.MailingAddress,
        Password: editedUser.Password,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  };

  return (
    <div className="profile-form-container">
      <h2>Edit Profile</h2>
      {/* <div className="form-group">
        <label>Email:</label>{" "}
        <input
          type="text"
          name="Email"
          value={editedUser.Email}
          onChange={handleChange}
        />
      </div> */}
      <div className="form-group">
        <strong>Email:</strong> {user.Email}
      </div>
      <div className="form-group">
        <label>Password:</label>{" "}
        <input
          type="password"
          name="Password"
          value={editedUser.Password}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>First Name:</label>{" "}
        <input
          type="text"
          name="FirstName"
          value={editedUser.FirstName}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Last Name:</label>{" "}
        <input
          type="text"
          name="LastName"
          value={editedUser.LastName}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Business Operating Number:</label>{" "}
        <input
          type="text"
          name="BussinessOperatingNumber"
          value={editedUser.BussinessOperatingNumber}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Business Number:</label>{" "}
        <input
          type="text"
          name="BussinessNumber"
          value={editedUser.BussinessNumber}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Business Legal Name:</label>{" "}
        <input
          type="text"
          name="BusinessLegalName"
          value={editedUser.BusinessLegalName}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Contact Number:</label>{" "}
        <input
          type="text"
          name="ContactNumber"
          value={editedUser.ContactNumber}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Business Address:</label>{" "}
        <input
          type="text"
          name="BusinessAddress"
          value={editedUser.BusinessAddress}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Mailing Address:</label>{" "}
        <input
          type="text"
          name="MailingAddress"
          value={editedUser.MailingAddress}
          onChange={handleChange}
        />
      </div>
      <button className="login-button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

function Profile() {
  const location = useLocation();
  let user = location.state?.user;
  if (user == undefined) {
    let storedUser = localStorage.getItem("user");
    storedUser = JSON.parse(storedUser);
    console.log(storedUser);
    if (storedUser == undefined) {
      user = {
        Email: "NaN",
        Password: "NaN",
        FirstName: "NaN",
        LastName: "NaN",
        BussinessOperatingNumber: "NaNl",
        BussinessNumber: "NaN",
        BusinessLegalName: "NaNs",
        ContactNumber: "NaN",
        BusinessAddress: "NaN",
        MailingAddress: "NaN",
      };
    } else {
      user = storedUser;
    }
  }

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleEditProfile = () => {
    setIsEditMode(true);
  };

  const handleSaveProfile = (editedUser) => {
    setEditedUser(editedUser);
    setIsEditMode(false);
  };

  return (
    <div>
      <Navbar />
      <h1 className="welcome">Welcome to the Profile page</h1>
      {isEditMode ? (
        <UserDetailsEdit user={editedUser} onSave={handleSaveProfile} />
      ) : (
        <div>
          <UserDetailsView user={editedUser} />
          <button className="login-button" onClick={handleEditProfile}>
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}
export default Profile;
