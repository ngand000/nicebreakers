import React from "react"
import Filter from "./Filter";
import "./FilterBar.css"

// The bar of filters that allows the user to update what they are filtering by
export default function FilterBar({openPopup, removeFilter, setEndorsed, activities}) {

    const filters = activities ? [{color: "rgb(48,139,255)", label: "Group Size"},
        {color: "rgb(73,171,252)", label: "Ages"},
        {color: "rgb(79,239,255)", label: "Duration(min)"},
        {color: "rgb(185,255,253)", label: "Endorsed"}]
        : [{color: "rgb(73,171,252)", label: "Ages"},
            {color: "rgb(185,255,253)", label: "Endorsed"}]

    return (<div className={"filterBarStyle"}>
        Filters
        {filters.map((filter, i) => {
            return <Filter key={i} color={filter.color} label={filter.label} className={"filterStyle"} onClick={filter.label==="Endorsed"?setEndorsed:openPopup} removeFilter={removeFilter}/>
        })}
    </div>)
}