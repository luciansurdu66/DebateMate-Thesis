import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.page";
import LoginPage from "./pages/login.page";
import "./index.scss";

export default function App (){
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Router>
    );
}
ReactDOM.render(<App />, document.getElementById("app"));
