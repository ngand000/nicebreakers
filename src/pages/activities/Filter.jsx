import React from "react"
import './Filter.css'

export default function Filter({color, label}) {

    const filterStyle = {
        backgroundColor: color
    }

    return (<div className={"filterStyle"} style={filterStyle}>
        {label}
    </div>)
}