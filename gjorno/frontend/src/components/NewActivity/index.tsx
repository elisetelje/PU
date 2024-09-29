import React, { FC, useState } from "react";
import IActivity from "../../interfaces/activity";
import IAuthor from "../../interfaces/author";
import "../../styles/newActivity.css";

interface Props {
  popup: () => void;
  handleSubmit: (data: IActivity) => void;
  currentUser?: IAuthor;
}

const NewActivity: FC<Props> = ({ popup, handleSubmit, currentUser }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [genre, setGenre] = useState("");
  const [error, setError] = useState("");

  const handleOnClick = () => {
    const data = {
      title: title,
      created: new Date(),
      description: description,
      date: new Date(date),
      genre: genre,
    };

    if (!title) {
      setError("Du må skrive inn en tittel.");
    } else if (!data.description) {
      setError("Du må skrive inn en beskrivelse.");
    } else if (!data.genre) {
      setError("Du må velge en sjanger.");
    } else if (date === "") {
      setError("Du må velge en dato.");
    } else if (data.date < new Date()) {
      if (currentUser) {
        if (currentUser.is_organization) {
          setError("Dato må være fram i tid.");
        } else {
          handleSubmit(data);
          popup();
        }
      }
    } else {
      handleSubmit(data);
      popup();
    }
  };

  return (
    <div className="popUp">
      <h3 id="tittel">Ny aktivitet</h3>
      <div className="div">
        <label className="label">Tittel:</label>
        <input
          name="title"
          className="input"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <br />
      <div className="div">
        <label className="label">Beskrivelse:</label>
        <textarea
          name="description"
          className="input"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>
      <br />
      <div className="div">
        <label className="label">Sjanger</label>
        <select
          className="input"
          onChange={(event) => setGenre(event.target.value)}
        >
          <option value="" selected disabled hidden>
            Velg her
          </option>
          <option value="Annet">Annet</option>
          <option value="Tur">Tur</option>
          <option value="Løping">Løping</option>
          <option value="Attraksjon">Attraksjon</option>
        </select>
      </div>
      <br />
      <div className="div" id="divDato">
        <label className="label">Dato:</label>
        <input
          name="date"
          className="input"
          type="datetime-local"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </div>
      <br />
      <button className="btn" id="btnExit" onClick={popup}>
        X
      </button>
      <button className="btn" id="btnOk" onClick={handleOnClick}>
        OK
      </button>
      <br></br>
      <br></br>
      <p id="error">{error}</p>
    </div>
  );
};

export default NewActivity;
