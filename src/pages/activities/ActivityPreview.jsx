import React from "react"

// The preview for a single activity pulled from the database
export default function ActivityPreview({activity}) {
    const border = {
        border: "2px",
        borderStyle: "dashed",
        borderColor: "rgb(0 0 0)",
        padding: "4px 16px 4px 16px",
        borderRadius: "10px"
    }

    return (<div style={border}>
        {activity.Name}
    </div>)
}