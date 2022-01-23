import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { isExpired } from "react-jwt";

import NavBar from './components/NavBar';
import MainPage from './components/MainPage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import AddPage from './components/AddPage';
import DetailsPage from './components/DetailsPage';

function App() {
  const loggedIn = !isExpired(localStorage.getItem('token'));
  return (
    <div>
        <Router>
          <NavBar />
          <Routes>
            {
              loggedIn?(
                <>
                <Route path="/Add" element={
                    <AddPage />}
                />
              <Route path="/Details/:id" element={
                    <DetailsPage />}
                />

                </>
              )
              :
              (
                <>
                  <Route path="/signin" element={
                      <LoginPage />}
                  />

                  <Route path="/signup" element={
                      <RegisterPage />}
                  />
                </>
              )
            }
            <Route path="*" element={<MainPage />} />
          </Routes>
        </Router>

    </div>
  );
}

export default App;
