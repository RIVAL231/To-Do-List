import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
    return (
        <div className="container--navbar">
            <h1>TODO LIST</h1>
            <span>
                <input type="text" />
                <select >
                    <option value="All">All</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <button className="btn">
                    <FontAwesomeIcon icon={faMoon} />
                </button>
            </span>
        </div>
    );
}
