import React, {useState} from "react"
import './Filter.css'

export default function Filter({color, label, onClick, removeFilter}) {

    const [filtered, setFiltered] = useState(false)

    const filterStyle = {
        backgroundColor: color
    }

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