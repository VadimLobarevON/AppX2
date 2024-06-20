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
        <strong>Email:</strong> {user.Email__address}
      </div>
      <div>
        <strong>Password:</strong> {user.Password}
      </div>
      <div>
        <strong>First Name:</strong> {user.First__name}
      </div>
      <div>
        <strong>Last Name:</strong> {user.Last__name}
      </div>
      <div>
        <strong>Business Operating Number:</strong>{" "}
        {user.Business__operating__number}
      </div>
      <div>
        <strong>Business Number:</strong> {user.Business__number}
      </div>
      <div>
        <strong>Business Legal Name:</strong> {user.Business__legal__name}
      </div>
      <div>
        <strong>Contact Number:</strong> {user.Contact__number}
      </div>
      <div>
        <strong>Business Address:</strong> {user.Business__address}
      </div>
      <div>
        <strong>Mailing Address:</strong> {user.Mailing__address}
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
        First__name: editedUser.First__name,
        Last__name: editedUser.Last__name,
        Business__operating__number: editedUser.Business__operating__number,
        Business__number: editedUser.Business__number,
        Business__legal__name: editedUser.Business__legal__name,
        Contact__number: editedUser.Contact__number,
        Email__address: editedUser.Email__address,
        Business__address: editedUser.Business__address,
        Mailing__address: editedUser.Mailing__address,
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
        <strong>Email:</strong> {user.Email__address}
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
          name="First__name"
          value={editedUser.First__name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Last Name:</label>{" "}
        <input
          type="text"
          name="Last__name"
          value={editedUser.Last__name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Business Operating Number:</label>{" "}
        <input
          type="text"
          name="Business__operating__number"
          value={editedUser.Business__operating__number}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Business Number:</label>{" "}
        <input
          type="text"
          name="Business__number"
          value={editedUser.Business__number}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Business Legal Name:</label>{" "}
        <input
          type="text"
          name="Business__legal__name"
          value={editedUser.Business__legal__name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Contact Number:</label>{" "}
        <input
          type="text"
          name="Contact__number"
          value={editedUser.Contact__number}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Business Address:</label>{" "}
        <input
          type="text"
          name="Business__address"
          value={editedUser.Business__address}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Mailing Address:</label>{" "}
        <input
          type="text"
          name="Mailing__address"
          value={editedUser.Mailing__address}
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
        Email__address: "NaN",
        Password: "NaN",
        First__name: "NaN",
        Last__name: "NaN",
        Business__operating__number: "NaN",
        Business__number: "NaN",
        Business__legal__name: "NaN",
        Contact__number: "NaN",
        Business__address: "NaN",
        Mailing__address: "NaN",
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
