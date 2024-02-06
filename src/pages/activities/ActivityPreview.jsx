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

    const bottomBar = {display: "flex", width: "100%", height: "15%", position: "absolute", bottom: "4%"}

    /*const likeCountStyle = {flexGrow: 1, textAlign: "center", width: "20%", padding: "0.25vmin 0 0 0", position: "relative", border: "solid"}*/

    /*const likeIcon = {height: "7vmin", position: "absolute", right: "5%"}*/

    const likeNumStyle = {fontSize: "3.5vmin", flexGrow: 1, textAlign: "center", width: "10%"/*, bottom: "5%", position: "absolute"*/}

    const iconWithText = {display: "flex", width: "40%", flexGrow: 1, flexShrink: 1, justifyContent: "center"}

    const icon = {margin: "0 5% 0 0%", flexShrink: 1}

    const rangeStyle = {fontSize: "3vmin", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", padding: "0.5vmin 0 0 0"}

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
                    {/*<div style={likeCountStyle}>
                        <img style={likeIcon} src={"likeplaceholder.png"} alt={"likes"}/>*/}
                        <div style={likeNumStyle}>{activity.Likes}</div>
                    {/*</div>*/}
                    <div style={iconWithText}>
                        <img style={icon} src={"clockplaceholder.png"} alt={"duration"}/>
                        <div style={rangeStyle}>
                            {rangeToString(activity.Duration)}
                        </div>
                    </div>
                    <div style={iconWithText}>
                        <img style={icon} src={"personclipartpng.png"} alt={"ppl"}/>
                        <div style={rangeStyle}>
                            {rangeToString(activity.PlayerCount)}
                    </div>
                    </div>
                </div>
            </div>
        </div>)
}