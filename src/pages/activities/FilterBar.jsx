import React from "react"
import Filter from "./Filter";
import "./FilterBar.css"

export default function FilterBar({openPopup, removeFilter}) {

    const filters = [{color: "rgb(255,94,94)", label: "Group Size"},
        {color: "rgb(255,187,89)", label: "Ages"},
        {color: "rgb(255,252,123)", label: "Duration(min)"},
        {color: "rgb(182,255,123)", label: "Endorsed"}]

    return (<div className={"filterBarStyle"}>
        Filters
        {filters.map((filter, i) => {
            return <Filter key={i} color={filter.color} label={filter.label} className={"filterStyle"} onClick={openPopup} removeFilter={removeFilter}/>
        })}
    </div>)
}