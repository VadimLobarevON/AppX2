import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import "../styles/activities.css";
// import 'bootstrap/dist/css/bootstrap.min.css';

const ActivitiesPage = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [forms, setForms] = useState([]);
  const [searchFormName, setSearchFormName] = useState("");
  const [searchFormType, setSearchFormType] = useState("");
  const [searchFormStatus, setSearchFormStatus] = useState("");
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [selectedForm, setSelectedForm] = useState(null); // State for selected form ID
  const [comments, setComments] = useState({}); // State for comments data

  const handleInputNameChange = (e) => {
    const inputValue = e.target.value;
    setSearchFormName(inputValue);
    filterForms(inputValue, searchFormType, searchFormStatus);
  };

  const handleInputTypeChange = (e) => {
    const inputValue = e.target.value;
    setSearchFormType(inputValue);
    filterForms(searchFormName, inputValue, searchFormStatus);
  };

  const filterForms = (nameValue, typeValue, statusValue) => {
    let filteredForms = forms;

    if (nameValue !== "") {
      filteredForms = filteredForms.filter((form) =>
        form.form_name.toLowerCase().includes(nameValue.toLowerCase())
      );
    }

    if (typeValue !== "") {
      filteredForms = filteredForms.filter((form) =>
        form.form_type.toLowerCase().includes(typeValue.toLowerCase())
      );
    }

    if (statusValue !== "") {
      filteredForms = filteredForms.filter((form) =>
        form.form_status.toLowerCase().includes(statusValue.toLowerCase())
      );
    }

    if (filteredForms.length === 0) {
      filteredForms = [
        {
          createdOn: "-",
          form_name: "-",
          form_status: "-",
          form_type: "-",
          formid: "-",
          modifiedOn: "-"
        },
      ];
    }

    setFilteredData(filteredForms);
  };

  const SortBy = (name, value) => {
    console.log(name, value);

    // Reset other sorting dropdowns
    if (name === "CreatedOn") {
      document.getElementById("sortByModifiedOn").value = ""; // Reset ModifiedOn dropdown
    } else if (name === "ModifiedOn") {
      document.getElementById("sortByCreateOn").value = ""; // Reset CreatedOn dropdown
    } else if (name === "FormStatus") {
      document.getElementById("sortByCreateOn").value = ""; // Reset CreatedOn dropdown
      document.getElementById("sortByModifiedOn").value = ""; // Reset ModifiedOn dropdown
    }

    let sortedData;
    if (value === "newest" && name === "CreatedOn") {
      sortedData = filteredData
        .slice()
        .sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
    } else if (value === "oldest" && name === "CreatedOn") {
      sortedData = filteredData
        .slice()
        .sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn));
    } else if (value === "newest" && name === "ModifiedOn") {
      sortedData = filteredData
        .slice()
        .sort((a, b) => new Date(b.modifiedOn) - new Date(a.modifiedOn));
    } else if (value === "oldest" && name === "ModifiedOn") {
      sortedData = filteredData
        .slice()
        .sort((a, b) => new Date(a.modifiedOn) - new Date(b.modifiedOn));
    } else if (value === "asc" && name === "FormStatus") {
      sortedData = filteredData
        .slice()
        .sort((a, b) => a.form_status.localeCompare(b.form_status));
    } else if (value === "desc" && name === "FormStatus") {
      sortedData = filteredData
        .slice()
        .sort((a, b) => b.form_status.localeCompare(a.form_status));
    } else {
      sortedData = filteredData;
    }

    setFilteredData(sortedData);
  };

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("userProfile")).userid;
        const response = await axios.get(
          `http://4.172.130.199/forms/${userId}`
        );
        setFilteredData(response.data);
        setForms(response.data);
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    fetchFormData();
  }, []);

  const handleModifyForm = (formId) => {
    console.log(formId);
    const form = filteredData.find((form) => form.formid === formId);
    const userId = JSON.parse(localStorage.getItem("userProfile")).userid;

    const encodeExtraCharacters = (str) => {
      return encodeURIComponent(str)
        .replaceAll("^", '%5E')  // Encode caret (^) character
        .replaceAll("#", '%23')    // Encode hash (#) character
        .replaceAll("\\", '\\')   // Encode backslash (\) character
        .replaceAll("|", '%7C')   // Encode vertical bar (|) character
        .replaceAll("\"", '%22')    // Encode double quote (") character)
        .replaceAll("'", '%27')    // Encode single quote (') character)
        .replaceAll("<", '%3C')// Encode angle brackets (<) together as %3C)
        .replaceAll(">", '%3E')// Encode angle brackets (>) together as %3E)
        .replaceAll("`", '%60')    // Encode grave accent (`) character)
        .replaceAll("{", '%7B')   // Encode opening curly brace ({) character)
        .replaceAll("}", '%7D')   // Encode closing curly brace (}) character)
        .replaceAll("[", '%5B')   // Encode opening square bracket ([) character)
        .replaceAll("]", '%5D')   // Encode closing square bracket (]) character)
        .replaceAll("/", '%2F')   // Encode forward slash (/) character)
        .replaceAll(":", '%3A');   // Encode colon (:) character)
    };

    const encodedFormType = encodeExtraCharacters(form.form_type);
    const encodedUserId = encodeExtraCharacters(userId);
    const encodedFormId = encodeExtraCharacters(formId);

    console.log(formId);
    console.log(encodedFormId);

    const link = `https://dev.cxp.mgcs.gov.on.ca/on-form/#/${encodedFormType}/${encodedUserId}/${encodedFormId}`;
    console.log(link);
    console.log(decodeURI(link));
    window.open(link, "_blank");
  };

  const handleViewComments = async (formId) => {
    try {
      const response = await axios.get(`http://4.172.40.43/formReviewResults/${formId}`);
      setComments(response.data);
      setSelectedForm(formId);
      setModalVisible(true);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setComments(null);
  };  

  const renderForms = () => {
    if (!filteredData || filteredData.length === 0) {
      return <div>No data to display</div>;
    }

    const headers = {
      form_name: "Form Name",
      form_type: "Form Type",
      modifiedOn: "Date of Modification",
      createdOn: "Date of Creation",
      form_status: "Form Status",
    };

    const keys = Object.keys(filteredData[0]).filter((key) => key !== "formid");

    const getStatusClass = (status) => {
      switch (status.toLowerCase()) {
        case "submitted":
          return "status-submitted";
        case "draft":
          return "status-draft";
        case "approved":
          return "status-approved";
        case "returned":
          return "status-returned";
        default:
          return "";
      }
    };

    return (
      <>
        <table className="forms-table">
          <thead>
            <tr>
              <th className="search-input">
                <input
                  type="text"
                  placeholder="Search by Form Name"
                  value={searchFormName}
                  onChange={handleInputNameChange}
                />
              </th>
              <th className="search-input">
                <input
                  type="text"
                  placeholder="Search by Form Type"
                  value={searchFormType}
                  onChange={handleInputTypeChange}
                />
              </th>
              

              <th className="sort-select">
                <select
                  id="sortByModifiedOn"
                  defaultValue=""
                  onChange={(e) => SortBy("ModifiedOn", e.target.value)}
                >
                  <option value="">None</option>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
              </th>
              <th className="sort-select">
                <select
                  id="sortByCreateOn"
                  defaultValue=""
                  onChange={(e) => SortBy("CreatedOn", e.target.value)}
                >
                  <option value="">None</option>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
              </th>
              <th className="sort-select">
                <select
                  id="sortByFormStatus"
                  defaultValue=""
                  onChange={(e) => SortBy("FormStatus", e.target.value)}
                >
                  <option value="">None</option>
                  <option value="asc">Draft First</option>
                  <option value="desc">Submitted First</option>
                </select>
              </th>
            </tr>
            <tr>
              {keys.map((key) => (
                <th key={key} className="table-header">
                  {headers[key]}
                </th>
              ))}
              <th className="table-header">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                {keys.map((key) => (
                  <td key={key} className="table-cell">
                    {key === "form_status" ? (
                      <span>
                        <span className={`status-icon ${getStatusClass(item.form_status)}`}></span>
                        {item[key]}
                      </span>
                    ) : (
                      item[key]
                    )}
                  </td>
                ))}
                <td className="table-cell">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleModifyForm(item.formid)}
                  >
                    Modify
                  </button>
                  {item.form_status.toLowerCase() === "returned" && (
                    <button
                      className="view-comments-button"
                      onClick={() => handleViewComments(item.formid)}
                    >
                      View Comments
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for comments */}
        <Modal show={modalVisible} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Coroner Comments</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {comments ? (
              <>
                <p className="comment-paragraph">{comments.comments}</p>
                <p><strong>Coroner Initials:</strong> {comments.coroner_initials}</p>
                <p><strong>Reviewed On:</strong> {comments.createdOn}</p>
              </>
            ) : (
              <p>No comments available</p>
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  return (
    <div>
      <Navbar />
      <h2 className="welcome">Welcome to the Activities page</h2>
      <div className="form-container">
        {renderForms()}
      </div>
    </div>
  );
};

export default ActivitiesPage;