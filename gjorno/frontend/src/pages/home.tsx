import React, { useEffect, useState } from "react";
import axios from "../axios";
import ActivityList from "../components/ActivityList";
import NewActivity from "../components/NewActivity";
import IActivity from "../interfaces/activity";
import IAuthor from "../interfaces/author";
import "./../App.css";

function Home() {
  const [popup, setPopup] = useState(false);
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [currentUser, setCurrentUser] = useState<IAuthor>();
  const [acfilter, setAcfilter] = useState("Alle");
  const [orgfilter, setOrgfilter] = useState("Alle");

  async function fetchData() {
    const request = await axios.get("activities/", {
      headers: { Authorization: `JWT ${localStorage.getItem("token")}` },
    });
    setActivities(request.data);
    return;
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (data: IActivity) => {
    const sendPostRequest = async () => {
      try {
        await axios.post(
          `activities/`,
          { ...data, author: currentUser?.id },
          {
            headers: {
              Authorization: `JWT ${localStorage.getItem("token")}`,
            },
          }
        );
        fetchData();
      } catch (error) {
        console.error(error);
      }
    };
    sendPostRequest();
  };

  const getCurrentUser = async () => {
    try {
      await axios
        .get("userprofiles/", {
          headers: { Authorization: `JWT ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          if (res.data[0]) {
            setCurrentUser({
              id: res.data[0].id,
              is_organization: res.data[0].is_organization,
              user: res.data[0].user,
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  let activitiesToShow = activities;

  if (acfilter !== "Alle" && orgfilter === "Alle") {
    activitiesToShow = activities.filter((item) => item.genre === acfilter);
  } else if (acfilter === "Alle" && orgfilter !== "Alle") {
    if (orgfilter === "Privatpersoner") {
      activitiesToShow = activities.filter(
        (item) => item.author?.is_organization === false
      );
    }
    if (orgfilter === "Organisasjon") {
      activitiesToShow = activities.filter(
        (item) => item.author?.is_organization === true
      );
    }
    if (orgfilter === "Mine") {
      activitiesToShow = activities.filter(
        (item) => item.author?.user.username === currentUser?.user.username
      );
    }
  } else if (acfilter !== "Alle" && orgfilter !== "Alle") {
    if (orgfilter === "Privatpersoner") {
      activitiesToShow = activities.filter(
        (item) =>
          item.genre === acfilter && item.author?.is_organization === false
      );
    }
    if (orgfilter === "Organisasjon") {
      activitiesToShow = activities.filter(
        (item) =>
          item.genre === acfilter && item.author?.is_organization === true
      ); 
    }
    if (orgfilter === "Mine") {
      activitiesToShow = activities.filter(
        (item) =>
          item.genre === acfilter &&
          item.author?.user.username === currentUser?.user.username
      );
    }
  }

  return (
    <div className="App">
      <header>
        <button
          id="btnNewAct"
          onClick={() => {
            setPopup(!popup);
          }}
        >
          OPPRETT NY AKTIVITET
        </button>
      </header>
      <div id="filter-container">
        <div id="filterbox">
          <label>Hvilken type aktiviteter vil du se?</label>
          <br />
          <select
            onChange={(event) => {
              setAcfilter(event.target.value);
            }}
          >
            <option value="Alle">Alle</option>
            <option value="Annet">Annet</option>
            <option value="Tur">Tur</option>
            <option value="Løping">Løping</option>
            <option value="Attraksjon">Attraksjon</option>
          </select>
        </div>
        <div id="filterbox">
          <label>Hvem sine aktiviteter vil du se?</label>
          <br />
          <select
            onChange={(event) => {
              setOrgfilter(event.target.value);
            }}
          >
            <option value="Alle">Alle</option>
            <option value="Privatpersoner">Privatpersoner</option>
            <option value="Organisasjon">Organiserte aktiviteter</option>
            <option value="Mine">Mine aktiviteter</option>
          </select>
        </div>
      </div>
      <div id="activities">
        {currentUser && (
          <ActivityList
            currentUser={currentUser}
            activities={activitiesToShow}
          />
        )}
      </div>
      <div>
        {popup ? (
          <NewActivity
            popup={() => {
              setPopup(!popup);
            }}
            handleSubmit={handleSubmit}
            currentUser={currentUser}
          ></NewActivity>
        ) : null}
      </div>
    </div>
  );
}

export default Home;
