import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NoteState from "./Context/note/NoteState";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Alert from "./components/Alert";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { useState } from "react";

function App() {
  
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };
  return (
    <>
      
      <Router>
      <NoteState>
        <Navbar />
      <Alert alert={alert} />
   
        <Routes>
          
          <Route exact path="/" element={<Home alert={showAlert}/>}/>
        
          <Route exact path="/about" element={<About alert={showAlert}/>}/>
          <Route exact path="/signin" element={<Signin alert={showAlert}/>}/>
          <Route exact path="/signup" element={<Signup alert={showAlert}/>}/>
    
        </Routes>
        </NoteState>
      </Router>
     
    </>
  );
}

export default App;
