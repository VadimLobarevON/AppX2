import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../styles/servicesPage.css";

export default function ServicesPage() {
  const [user, setUser] = useState(null);
  const [selectedFormIndex, setSelectedFormIndex] = useState(""); // Updated to store the selected index
  const [formName, setFormName] = useState(""); // Added state for form name input
  const [formTypes, setFormTypes] = useState([]);
  const uuidRef = useRef(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userProfile"));
    setUser(userData);
    console.log(userData.Email);
    uuidRef.current = userData.userid; // Store the UUID in the ref
    console.log(uuidRef.current);

    // Fetch form types from the provided URL
    axios.get("http://4.172.130.199/form-types", {
      // withCredentials: true
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
    if (!user || selectedFormIndex === "") {
      // User not logged in or form not selected, handle accordingly
      return;
    }

    const encodeExtraCharacters = (str) => {
      return encodeURIComponent(str)
        .replaceAll("^", '%5E')  // Encode caret (^) character
        .replaceAll("#", '%23')    // Encode hash (#) character
        // .replaceAll("\\", '%5C')   // Encode backslash (\) character
        .replaceAll("|", '%7C')   // Encode vertical bar (|) character
        .replaceAll("\"", '%22')    // Encode double quote (") character
        .replaceAll("'", '%27')    // Encode single quote (') character
        .replaceAll("<", '%3C')   // Encode angle brackets (<) as %3C
        .replaceAll(">", '%3E')   // Encode angle brackets (>) as %3E
        .replaceAll("`", '%60')    // Encode grave accent (`) character
        .replaceAll("{", '%7B')   // Encode opening curly brace ({) character
        .replaceAll("}", '%7D')   // Encode closing curly brace (}) character
        .replaceAll("[", '%5B')   // Encode opening square bracket ([) character
        .replaceAll("]", '%5D')   // Encode closing square bracket (]) character
        .replaceAll("/", '%2F')   // Encode forward slash (/) character
        .replaceAll("!", '%21') // Encode exclamation mark (!) character
        .replaceAll(":", '%3A');   // Encode colon (:) character
    };

    // Get the selected form object
    const selectedForm = formTypes[selectedFormIndex];
    const encodedFormName = encodeExtraCharacters(selectedForm.form_name); // Use form_name for link
    const encodedUserId = encodeExtraCharacters(uuidRef.current);
    const encodedInputFormName = encodeExtraCharacters(formName);

    const link = `https://dev.cxp.mgcs.gov.on.ca/on-form/#/${encodedFormName}/${encodedUserId}/NEW-${encodedInputFormName}`;
    console.log(link);
    console.log(decodeURI(link));
    window.open(link, '_blank');
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
