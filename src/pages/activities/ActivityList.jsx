import React from "react"
import ActivityPreview from "./ActivityPreview";
import "./ActivityList.css"

// The section that lists the activities pulled from the database
export default function ActivityList({activities, admin}) {

    return ( <div className={"divStyle"}>
        {activities.map((activity, i) => {
            return <ActivityPreview key={i} activity={activity} admin={admin}/>
        })}
        </div>
    )
}