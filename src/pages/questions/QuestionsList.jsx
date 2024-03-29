import React from "react"
import QuestionPreview from "./QuestionPreview";
import "./QuestionsList.css"

// The section that lists the questions pulled from the database
export default function QuestionsList({questions, openReport, admin}) {

    return ( <div className={"divStyle"}>
        {questions.map((question, i) => {
            return <QuestionPreview key={i} question={question} openReport={openReport} admin={admin}/>
        })}
        </div>
    )
}