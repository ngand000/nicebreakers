import React from "react"
import ActivityPreview from "./ActivityPreview";

// The section that lists the activities pulled from the database
export default function ActivityList({activities}) {
    return ( <div style={{display: "flex", flexWrap: "wrap", height: "80vh", width: "90vw", borderStyle: "solid", margin: "auto"}}>
        {activities.map((activity, i) => {
            return <ActivityPreview key={i} activity={activity}/>
        })}
        </div>
    )
}