import React from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();

  const handleCreateAccountClick = () => {
    navigate("/signup");
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    // Here you can add logic to handle login process if needed

    // Navigate to the Home page upon successful login
    navigate("/home");
  };

  return (
    <div className="bodyy">
      <div className="login-container">
        <div className="headerr">
          <span role="img" aria-label="notepad" className="notepad">
            📒
          </span>{" "}
          Welcome!
          <span className="cancel-btn">X</span>
        </div>
        <hr className="hr"></hr>
        <div className="login-form">
          <h2>Log In</h2>
          <form onSubmit={handleLoginSubmit}>
            <div className="input-group">
              <label htmlFor="username" className="userlabel">
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
              ></input>
            </div>
            <div className="input-group">
              <label htmlFor="password" className="passlabel">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Your Password"
              ></input>
            </div>
            <button type="submit" className="btn login-btn">
              Log In
            </button>
            <button
              type="button"
              className="btn create-account-btn"
              onClick={handleCreateAccountClick}
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
