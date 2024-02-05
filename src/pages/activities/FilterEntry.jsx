import React, {useState} from 'react';
import './FilterEntry.css';

export default function FilterEntry({ onClose, filter}) {

    const [filterValue, setFilterValue] = useState("");

    function realOnClose() {
        // turn filterValue into valid type
        console.log(filterValue)
        onClose(filterValue)
    }

    return (
        <div className={"popup-container"}>
            <div className={"popup"}>
                <h2>{"Filter by " + filter}</h2>
                <input type={"text"} onChange={(e) => {setFilterValue(e.target.value)}}/>
                <button onClick={realOnClose}>Close</button>
            </div>
        </div>
    );
};