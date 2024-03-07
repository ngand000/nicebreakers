import React from "react"
import "./ActivityPreview.css"
import {useNavigate} from "react-router-dom"

// The preview for a single activity pulled from the database
export default function ActivityPreview({activity, admin}) {

    const navigate = useNavigate()

    function rangeToString(r) {
        return (r && (r[0] === r[1] ? r[0] : r[0] + "-" + r[1]))
    }

    function formatExp(n) {
        let ns = n.toExponential().split("e")
        return ns[0].substr(0, 1) + "e" + ns[1].substr(1)
    }

    function onClick() {
        if (admin) {
            admin(activity.id)
        } else {
            navigate("post?id=" + activity.id)
        }
    }

    const innerDivStyle = {
        border: "1px",
        borderStyle: "solid",
        borderColor: "rgb(200 200 200)",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        justifyContent: "flex-end",
        height: "100%"
    }

    const nameStyle = {display: "flex", fontSize: "4vmin", textDecoration: "underline", width: "100%", margin: "0 0 0 0"}

    const abstractStyle = {display: "flex", fontSize: "2.5vmin", textAlign: "left", width: "100%", height: "60%", maxHeight: "60%", overflowY: "auto", overflowX: "hidden", marginTop: "0"}

    const bottomBar = {display: "flex", width: "100%", height: "15%", margin: "auto 0 5% 0", overflowX: "hidden", overflowY: "hidden"}

    const likeNumStyle = {fontSize: "3.5vmin", flexGrow: 1, textAlign: "left", width: "10%"}

    const iconWithText = {display: "flex", width: "auto", flexGrow: 1, justifyContent: "center"}

    const icon = {margin: "auto 5% auto auto", flexShrink: 1, width: "3vmin", height: "auto"}

    const rangeStyle = {fontSize: "3vmin", whiteSpace: "nowrap", overflow: "hidden", padding: "0.5vmin 0 0 0", flexGrow: 0}

    const endorseStyle = {position: "absolute", top: "2%", right: "2%", width: "3vmin"}

    return ( <div className={"outerDivStyle"} onClick={onClick}>
            <div style={innerDivStyle}>
                <div style={nameStyle}>
                    {activity.name}
                </div>
                <p style={abstractStyle}>
                    {activity.abstract}
                </p>
                {activity.endorsed && <img style={endorseStyle} src={"endorseplaceholder.png"} alt={"endorsed"}/>}
                <div style={bottomBar}>
                    <div style={iconWithText}>
                        <img style={icon} src={"likeplaceholder.png"} alt={"duration"}/>
                        <div style={likeNumStyle}>
                            {activity.likes < 0 ? 0 : (activity.likes > 10000 ? formatExp(activity.likes) : activity.likes)}
                        </div>
                    </div>
                    <div style={iconWithText}>
                        <img style={icon} src={"clockplaceholder.png"} alt={"duration"}/>
                        <div style={rangeStyle}>
                            {rangeToString(activity.duration)}
                        </div>
                    </div>
                    <div style={iconWithText}>
                        <img style={icon} src={"personclipartpng.png"} alt={"ppl"}/>
                        <div style={rangeStyle}>
                            {rangeToString(activity.playerCount)}
                    </div>
                    </div>
                </div>
            </div>
        </div>)
}