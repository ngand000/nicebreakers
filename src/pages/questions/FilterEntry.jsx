import React, {useState} from 'react';
import './FilterEntry.css';

export default function FilterEntry({ onClose, filter, dtype}) {

    const [filterValue, setFilterValue] = useState("");
    const [failedInput, setFailedInput] = useState("");

    function realOnClose() {
        // turn filterValue into valid type
        let result;

        switch (dtype) {
            case "rangeIn":
            case "rangeOut":
                if (!isNaN(Number(filterValue)) && !isNaN(parseInt(filterValue))) {
                    result = [parseInt(filterValue), parseInt(filterValue)];
                    break;
                }
                let range = filterValue.split('-')
                if (range.length !== 2 || (isNaN(parseInt(range[0])) || isNaN(parseInt(range[1])))) {
                    setFailedInput("Must enter 1 number or 2 numbers with a hyphen in between (e.g. \"3-5\")")
                    return;
                }
                result = [parseInt(range[0]), parseInt(range[1])];
                break;
            case "bool":
                result=true;
                break;
            default:

        }

        onClose(result)
    }

    const errorTextStyle = {color: "red"}

    return (
        <div className={"popup-container"}>
            <div className={"popup"}>
                <h2>{"Filter by " + filter}</h2>
                {failedInput !== "" && <p style={errorTextStyle}>{failedInput}</p>}
                <input type={"text"} onChange={(e) => {setFilterValue(e.target.value)}}/>
                <button onClick={realOnClose}>Close</button>
            </div>
        </div>
    );
};