import React, {useState} from "react"
import './Filter.css'

// single filter that user can click on to filter by
export default function Filter({color, label, onClick, removeFilter}) {

    const [filtered, setFiltered] = useState(false)

    const filterStyle = {
        backgroundColor: color
    }

    //pre: label has a value
    //post: either applies filter to label, or removes it there already is one
    function filterOnClick() {
        if (!filtered) {
            onClick(label)
        } else {
            removeFilter(label)
        }
        setFiltered(!filtered)
    }

    return (<div className={"filterStyle"} style={filterStyle} onClick={filterOnClick}>
        {label}
        {filtered && " X"}
    </div>)
}