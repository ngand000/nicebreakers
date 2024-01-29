import React from "react"
import "./ActivityPreview.css"
import {useNavigate} from "react-router-dom"

// The preview for a single activity pulled from the database
export default function ActivityPreview({activity}) {

    const navigate = useNavigate()

    function rangeToString(r) {
        return (r[0] === r[1] ? r[0] : r[0] + "-" + r[1])
    }


    const innerDivStyle = {
        border: "1px",
        borderStyle: "solid",
        borderColor: "rgb(200 200 200)",
        borderRadius: "10px",
        position: "relative",
        height: "100%"
    }



    const nameStyle = {fontSize: "4vmin", textDecoration: "underline", width: "100%"}

    const abstractStyle = {fontSize: "3vmin", textAlign: "center", width: "100%"}

    const bottomBar = {display: "flex", width: "100%", height: "10%", position: "absolute", bottom: "4%"}

    const likeCountStyle = {fontSize: "3.5vmin", flexGrow: 1, textAlign: "center"}

    const iconWithText = {display: "flex", width: "40%", flexGrow: 1, flexShrink: 1, justifyContent: "center"}

    const icon = {margin: "0 2% 0 5%", height: "100%", flexShrink: 1}

    const durationStyle = {fontSize: "3vmin"}

    const peopleCountStyle = {fontSize: "3vmin"}

    return ( <div className={"outerDivStyle"} onClick={() => {navigate("post?id=" + activity.id)}}>
            <div style={innerDivStyle}>
                <div style={nameStyle}>
                    {activity.Name}
                </div>
                <div style={{flexBasis: "100%", height: 0}} />
                <div style={abstractStyle}>
                    {activity.Abstract}
                </div>
                <div style={bottomBar}>
                    <div style={likeCountStyle}>{activity.Likes}</div>
                    <div style={iconWithText}>
                        <img style={icon} src={"clockplaceholder.png"} alt={"duration"}/>
                        <div style={durationStyle}>
                            {rangeToString(activity.Duration)}
                        </div>
                    </div>
                    <div style={iconWithText}>
                        <img style={icon} src={"personclipartpng.png"} alt={"ppl"}/>
                        <div style={peopleCountStyle}>
                            {rangeToString(activity.PlayerCount)}
                    </div>
                    </div>
                </div>
            </div>
        </div>)
}