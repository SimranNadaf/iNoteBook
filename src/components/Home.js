import React from "react";
import Notes from "./Notes";
// import NoteState from "../Context/note/NoteState";
function Home(props) {
  return (
    <>
      <Notes alert={props.alert}/>
    </>
  );
}

export default Home;
