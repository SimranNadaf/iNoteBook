import React, { useContext, useState } from "react";
import noteContext from "../Context/note/NoteContext";

function AddNote(props) {
const context = useContext(noteContext);
const { AddNote } = context;
const [note,setnote]=useState({title:"",tag:"",description:""})
  const handleClick = (e) => {
    e.preventDefault();
    AddNote(note.title,note.description,note.tag)
    setnote({title:"",tag:"",description:""})
    props.alert("Note Added Successfully","success")
  };
  const onChange = (e) => {
    setnote({...note,[e.target.name]:e.target.value})
  };
  return (
    <>
      <div className="container-fluid mb-4">
        <h3 className="mt-3">Add a New Node</h3>
        <form className="container">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              onChange={onChange}
            />
          </div>

          <button type="submit" className="btn btn-primary" onClick={handleClick}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default AddNote;
