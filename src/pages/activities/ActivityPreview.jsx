import React from "react"

// The preview for a single activity pulled from the database
export default function ActivityPreview({activity}) {

    function rangeToString(r) {
        return (r[0] == r[1] ? r[0] : r[0] + "-" + r[1])
    }

    const outerDivStyle = {padding: "4px 16px 4px 16px",
        width: "20%",
        height: "50%"}

    const innerDivStyle = {
        border: "1px",
        borderStyle: "solid",
        borderColor: "rgb(200 200 200)",
        borderRadius: "10px",
        margin: "auto",
        width: "100%",
        height: "90%",
        position: "relative"
    }


    const nameStyle = {fontSize: "4vmin", textDecoration: "underline"}

    const abstractStyle = {fontSize: "3vmin", textAlign: "center"}

    const likeCountStyle = {position: "absolute", left: "4%", bottom: "4%", fontSize: "3.5vmin"}

    const durationStyle = {position: "absolute", bottom: "4%", fontSize: "3vmin", left: "0", right: "0", textAlign: "center"}

    const peopleCountStyle = {position: "absolute", bottom: "4%", fontSize: "3vmin", right: "0"}

    return ( <div style={outerDivStyle}>
            <div style={innerDivStyle}>
                <div style={nameStyle}>
                    {activity.Name}
                </div>
                <div style={abstractStyle}>
                    {activity.Abstract}
                </div>
                <div style={likeCountStyle}>{activity.Likes}</div>
                <div style={durationStyle}>
                    {rangeToString(activity.Duration) + " min"}
                </div>
                <div style={peopleCountStyle}>
                    {rangeToString(activity.PlayerCount) + " ppl"}
                </div>
        </div>
    </div>)
}