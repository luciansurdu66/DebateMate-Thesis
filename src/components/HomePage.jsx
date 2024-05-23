import React from "react";
import "../index.scss";
const HomePage = () => {
    return (
        <div>
            <nav className="bg-gray-800 p-4">
            <ul className="flex">
                <li className="mr-4">
                <a href="#" className="text-white hover:text-blue-300">Home</a>
                </li>
                <li className="mr-4">
                <a href="#" className="text-white hover:text-gray-300">About</a>
                </li>
                <li className="mr-4">
                <a href="#" className="text-white hover:text-gray-300">Services</a>
                </li>
                <li>
                <a href="#" className="text-white hover:text-gray-300">Contact</a>
                </li>
            </ul>
            </nav>

        </div>
    );
};

export default HomePage;