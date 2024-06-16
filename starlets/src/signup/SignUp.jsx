import React from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";

export default function SignUp() {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    // Here you can add logic to handle account creation process if needed

    // Navigate to the Home page upon successful account creation
    navigate("/home");
  };

  return (
    <div className="body">
      <div className="sign-container">
        <div className="headerrr">
          <span role="img" aria-label="notepad" className="notepad">
            📒
          </span>{" "}
          Sign Up
          <span className="cancel-btn">X</span>
        </div>
        <hr></hr>
        <div className="signForm">
          <h2 className="hhhh">Sign Up</h2>
          <form action="#" method="post">
            <div className="input-grp">
              <label htmlFor="fullname" className="fullnamelabel">
                Full Name:
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                placeholder="Full Name"
              ></input>
            </div>
            <div className="input-grp">
              <label htmlFor="password" className="passlabel">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
              ></input>
            </div>
            <div className="input-grp">
              <label htmlFor="confirmpassword" className="confirmlabel">
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmpassword"
                name="confirmpassword"
                placeholder="Confirm Password"
              ></input>
            </div>
            <div className="input-grp">
              <label htmlFor="email" className="emaillabel">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
              ></input>
            </div>
            <div className="checkbox-grp">
              <input
                type="checkbox"
                id="humanCheck"
                name="humanCheck"
                className="checkbox"
              />
              <label htmlFor="humanCheck" className="check">
                Verify you're not a robot
              </label>
            </div>
            <button type="button" className="btn" onClick={handleCreateAccount}>
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
