import React from "react"
import "./QuestionPreview.css"
import { DataStore } from 'aws-amplify/datastore';
import { Question } from "../../models";

// The preview for a single question pulled from the database
export default function QuestionPreview({question, openReport, admin}) {

    const updateLikeCount = async(event, changeVal) => {
        if (!admin) {
            event.preventDefault();
            if (changeVal > 0 || question.likes > 0) {
                await DataStore.save(
                    Question.copyOf(question, updated => {
                        updated.likes = question.likes + changeVal;
                    })
                );
            }
        }
    }

    function onClick() {
        if (admin) {
            admin(question.id)
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
        height: "100%"
    }

    const questionStyle = {fontSize: "3vmin", width: "95%", maxHeight: "65%", overflowY: "auto"}

    const bottomBar = {display: "flex", width: "100%", minHeight: "15%", margin: "auto 0 1% 0"}

    const likeNumStyle = {fontSize: "3.5vmin", flexGrow: 1, textAlign: "left", width: "10%"}

    const iconWithText = {display: "flex", width: "auto", flexGrow: 1, justifyContent: "center"}

    const icon = {margin: "auto 5% auto auto", flexShrink: 1, width: "3vmin", height: "auto"}

    const endorseStyle = {position: "absolute", top: "0", right: "0", width: "3vmin"}

    return ( <div className={"outerDivStyle2"}>
            <div style={innerDivStyle} onClick={onClick}>
                <div style={questionStyle}>
                    {question.question}
                </div>
                {question.endorsed && <img style={endorseStyle} src={"endorseplaceholder.png"} alt={"endorsed"}/>}
                <div style={bottomBar}>
                    <div style={iconWithText}>
                        <img style={icon} src={"likeplaceholder.png"} alt={"duration"} onClick={(thisEvent) => updateLikeCount(thisEvent, 1)}/>
                        <img style={icon} src={"dislikeplaceholder.png"} alt={"duration"} onClick={(thisEvent) => updateLikeCount(thisEvent, -1)}/>
                        <div style={likeNumStyle}>
                            {question.likes}
                        </div>
                    </div>
                    {!admin && <button className={"reportStyle"} onClick={() => openReport(question.id)}> Report </button>}
                </div>
            </div>
        </div>)
}