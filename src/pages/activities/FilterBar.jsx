import React from "react"
import Filter from "./Filter";
import "./FilterBar.css"

// The bar of filters that allows the user to update what they are filtering by
export default function FilterBar({openPopup, removeFilter, setEndorsed, activities}) {

    const filters = activities ? [{color: "rgb(255,94,94)", label: "Group Size"},
        {color: "rgb(255,187,89)", label: "Ages"},
        {color: "rgb(255,252,123)", label: "Duration(min)"},
        {color: "rgb(182,255,123)", label: "Endorsed"}]
        : [{color: "rgb(255,187,89)", label: "Ages"},
            {color: "rgb(182,255,123)", label: "Endorsed"}]

    return (<div className={"filterBarStyle"}>
        Filters
        {filters.map((filter, i) => {
            return <Filter key={i} color={filter.color} label={filter.label} className={"filterStyle"} onClick={filter.label==="Endorsed"?setEndorsed:openPopup} removeFilter={removeFilter}/>
        })}
    </div>)
}