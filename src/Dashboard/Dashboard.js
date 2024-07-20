import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { getDatabase, ref, onValue } from "firebase/database";
import EntryDataPage from "./EntryDataPage";

function Dashboard() {
  // const [formData, setFormData] = useState({
  //   selectbank: "",
  //   selectSenderName: "",
  //   selectReceiverName: "",
  //   selectAmount: "",
  //   selectDate: "",
  //   selectStatus: "",
  //   selectMode: "",
  //   selectTextArea: "",
  // });
  
  const [entryDataPopup, setEntryDataPopup] = useState(false);

  const handleShowEntryData =() =>{
    setEntryDataPopup(!entryDataPopup);
  };

  const [tableData, setTableData] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);

  useEffect(() => {
    const database = getDatabase();
    const dataRef = ref(database, "FormData");

    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setTableData(formattedData);

        let credit = 0;
        let debit = 0;
        formattedData.forEach((entry) => {
          if (entry.selectStatus === "Debit") {
            debit += parseFloat(entry.selectAmount);
          } else if (entry.selectStatus === "Credit") {
            credit += parseFloat(entry.selectAmount);
          }
        });
        setTotalCredit(credit);
        setTotalDebit(debit);
        const Balance = debit - credit;
        setTotalBalance(Balance);
      } else {
        setTableData([]);
        setTotalBalance(0);
        setTotalCredit(0);
        setTotalDebit(0);
      }
    });
  }, []);

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const database = getDatabase();
  //   push(ref(database, "FormData"), formData)
  //     .then(() => {
  //       console.log("Successfully saved form data");
  //       setFormData({
  //         selectbank: "",
  //         selectSenderName: "",
  //         selectReceiverName: "",
  //         selectAmount: "",
  //         selectDate: "",
  //         selectStatus: "",
  //         selectMode: "",
  //         selectTextArea: "",
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error saving form data:", error);
  //     });
  // };


  return (
    <>
    <div id="Dashboard" className={entryDataPopup ? "blur" : ""}>
      <div className="DashboardNav">
        <p>Profile</p>
        <p>Home / Dashboard</p>
      </div>
      <div className="CardContainer">
        <div className="Card">
          <h4>
            Total Balance{" "}
            <span className="material-symbols-outlined">account_balance</span>{" "}
          </h4>
          <p>
            {" "}
            <span className="material-symbols-outlined">
              currency_rupee
            </span>{" "}
            {totalBalance}
          </p>
        </div>
        <div className="Card">
          <h4>
            Total Credit{" "}
            <span className="material-symbols-outlined">credit_card</span>{" "}
          </h4>
          <p>
            <span className="material-symbols-outlined">currency_rupee</span>{" "}
            {totalCredit}
          </p>
        </div>
        <div className="Card">
          <h4>
            Total Debit
            <span className="material-symbols-outlined">credit_card</span>{" "}
          </h4>
          <p>
            <span className="material-symbols-outlined">currency_rupee</span>{" "}
            {totalDebit}
          </p>
        </div>
        <div className="Card">
          <h4>
            Add Balance <span className="material-symbols-outlined">add</span>
          </h4>
          <p className="AddArrow"
            onClick={handleShowEntryData}
          >
            Entry{" "}
            <span className="material-symbols-outlined">arrow_right_alt</span>
          </p>
        </div>
      </div>
      <div className="EntryTable">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Bank Name</th>
              <th>Sender Name</th>
              <th>Receiver Name</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Mode</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((EntryData, index) => (
              <tr key={EntryData.id}>
                <td>{index + 0}</td>
                <td>{EntryData.selectbank}</td>
                <td>{EntryData.selectSenderName}</td>
                <td>{EntryData.selectReceiverName}</td>
                <td>{EntryData.selectAmount}</td>
                <td>{EntryData.selectDate}</td>
                <td>{EntryData.selectStatus}</td>
                <td>{EntryData.selectMode}</td>
                <td>{EntryData.selectTextArea} </td>
              </tr>
            ))} 
          </tbody>
        </table>
      </div>
      
      {/* <div className="DataEntry">
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
      </div> */}
    </div>
    {entryDataPopup && <EntryDataPage/>}

    </>
    
    
  );
}

export default Dashboard;
