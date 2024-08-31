import React from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomePage from "./pages/Home";
//import { Amplify } from 'aws-amplify'
//import awsconfig from './aws-exports'
import Navbar from "./components/Nav";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

//Amplify.configure(awsconfig);

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
