import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../styles/servicesPage.css";

export default function ServicesPage() {
  const [user, setUser] = useState(null);
  const [selectedForm, setSelectedForm] = useState("");
  const [formName, setFormName] = useState(""); // Added state for form name
  const [formTypes, setFormTypes] = useState([]);
  const uuidRef = useRef(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
    console.log(userData.Email)
    uuidRef.current = userData.Email; // Store the UUID in the ref
    console.log(uuidRef.current)

    // Fetch form types from the provided URL
    axios.get("http://4.172.130.199/form-types", {
      withCredentials: true
    })
      .then((response) => {
        setFormTypes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching form types:", error);
        // Display error message to user or handle the error accordingly
      });
  }, []);

  function redirectToForm() {
    if (!user || !selectedForm) {
      // User not logged in or form not selected, handle accordingly
      return;
    }
    
    // Construct link with formatted selectedForm (removing spaces)
    const formattedSelectedForm = selectedForm.replace(/\s+/g, '');
    const link = `https://dev.cxp.mgcs.gov.on.ca/on-form/#/${formattedSelectedForm}/${uuidRef.current}/NEW-${formName}`;
    console.log(link);
  }

  return (
    <div className="profile-form-container">
      <Navbar />
      <h1 className="welcome">Welcome to the Services page</h1>
      <div className="form-group">
        <select
          value={selectedForm}
          onChange={(e) => setSelectedForm(e.target.value)}
          className="select-form"
        >
          <option value="">Select a form</option>
          {formTypes.map((formType, index) => (
            <option key={index} value={formType}>{formType}</option>
          ))}
        </select>
      </div>
      {/* Added input for form name */}
      <div className="form-group">
        <input
          type="text"
          placeholder="Form Name"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          className="form-name-input"
        />
      </div>
      <div className="form-group">
        <button className="login-button" onClick={redirectToForm}>Fill and submit</button>
      </div>
    </div>
  );
}
