import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../styles/activities.css";

const ActivitiesPage = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [forms, setFroms] = useState([]);
  const [searchFormName, setSearchFormName] = useState('');
  const [searchFormType, setSearchFormType] = useState('');
  let sortedData
  const handleInputNameChange = (e) => {
    const inputValue = e.target.value;
    setSearchFormName(inputValue);

    filterForms(inputValue, searchFormType);
};

const handleInputTypeChange = (e) => {
    const inputValue = e.target.value;
    setSearchFormType(inputValue);

    filterForms(searchFormName, inputValue);
};

const filterForms = (nameValue, typeValue) => {
  let filteredForms = forms;

  if (nameValue !== '') {
      filteredForms = filteredForms.filter(form =>
          form.form_name.toLowerCase().includes(nameValue.toLowerCase())
      );
  }

  if (typeValue !== '') {
      filteredForms = filteredForms.filter(form =>
          form.form_type.toLowerCase().includes(typeValue.toLowerCase())
      );
  }

  if (filteredForms.length === 0) {
      // If the filtered array is empty, fill it with the default data
      filteredForms = [{
          "createdOn": "-",
          "form_name": "-",
          "form_type": "-",
          "formid": "-",
          "modifiedOn": "-"
      }];
  }

  setFilteredData(filteredForms);
};

  const SortBy = (name, value) => {
    console.log(name, value);
  
    // Reset both sorting options to "None"
    if (name === "CreatedOn") {
      document.getElementById("sortByModifiedOn").value = ""; // Reset ModifiedOn dropdown
      // setSearchFormType(""); // Reset state for the sorting option
    } else if (name === "ModifiedOn") {
      document.getElementById("sortByCreateOn").value = ""; // Reset CreatedOn dropdown
      // setSearchFormName(""); // Reset state for the sorting option
    }
  


    if (value === "newest" && name === "CreatedOn") {
      sortedData = filteredData.slice().sort((a, b) => new Date(b.modifiedOn) - new Date(a.createdOn));
      console.log(sortedData)
  } else if (value === "oldest" && name === "CreatedOn") {
    sortedData = filteredData.slice().sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn));
    console.log(sortedData)
  } else if (value === "newest" && name === "ModifiedOn") {
    sortedData = filteredData.slice().sort((a, b) => new Date(b.modifiedOn) - new Date(a.modifiedOn));
    console.log(sortedData)
  } else if (value === "oldest" && name === "ModifiedOn") {
    sortedData = filteredData.slice().sort((a, b) => new Date(a.createdOn) - new Date(b.modifiedOn));
    console.log(sortedData)
  } else {
      console.log(filteredData)
  }
  setFilteredData(sortedData);
  


  }

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        console.log(localStorage);
        // Assuming UserId is available in localStorage, adjust this accordingly
        const userId = JSON.parse(localStorage.getItem("userProfile")).userid;
        console.log(userId + "we are here (get all forms for user)")
        const response = await axios.get(`http://4.172.130.199/forms/${userId}`, { //${userId}
          // withCredentials: true
        });
        setFilteredData(response.data);
        setFroms(response.data)
        console.log(forms)
        console.log(response)
      } catch (error) {
        console.error("Error fetching form data:", error);
        // Display error message to user or handle the error accordingly
      }
    };

    fetchFormData();
  }, []);
  
  let formType
  let formName

  const handleModifyForm = (formId) => {
    console.log(formId);
    console.log(filteredData)
    filteredData.forEach(form => {
      // Assign form type and form name to variables
      formType = form.form_type;
      formName = form.form_name;
    });
    const userId = JSON.parse(localStorage.getItem("userProfile")).userid;
    console.log(formType.split(' ').join(''), formName.split(' ').join(''), formId.split(' ').join(''), userId.split(' ').join(''));

    const link = `https://dev.cxp.mgcs.gov.on.ca/on-form/#/${formType}/${userId}/${formId}`;
    console.log(link);
    window.open(link, '_blank');
  };



  const renderForms = () => {
    if (!filteredData || filteredData.length === 0) {
      return <div>No data to display</div>;
    }

    const keys = Object.keys(filteredData[0]).filter((key) => key !== "formid");

    return (
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th colSpan={keys.length + 1} style={{ textAlign: "left" }}>
              <div className="filters-container">
              </div>
            </th>
          </tr>
          <tr>

            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
                backgroundColor: "#f2f2f2",
              }}
            >
              <select
                  id="sortByCreateOn"
                  defaultValue=""
                  onChange={(e) => SortBy('CreatedOn', e.target.value)}
                >
                  <option value="">None</option>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
            </th>

            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
                backgroundColor: "#f2f2f2",
              }}
            >
              <input
                  type="text"
                  placeholder="Search by Form Name"
                  value={searchFormName}
                  onChange={handleInputNameChange}
                />
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
                backgroundColor: "#f2f2f2",
              }}
            >
              <input
                  type="text"
                  placeholder="Search by Form Type"
                  value={searchFormType}
                  onChange={handleInputTypeChange}
                />
            </th>
            
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
                backgroundColor: "#f2f2f2",
              }}
            >
              <select
                  id="sortByModifiedOn"
                  defaultValue=""
                  onChange={(e) => SortBy('ModifiedOn',e.target.value)}
                >
                  <option value="">None</option>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
                backgroundColor: "#f2f2f2",
              }}
            >
            </th>
          </tr>
          <tr>
            {keys.map((key) => (
              <th
                key={key}
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "left",
                  backgroundColor: "#f2f2f2",
                }}
              >
                {key}
              </th>
            ))}
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
                backgroundColor: "#f2f2f2",
              }}
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              {keys.map((key) => (
                <td
                  key={key}
                  style={{ border: "1px solid #ddd", padding: "8px" }}
                >
                  {item[key]}
                </td>
              ))}
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <button
                  className="login-button"
                  style={{ fontSize: "14px", padding: "6px 10px" }}
                  onClick={() => handleModifyForm(item.formid, item.formtype)}
                >
                  Modify
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <Navbar />
      <h1
        className="welcome"
        style={{
          fontSize: "24px",
          color: "#333",
          marginBottom: "16px",
          paddingRight: "40px",
        }}
      >
        Welcome to the Activities page
      </h1>
      <div className="form-container" style={{ paddingRight: "40px" }}>
        {renderForms()}
      </div>
    </div>
  );
};

export default ActivitiesPage;
