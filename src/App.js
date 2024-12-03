import React, { useState } from "react";
import "./App.css"; // For custom styling
import DynamicForm from "./DynamicForm";

const App = () => {
  const [formStructure, setFormStructure] = useState(null);
  const [formData, setFormData] = useState({});
  const [submittedData, setSubmittedData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  
  const mockApiResponse = {
    "User Information": {
      fields: [
        { name: "firstName", type: "text", label: "First Name", required: true },
        { name: "lastName", type: "text", label: "Last Name", required: true },
        { name: "age", type: "number", label: "Age", required: false },
      ],
    },
    "Address Information": {
      fields: [
        { name: "street", type: "text", label: "Street", required: true },
        { name: "city", type: "text", label: "City", required: true },
        { name: "state", type: "dropdown", label: "State", options: ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himanchal Pradesh", "Jharkhand", "Karnataka", "Kerala", "MP", "Maharastra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "UP", "Uttarakhand", "WB"], required: true },
        { name: "zipCode", type: "text", label: "Zip Code", required: true },
      ],
    },
    "Payment Information": {
      fields: [
        { name: "cardNumber", type: "text", label: "Card Number", required: true },
        { name: "expiryDate", type: "date", label: "Expiry Date", required: true },
        { name: "cvv", type: "password", label: "CVV", required: true },
        { name: "cardholderName", type: "text", label: "Cardholder Name", required: true },
      ],
    },
  };

  const handleDropdownChange = (e) => {
    const selectedValue = e.target.value;
    if (mockApiResponse[selectedValue]) {
      setFormStructure(mockApiResponse[selectedValue]);
      setErrorMessage("");
      setFormData({});
    } else {
      setErrorMessage("Failed to load form structure.");
    }
  };

  const handleFormSubmit = (formData) => {
    setSubmittedData((prev) => [...prev, formData]);
    setFeedbackMessage("Sign-up Successful!");
    setTimeout(() => setFeedbackMessage(""), 3000);
  };
  const handleDelete = (index) => {
    const updatedData = submittedData.filter((_, i) => i !== index);
    setSubmittedData(updatedData);
    setFeedbackMessage("Entry deleted successfully!");
    setTimeout(() => setFeedbackMessage(""),3000);
  };
  
  const handleEdit = (index) => {
    const entryToEdit = submittedData[index];
    setFormStructure({
      fields: Object.keys(entryToEdit).map((key) => ({
        name: key,
        type: typeof entryToEdit[key] === "number" ? "number" : "text",
        label: key,
        required: true,
      })),
    });
    setFormData(entryToEdit);
  };


  const handleSaveChanges = (updatedData) => {
    const updatedSubmittedData = submittedData.map((data, index) => {
      if (index === formData.index) {
        return updatedData;
      }
      return data;
    });
    setSubmittedData(updatedSubmittedData);
    setFeedbackMessage("Changes saved successfully!");
    setTimeout(() => setFeedbackMessage(""), 3000);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dynamic Form</h1>
      </header>
      <main>
      {feedbackMessage && <p className="feedback">{feedbackMessage}</p>}
        <div>
          <label htmlFor="form-selector">Select Form Type:</label>
          <select id="form-selector" onChange={handleDropdownChange}>
            <option value="">--Select--</option>
            {Object.keys(mockApiResponse).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>

        {formStructure && (
          <DynamicForm formStructure={formStructure} onSubmit={handleFormSubmit} formData={formData} setFormData={setFormData} handleSaveChanges={handleSaveChanges}/>
        )}

        {errorMessage && <p className="error">{errorMessage}</p>}

        {submittedData.length > 0 && (
          <table>
            <thead>
              <tr>
                {Object.keys(submittedData[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {submittedData.map((data, index) => (
                <tr key={index}>
                  {Object.values(data).map((value, i) => (
                    <td key={i}>{value}</td>
                  ))}
                  <td>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
      <footer className="App-footer">
        {/* <p>Dynamic Form Implementation using React</p> */}
      </footer>
    </div>
  );
};

export default App;
