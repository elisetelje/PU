import React, { useCallback, useEffect, useState } from "react";
import { Link, Redirect, Route, Router, Switch } from "react-router-dom";
import "./App.css";
import axios from "./axios";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import history from "./history";
import loginImage from "./images/login-image.png";
import IUser from "./interfaces/user";
import IUserLogin from "./interfaces/userlogin";
import ActivityLog from "./pages/activityLog";
import Home from "./pages/home";
import userImg from "./images/user.png";
import orgImg from "./images/org.png";

function App() {
  const [user, setUser] = useState<IUser>({
    username: "",
    email: "",
    is_organization: false,
  });
  const [isAuthenticated, setAuthenticated] = useState<boolean>(
    localStorage.getItem("token") ? true : false
  );

  const [errorSignup, setErrorSU] = useState("");
  const [errorLogIn, setErrorLI] = useState("");

  const handleLogin = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: IUserLogin
  ) => {
    event.preventDefault();
    if (!data.username) {
      setErrorLI("Du må skrive inn et brukernavn.");
      return;
    } else if (!data.password) {
      setErrorLI("Du må skrive inn et passord.");
      return;
    }
    const sendLoginRequest = async () => {
      try {
        await axios
          .post("token-auth/", data, {
            headers: { Authorization: `JWT ${localStorage.getItem("token")}` },
          })
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            setAuthenticated(true);
            history.push("/home");
          });
      } catch (error) {
        console.log(error);
      }
    };
    sendLoginRequest();
    getCurrentUser();
  };

  const checkPassword = (password: string) => {
    const passwordRegex = new RegExp(
      "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$"
    );
    return passwordRegex.test(password);
  };

  const handleSignup = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: IUser
  ) => {
    event.preventDefault();
    if (!data.username) {
      setErrorSU("Du må skrive inn et brukernavn.");
      return;
    } else if (!data.email) {
      setErrorSU(
        "Du må skrive inn en email, og den må ha dette formatet: navn@mail.no"
      );
      return;
    } else if (!data?.password) {
      setErrorSU("Du må skrive inn et passord");
      return;
    } else if (data?.password && !checkPassword(data.password)) {
      setErrorSU(
        "Passordet må innholde minst 8 karakterer, både store og små bokstaver og minst et tall."
      );
      return;
    }
    const sendSignupRequest = async () => {
      try {
        await axios.post("users/", { ...data }).then((res) => {
          localStorage.setItem("token", res.data.token);
          setAuthenticated(true);
          history.push("/home");
        });
      } catch (error) {
        console.log(error);
      }
    };
    sendSignupRequest();
    getCurrentUser();
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setUser({ username: "", email: "", is_organization: false });
    setAuthenticated(false);
    history.push("/");
  };

  const getCurrentUser = useCallback(async () => {
    try {
      axios
        .get("userprofiles/", {
          headers: { Authorization: `JWT ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          console.log(res);
          res.data[0] &&
            setUser({
              username: res.data[0].user.username,
              email: res.data[0].user.email,
              is_organization: res.data[0].is_organization,
            });
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getCurrentUser();
    }
  }, [getCurrentUser, isAuthenticated]);

  return (
    <div className="App">
      <div id="navbar">
        <h1 className="text">GjørNo'</h1>

        {isAuthenticated && (
          <>
            {user.is_organization === true && (
              <>
                <div>
                  <p className="iconText">Organisasjon</p>
                  <img className="imgIcon" src={orgImg} alt="Bilde" />
                </div>
              </>
            )}
            {user.is_organization === false && (
              <>
                <p className="iconText">Privatperson</p>
                <img className="imgIcon" src={userImg} alt="Bilde" />
              </>
            )}
            <div id="user">
              <p className="text" id="username">
                Hello {user?.username}
              </p>
              <button id="btnLogOut" onClick={handleLogOut}>
                Logg ut
              </button>
            </div>
          </>
        )}

        <div>
          <Link to="/home">
            <img id="imgLogo" src={loginImage} alt="Logo"></img>
          </Link>
        </div>
        {isAuthenticated && (
          <div>
            <Link
              style={{ textDecoration: "none" }}
              id="act-log-btn"
              to="/activity-log"
            >
              Aktivitetslogg
            </Link>
          </div>
        )}
      </div>
      <Router history={history}>
        <Switch>
          <Route path={"/home"} exact component={Home} />
          <Route path={"/login"} exact>
            {isAuthenticated ? (
              <Redirect to={"/home"} />
            ) : (
              <LoginForm error={errorLogIn} handleLogin={handleLogin} />
            )}
          </Route>
          <Route path={"/signup"} exact>
            {isAuthenticated ? (
              <Redirect to={"/home"} />
            ) : (
              <SignupForm error={errorSignup} handleSignup={handleSignup} />
            )}
          </Route>
          <Route path={"/"} exact>
            {isAuthenticated ? (
              <Redirect to={"/home"} />
            ) : (
              <Redirect to={"/signup"} />
            )}
          </Route>
          <Route path={"/activity-log"} exact component={ActivityLog}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
