import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../styles/servicesPage.css";

export default function ServicesPage() {
  const [user, setUser] = useState(null); // State to store user data
  const [selectedFormIndex, setSelectedFormIndex] = useState(""); // State to store selected form index
  const [formName, setFormName] = useState(""); // State to store form name input
  const [formTypes, setFormTypes] = useState([]); // State to store available form types
  const uuidRef = useRef(null); // Ref to store user UUID

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userProfile"));
    setUser(userData);
    console.log(userData.Email);
    uuidRef.current = userData.userid; // Store the UUID in the ref
    console.log(uuidRef.current);

    // Fetch form types from the provided URL
    axios.get("http://4.172.130.199/form-types")
      .then((response) => {
        setFormTypes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching form types:", error);
      });
  }, []);

  function redirectToForm() {

    // Function to encode special characters in the URL
    const encodeExtraCharacters = (str) => {
      return encodeURIComponent(str)
        .replaceAll("^", '%5E')
        .replaceAll("#", '%23')
        .replaceAll("|", '%7C')   
        .replaceAll("\"", '%22')    // Encode double quote (") character
        .replaceAll("'", '%27')    
        .replaceAll("<", '%3C')   
        .replaceAll(">", '%3E')   
        .replaceAll("`", '%60')    
        .replaceAll("{", '%7B')   
        .replaceAll("}", '%7D')   
        .replaceAll("[", '%5B')   
        .replaceAll("]", '%5D')   
        .replaceAll("/", '%2F')   
        .replaceAll("!", '%21') 
        .replaceAll(":", '%3A');
    };

    // Get the selected form object
    const selectedForm = formTypes[selectedFormIndex];
    const encodedFormName = encodeExtraCharacters(selectedForm.form_name); // Encode form_name for link
    const encodedUserId = encodeExtraCharacters(uuidRef.current);
    const encodedInputFormName = encodeExtraCharacters(formName);

    // Construct the URL
    const link = `https://dev.cxp.mgcs.gov.on.ca/on-form/#/${encodedFormName}/${encodedUserId}/NEW-${encodedInputFormName}`;
    window.open(link, '_blank'); // Open the form in a new tab
  }

  return (
    <div className="profile-form-container">
      <Navbar />
      <h1 className="welcome">Welcome to the Services page</h1>
      <div className="form-group">
        <select
          value={selectedFormIndex}
          onChange={(e) => setSelectedFormIndex(e.target.value)}
          className="select-form"
        >
          <option value="">Select a form</option>
          {formTypes.map((formType, index) => (
            <option key={index} value={index}>{formType.form_description}</option>
          ))}
        </select>
      </div>
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
