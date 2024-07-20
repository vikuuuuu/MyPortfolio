import React, { useState } from "react";
import "./EntryDataPage.css";
import { getDatabase, ref, push } from "firebase/database";

const EntryDataPage = () => {
  const [formData, setFormData] = useState({
    selectbank: "",
    selectSenderName: "",
    selectReceiverName: "",
    selectAmount: "",
    selectDate: "",
    selectStatus: "",
    selectMode: "",
    selectTextArea: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const database = getDatabase();
    push(ref(database, "FormData"), formData)
      .then(() => {
        console.log("Successfully saved form data");
        setFormData({
          selectbank: "",
          selectSenderName: "",
          selectReceiverName: "",
          selectAmount: "",
          selectDate: "",
          selectStatus: "",
          selectMode: "",
          selectTextArea: "",
        });
      })
      .catch((error) => {
        console.error("Error saving form data:", error);
      });
      window.location.href="./Dashboard"
  };

  return (
    <>
      <div className="DataEntry">
        <form onSubmit={handleSubmit}>
          <h2>Enter the Amount Details</h2>
          <div className="DataInput">
            <select
              name="selectbank"
              value={formData.selectbank}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Bank
              </option>
              <option>HDFC Bank</option>
              <option>Bank of Baroda</option>
            </select>
            <input
              type="text"
              name="selectSenderName"
              placeholder="Sender Name"
              value={formData.selectSenderName}
              required
              onChange={handleChange}
            />
            <input
              type="text"
              name="selectReceiverName"
              placeholder="Receiver Name"
              value={formData.selectReceiverName}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="selectAmount"
              placeholder="Amount"
              value={formData.selectAmount}
              onChange={handleChange}
              required
            />
            <input
              type="datetime-local"
              name="selectDate"
              placeholder="Date"
              value={formData.selectDate}
              onChange={handleChange}
              required
            />
            <select
              name="selectStatus"
              value={formData.selectStatus}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Status
              </option>
              <option>Credit</option>
              <option>Debit</option>
            </select>
            <select
              name="selectMode"
              value={formData.selectMode}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Mode
              </option>
              <option>Bank Transfer</option>
              <option>UPI</option>
              <option>Withdraw</option>
            </select>
            <textarea
              name="selectTextArea"
              placeholder="Enter About"
              value={formData.selectTextArea}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default EntryDataPage;
