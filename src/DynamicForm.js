import React, { useState } from "react";

const DynamicForm = ({ formStructure, onSubmit, formData, setFormData }) => {
  const [progress, setProgress] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(name==="zipCode" && value.length>6){
      return;
    }
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    calculateProgress(updatedFormData);
  };

  const calculateProgress = (data) => {
    if (formStructure) {
      const totalFields = formStructure.fields.filter((field) => field.required).length;
      const completedFields = formStructure.fields.filter(
        (field) => field.required && data[field.name]
      ).length;
      setProgress(Math.round((completedFields / totalFields) * 100));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({});
    setProgress(0);
  };

  if (!formStructure) return null;

  return (
    <div className="dynamic-form">
      <form onSubmit={handleSubmit}>
        {formStructure.fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name}>{field.label}:</label>
            {field.type === "dropdown" ? (
              <select
                id={field.name}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleInputChange}
              >
                <option value="">--Select--</option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={field.name}
                type={field.type}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleInputChange}
                required={field.required}
              />
            )}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>

      {/* Progress bar */}
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${progress}%`, backgroundColor: "green" }}
        ></div>
      </div>
    </div>
  );
};

export default DynamicForm;
