import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const note = [];
  const navigate = useNavigate();
  const [notes, setNotes] = useState(note);

  // useEffect(() => {
  //   getNotes();
  // },[]);

  //Fetch all notes for API Call
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify(),
    });
    const json = await response.json();
    setNotes(json);
  };

  //add Node
  const AddNote = async (title, description, tag) => {

    //API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({title,description,tag}),
    });
    const json= await response.json();
    setNotes(notes.concat(json))
    // getNotes() - directly fetch all updated notes
  };

  const deleteNode = async (_id) => {
    // API call
    const response = await fetch(`${host}/api/notes/deletenote/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify(),
    });
    // const json= await response.json()

    const newNotes = notes.filter((note) => {
      return note._id!== _id;
    });
    setNotes(newNotes);
  };

  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({title, description, tag}),
    });
    // const json = response.json();
  
    // Logic to edit in client
    // let newNotes=JSON.parse(JSON.stringify(notes))
    // for (let index = 0; index < newNotes.length; index++) {
    //   const element = newNotes[index];
    //   if (element._id == id) {
    //     console.log("updating......................")
    //     newNotes.title = title;
    //     newNotes.description = description;
    //     newNotes.tag = tag;
    //     break;
    //   }
    // }
    // console.log(newNotes)
    // setNotes(newNotes)

    getNotes()
  };
  return (
    <NoteContext.Provider
      value={{ notes, AddNote, deleteNode, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
