import React from "react"
import "./QuestionPreview.css"
import {useNavigate} from "react-router-dom"

// The preview for a single activity pulled from the database
export default function QuestionPreview({question}) {

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



    const questionStyle = {fontSize: "4vmin", width: "100%"}

    const abstractStyle = {fontSize: "2.5vmin", textAlign: "center", width: "100%", height: "60%", maxHeight: "60%", overflowY: "hidden"}

    const bottomBar = {display: "flex", width: "100%", height: "15%", position: "absolute", bottom: "4%"}

    /*const likeCountStyle = {flexGrow: 1, textAlign: "center", width: "20%", padding: "0.25vmin 0 0 0", position: "relative", border: "solid"}*/

    /*const likeIcon = {height: "7vmin", position: "absolute", right: "5%"}*/

    const likeNumStyle = {fontSize: "3.5vmin", flexGrow: 1, textAlign: "left", width: "10%"/*, bottom: "5%", position: "absolute"*/}

    const iconWithText = {display: "flex", width: "auto", flexGrow: 1, justifyContent: "center"}

    const icon = {margin: "auto 5% auto auto", flexShrink: 1, width: "3vmin", height: "auto"}

    const rangeStyle = {fontSize: "3vmin", whiteSpace: "nowrap", overflow: "hidden", padding: "0.5vmin 0 0 0", flexGrow: 0}

    const endorseStyle = {position: "absolute", top: "2%", right: "2%", width: "3vmin"}

    return ( <div className={"outerDivStyle2"}>
            <div style={innerDivStyle}>
                <div style={questionStyle}>
                    {question.question}
                </div>
                <div style={{flexBasis: "100%", height: 0}} />
                {/*<div style={abstractStyle}>*/}
                {/*    {activity.abstract}*/}
                {/*</div>*/}
                {question.endorsed && <img style={endorseStyle} src={"endorseplaceholder.png"} alt={"endorsed"}/>}
                <div style={bottomBar}>
                    <div style={iconWithText}>
                        <img style={icon} src={"likeplaceholder.png"} alt={"duration"}/>
                        <div style={likeNumStyle}>
                            {question.likes}
                        </div>
                {/*    </div>*/}
                {/*    <div style={iconWithText}>*/}
                {/*        <img style={icon} src={"clockplaceholder.png"} alt={"duration"}/>*/}
                {/*        <div style={rangeStyle}>*/}
                {/*            {rangeToString(activity.duration)}*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div style={iconWithText}>*/}
                {/*        <img style={icon} src={"personclipartpng.png"} alt={"ppl"}/>*/}
                {/*        <div style={rangeStyle}>*/}
                {/*            {rangeToString(activity.playerCount)}*/}
                {/*    </div>*/}
                    </div>
                </div>
            </div>
        </div>)
}