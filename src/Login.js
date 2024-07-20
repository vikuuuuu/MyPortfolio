// import { useState } from "react";
import React, { useState } from "react";
import "./Login.css";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [passowrd, setPassword] = useState("");
  const [error, setError] = useState(null);

  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, passowrd)
      .then((userCredential) => {
        console.log("Login Successfull!");
        alert("Login SuccessFull!");
        window.location.href="../Dashboard"
      })
      .catch((error) => {
        setError(error.message);
        console.log("Error singing in :", error);
      });
  };
  return (
    <div className="LoginHome">
      <form onSubmit={login}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Password"
          value={passowrd}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
