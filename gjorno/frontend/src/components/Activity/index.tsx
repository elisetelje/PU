import React, { useCallback, useEffect, useState } from "react";
import axios from "../../axios";
import annetImg from "../../images/annet.png";
import attImg from "../../images/attraksjon.png";
import lopingImg from "../../images/loping.png";
import turImg from "../../images/tur.png";
import IActivity from "../../interfaces/activity";
import IAuthor from "../../interfaces/author";
import "../../styles/activity.css";

interface Props {
  activity: IActivity;
  currentUser: IAuthor;
}

const Activity: React.FC<Props> = ({
  activity: {
    id,
    title,
    created,
    description,
    date,
    author,
    genre,
    participants,
  },
  currentUser,
}) => {
  const [isParticipating, setIsParticipating] = useState<boolean>();

  const addParticipant = () => {
    const sendPostRequest = async () => {
      try {
        id &&
          currentUser &&
          (await axios
            .post(
              `participant/${id}/${currentUser.id}/`,
              {},
              {
                headers: {
                  Authorization: `JWT ${localStorage.getItem("token")}`,
                },
              }
            )
            .then(() => setIsParticipating(true)));
      } catch (error) {
        console.error(error);
      }
    };
    sendPostRequest();
  };

  const removeParticipant = () => {
    const sendDeleteRequest = async () => {
      try {
        id &&
          currentUser &&
          (await axios
            .delete(`participant/${id}/${currentUser.id}/`, {
              headers: {
                Authorization: `JWT ${localStorage.getItem("token")}`,
              },
            })
            .then(() => setIsParticipating(false)));
      } catch (error) {
        console.error(error);
      }
    };
    sendDeleteRequest();
  };

  const checkIfParticipating = useCallback(() => {
    if (participants && currentUser) {
      setIsParticipating(
        participants.filter((item) => item.id === currentUser.id).length > 0
      );
    }
  }, [currentUser, participants]);

  useEffect(() => {
    checkIfParticipating();
  }, [checkIfParticipating]);

  return (
    <>
      {genre === "Annet" && (
        <div key={id} className="box" id="annetBox">
          <div className="imgRight">
            <img id="icon" src={annetImg} alt="login" />
          </div>
          <h3>{title}</h3>
          <p id="opprettet">Opprettet: {created}</p>
          <p>{description}</p>
          <p id="dato">Dato og tidspunkt: {date}</p>
          <p>{author?.is_organization ? "Organisasjon" : "Privatperson"}</p>
          <p>
            {author?.user.username && `Opprettet av ${author.user.username}`}
          </p>
          <p>
            {!currentUser.is_organization && author?.is_organization && !isParticipating && (
              <button className="activity-button" onClick={addParticipant}>
                {"Meld deg på"}
              </button>
            )}

            {!currentUser.is_organization && isParticipating && (
              <button
                style={{ backgroundColor: "red" }}
                className="activity-button"
                onClick={removeParticipant}
              >
                {"Meld av"}
              </button>
            )}
          </p>
        </div>
      )}
      {genre === "Tur" && (
        <div key={id} className="box" id="turBox">
          <div className="imgRight">
            <img id="icon" src={turImg} alt="login" />
          </div>
          <h3>{title}</h3>
          <p id="opprettet">Opprettet: {created}</p>
          <p>{description}</p>
          <p id="dato">Dato og tidspunkt: {date}</p>
          <p>{author?.is_organization ? "Organisasjon" : "Privatperson"}</p>
          <p>
            {author?.user.username && `Opprettet av ${author.user.username}`}
          </p>
          <p>
            {!currentUser.is_organization && author?.is_organization && !isParticipating && (
              <button className="activity-button" onClick={addParticipant}>
                {"Meld deg på"}
              </button>
            )}

            {!currentUser.is_organization && isParticipating && (
              <button
                style={{ backgroundColor: "red" }}
                className="activity-button"
                onClick={removeParticipant}
              >
                {"Meld av"}
              </button>
            )}
          </p>
        </div>
      )}
      {genre === "Løping" && (
        <div key={id} className="box" id="lopingBox">
          <div className="imgRight">
            <img id="icon" src={lopingImg} alt="login" />
          </div>
          <h3>{title}</h3>
          <p id="opprettet">Opprettet: {created}</p>
          <p>{description}</p>
          <p id="dato">Dato og tidspunkt: {date}</p>
          <p>{author?.is_organization ? "Organisasjon" : "Privatperson"}</p>
          <p>
            {author?.user.username && `Opprettet av ${author.user.username}`}
          </p>
          <p>
            {!currentUser.is_organization && author?.is_organization && !isParticipating && (
              <button className="activity-button" onClick={addParticipant}>
                {"Meld deg på"}
              </button>
            )}

            {!currentUser.is_organization && isParticipating && (
              <button
                style={{ backgroundColor: "red" }}
                className="activity-button"
                onClick={removeParticipant}
              >
                {"Meld av"}
              </button>
            )}
          </p>
        </div>
      )}
      {genre === "Attraksjon" && (
        <div key={id} className="box" id="attraksjonBox">
          <div className="imgRight">
            <img id="icon" src={attImg} alt="login" />
          </div>
          <h3>{title}</h3>
          <p id="opprettet">Opprettet: {created}</p>
          <p>{description}</p>
          <p id="dato">Dato og tidspunkt: {date}</p>
          <p>{author?.is_organization ? "Organisasjon" : "Privatperson"}</p>
          <p>
            {author?.user.username && `Opprettet av ${author.user.username}`}
          </p>
          <p>
            {!currentUser.is_organization && author?.is_organization && !isParticipating && (
              <button className="activity-button" onClick={addParticipant}>
                {"Meld deg på"}
              </button>
            )}

            {!currentUser.is_organization && isParticipating && (
              <button
                style={{ backgroundColor: "red" }}
                className="activity-button"
                onClick={removeParticipant}
              >
                {"Meld av"}
              </button>
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default Activity;
