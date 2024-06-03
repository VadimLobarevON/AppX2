import React, { useState } from "react";
import "../styles/profile.css";
import axios from "axios";
import { json, useLocation } from "react-router-dom";

// import {Link} from 'react-router-dom';
import Navbar from "../components/Navbar";

const UserDetailsView = ({ user }) => {
  localStorage.setItem("userProfile", JSON.stringify(user));
  let stored = localStorage.getItem("userProfile");
  console.log(JSON.parse(stored));
  return (
    <div className="user-details-container">
      <h2>User Details</h2>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
      <div>
        <strong>Password:</strong> {user.password}
      </div>
      <div>
        <strong>First Name:</strong> {user.first_name}
      </div>
      <div>
        <strong>Last Name:</strong> {user.last_name}
      </div>
      <div>
        <strong>Business Operating Number:</strong>{" "}
        {user.business_operating_number}
      </div>
      <div>
        <strong>Business Number:</strong> {user.business_number}
      </div>
      <div>
        <strong>Business Legal Name:</strong> {user.business_legal_name}
      </div>
      <div>
        <strong>Contact Number:</strong> {user.contact_number}
      </div>
      <div>
        <strong>Business Address:</strong> {user.business_address}
      </div>
      <div>
        <strong>Mailing Address:</strong> {user.mailing_address}
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
    localStorage.setItem("userProfile", JSON.stringify(editedUser));
    axios
      .post("http://20.175.202.147/user/update", {
        userid: editedUser.userid,
        first_name: editedUser.first_name,
        last_name: editedUser.last_name,
        business_operating_number: editedUser.business_operating_number,
        business_number: editedUser.bussiness_number,
        business_legal_name: editedUser.business_legal_name,
        contact_number: editedUser.contact_number,
        email: editedUser.email,
        business_address: editedUser.business_address,
        mailing_address: editedUser.mailing_address,
        password: editedUser.password,
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
        <strong>Email:</strong> {user.email}
      </div>
      <div className="form-group">
        <label>Password:</label>{" "}
        <input
          type="password"
          name="password"
          value={editedUser.password}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>First Name:</label>{" "}
        <input
          type="text"
          name="first_name"
          value={editedUser.first_name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Last Name:</label>{" "}
        <input
          type="text"
          name="last_name"
          value={editedUser.last_name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Business Operating Number:</label>{" "}
        <input
          type="text"
          name="business_operating_number"
          value={editedUser.business_operating_number}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Business Number:</label>{" "}
        <input
          type="text"
          name="business_number"
          value={editedUser.business_number}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Business Legal Name:</label>{" "}
        <input
          type="text"
          name="business_legal_name"
          value={editedUser.business_legal_name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Contact Number:</label>{" "}
        <input
          type="text"
          name="contact_number"
          value={editedUser.contact_number}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Business Address:</label>{" "}
        <input
          type="text"
          name="business_address"
          value={editedUser.business_address}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Mailing Address:</label>{" "}
        <input
          type="text"
          name="mailing_address"
          value={editedUser.mailing_address}
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
    let storedUser = localStorage.getItem("userProfile");
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
