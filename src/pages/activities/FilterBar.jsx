import React from "react"
import Filter from "./Filter";
import "./FilterBar.css"

export default function FilterBar({openPopup, removeFilter}) {

    const filters = []

    for (let i=0; i<20; i++) {
        filters.push({color: "rgb(0, 255, 0)", label: "Group Size"})
    }

    return (<div className={"filterBarStyle"}>
        Filters
        {filters.map((filter, i) => {
            return <Filter key={i} color={filter.color} label={filter.label} className={"filterStyle"} onClick={openPopup} removeFilter={removeFilter}/>
        })}
    </div>)
}