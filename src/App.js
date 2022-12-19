import "./App.css";
import { useState, useEffect } from "react";
import {
  Link,
  Route,
  Routes,
  useParams,
  BrowserRouter,
} from "react-router-dom";
import Doctors from "./components/Doctors";
import Profile from "./components/Profile";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Doctors />}></Route>
        <Route path="/profile/:id" element={<Profile />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
