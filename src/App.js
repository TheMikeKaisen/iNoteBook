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

function App() {
  return (
    <div className="App">

      <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={< About/>} />
        
      </Routes>
    </Router>
      
    </div>
  );
}

export default App;
