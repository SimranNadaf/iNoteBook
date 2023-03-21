import React, { useContext } from "react";
import noteContext from "../Context/note/NoteContext";

function Noteitem(props) {
  const context = useContext(noteContext);
  const { deleteNode} = context;
  const { note, updateNote } = props;
  return (
    <>
      <div className="card col-3 my-2 mx-2">
        <div className="card-body ">
          <div className="d-flex justify-content-start">
            <h5 className="card-title">
              {note.title}
              <i
                className="fa-solid fa-trash mx-3"
                onClick={() => {
                  deleteNode(note._id); props.alert("Note is Deleted Successfully","success")
                }}
              ></i>
              <i className="fa-solid fa-pen mx-3" onClick={() => {
                  updateNote(note);
                }}></i>
            </h5>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </>
  );
}

export default Noteitem;
