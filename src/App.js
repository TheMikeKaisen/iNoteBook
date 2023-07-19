import "./App.css"
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
} from "react-router-dom";

import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import NoteState from "./Context/notes/NoteState";


function App() {
  return (
    <NoteState>
    <div className="App">

      <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={< About/>} />
        
      </Routes>
    </Router>
      
    </div>
    </NoteState>
  );
}

export default App;
