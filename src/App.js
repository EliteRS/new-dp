import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Index from './pages/index';
import Home from "./containers/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
