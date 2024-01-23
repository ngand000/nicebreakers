import React from "react"
import ActivityPreview from "./ActivityPreview";

// The section that lists the activities pulled from the database
export default function ActivityList({activities}) {
    return (
        activities.map((activity, i) => {
            return <ActivityPreview key={i} activity={activity}/>
        })
    )
}