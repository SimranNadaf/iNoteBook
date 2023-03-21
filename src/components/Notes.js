import React, { useContext, useEffect, useRef, useState } from "react";
import Noteitem from "./Noteitem";
import noteContext from "../Context/note/NoteContext";
import AddNote from "./AddNote";
import { useNavigate } from "react-router";

function Notes(props) {
  const {alert} = props
  const context = useContext(noteContext);
  const navigator=useNavigate(null)
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();// eslint-disable-next-line
    }
    else{
      navigator('/signin')
    }
   
  }, []);

  const [note, setnote] = useState({
    etitle: "",
    etag: "",
    edescription: "",
  });
  const handleClick = (e) => {
    // e.preventDefault();
    editNote(note._id, note.etitle, note.edescription, note.etag);
    alert("Note Edited Successfully","success")
  };
  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({_id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag})
  };

  const ref = useRef(null);

  return (
    <>
      <div className="container-fluid">
        <AddNote alert={alert}/>

        {/* Edit Note */}
        <button
          type="button"
          ref={ref}
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        ></button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Edit Note
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form className="container">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      value={note.etitle}
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
                      id="etag"
                      name="etag"
                      value={note.etag}
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
                      id="edescription"
                      name="edescription"
                      value={note.edescription}
                      onChange={onChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    handleClick()
                  }}
                >
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-center">Your Notes</h3>
        <div className="row d-flex justify-content-center">
          <div className="container text-center mt-3">
            {notes.length===0 && 'No Notes for Display'}
          </div>
          {notes.map((note, index) => {
            return <Noteitem key={index} note={note} updateNote={updateNote} alert={alert}/>;
          })}
        </div>
      </div>
    </>
  );
}

export default Notes;
