import React from 'react';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Login from "./Components/Login/Login";
import Header from "./Components/Header/Header"
function App() {
  return(
    <Router >
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
    )
}
// this is something we are about to do in front of the shit we are not even aware
// we all not going to be this is something we are awesoe
export default App;
