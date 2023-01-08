import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NoteState from "./Context/note/NoteState";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
// import NoteState from "./Context/note/NoteState";

function App() {
  return (
    <>
      
      <Router>
      <NoteState>
        <Navbar />
        
        <Routes>
          
          <Route exact path="/" element={<Home/>}/>
        
          <Route exact path="/about" element={<About/>}/>
    
        </Routes>
        </NoteState>
      </Router>
     
    </>
  );
}

export default App;
