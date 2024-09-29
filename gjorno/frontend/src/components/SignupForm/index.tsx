import React, { useState } from "react";
import IUser from "../../interfaces/user";
import loginImage from "../../images/login-image.png";
import { Link } from "react-router-dom";
import "../../styles/login.css";

interface Props {
  handleSignup: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: IUser
  ) => void;
  error: string;
}

const SignupForm: React.FC<Props> = ({ handleSignup, error }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOrganization, setIsOrganization] = useState(false);

  return (
    <div className="base-container">
      <div className="header">Registrer deg</div>
      <div className="content">
        <div className="image">
          <img id="login-image" src={loginImage} alt="login" />
        </div>
        <div className="form">
          <div className="form-group">
            <label htmlFor="username" className="loginLabel">
              Brukernavn
            </label>
            <input
              className="loginInput"
              type="text"
              placeholder="Brukernavn"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="email" className="loginLabel">
              E-post
            </label>
            <input
              className="loginInput"
              type="email"
              placeholder="E-post"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="password" className="loginLabel">
              Passord
            </label>
            <input
              className="loginInput"
              type="password"
              placeholder="Passord"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            ></input>
          </div>
          <div id="float-container">
            <div id="private" className="float-child">
              <input
                type="radio"
                name="radiobutton"
                value="private"
                checked
                onChange={(e) => setIsOrganization(false)}
              ></input>
              <label htmlFor="private">Privat person</label>
            </div>
            <div id="organization" className="float-child">
              <input
                type="radio"
                name="radiobutton"
                value="organization"
                onChange={(e) => setIsOrganization(true)}
              ></input>
              <label htmlFor="organization">Organisasjon</label>
            </div>
          </div>
        </div>
      </div>
      <p id="error">{error}</p>
      <div className="footer">
        <button
          className="loginBtn"
          onClick={(event) => {
            handleSignup(event, {
              username: username,
              email: email,
              password: password,
              is_organization: isOrganization,
            });
          }}
        >
          Registrer deg
        </button>
      </div>
      <Link to="/login">
        <button id="button-link">Login</button>
      </Link>
    </div>
  );
};

export default SignupForm;
