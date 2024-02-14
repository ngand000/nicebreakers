import React, {useState} from 'react';
import { DataStore } from 'aws-amplify/datastore';
import {Question} from '../../../models';
import { Amplify } from 'aws-amplify';
import config from '../../../aws-exports.js';
import '../UploadPages.css';

Amplify.configure(config);

DataStore.configure(config);

const UploadPage = (props) => {
    
    const [textboxPlaceHolder, questionFocusToggler] = useState("Enter your Question here!");

    const [questionText, questionTextSetter] = useState("");
    const [authorVal, authorValSetter] = useState("");
    const [ageMin, ageMinSetter] = useState(0);
    const [ageMax, ageMaxSetter] = useState(1);

    const filterNames = ["questionText", "authorVal", "ageMin", "ageMax"];

    //pre: none
    //post: none
    //args: none
    //returns: none, toggles the descripton promp preview on click
    function togglePlaceHolder() {
        if (textboxPlaceHolder === "") {
            questionFocusToggler("Enter your Question here!");
        } else {
            questionFocusToggler("");
        }
    }

    //pre: event and varSetter are non-null
    //post: none
    //args: event, the element event that caused update
    //      varSetter, the respective setter method for var made by
    //                 useState
    //returns: null for invalid input,
    //         else updates the value of var with the respective element's value
    const inputHandler = (event, varSetter) => {
        if (event == null || varSetter == null) {
            return null;
        }
        varSetter(event.target.value);
    };

    //pre: state varibles are non-null
    //post: none
    //args: none
    //returns: checks through state variables and gives
    //         popup for any invalid values, returns true
    //         if all filters are valid and false otherwise
    function filterChecks() {
        var passesChecks = true;
        filterNames.forEach(function(filter) {
            switch(filter) {
                case "questionText":
                    if (questionText === "") {
                        alert("Question cannot be blank");
                        passesChecks = false;
                    }
                    break;
                case "authorVal":
                    if (authorVal === "") {
                        alert("Author field cannot be blank");
                        passesChecks = false;
                    }
                    break;
                case "ageMin":
                    if (Number(ageMin) < 0) {
                        alert("Minimum age must be at least 0");
                        passesChecks = false;
                    } else if (Number(ageMin) > 99) {
                        alert("Minimum age cannot be over 99");
                        passesChecks = false;
                    }
                    break;
                case "ageMax":
                    if (Number(ageMax) < 0) {
                        alert("Maximum age must be at least 0");
                        passesChecks = false;
                    } else if (Number(ageMax) > 99) {
                        alert("Maximum age cannot be over 99");
                        passesChecks = false;
                    } else if (Number(ageMin) > Number(ageMax)) {
                        alert("Minimum age cannot be larger than max age");
                        passesChecks = false;
                    }
                    break;
                default:
                    console.log("Unknown input");
                    passesChecks = false;
            }
        });
        return passesChecks;
    }

    //pre: none
    //post: none
    //args: none
    //return, true if pushes new Question to remote database
    //        populated with user inputs
    //        false if push failed
    const queryPush = async() => {
        try {
            await DataStore.save(
                new Question({
                    question: questionText,
                    likes: "0",
                    ageRange: [Number(ageMin), Number(ageMax)],
                    endorsed: false,
                    tags: null,
                    author: authorVal,
                })
            );
            alert("Uploaded Successfully");
            return true;
        } catch (error) {
            alert("Error in submitting question");
            return false;
        }
    };

    //pre: event is non-null
    //post: none
    //args: none
    //returns: calls the filter check and if all
    //         checks pass, submits query to database
    //         add redirects to respective viewing page
    const checkSubmit = (event) => {
        event.preventDefault();
        if (filterChecks()) {
            if (queryPush()) {
                window.location.href = "/questions";
            }
        }
    };

    //pre: none
    //post: none
    //args: none
    //returns: redirects to respective viewing page
    const goBack = (event) => {
        event.preventDefault();
        window.location.href = "/questions";
    }

    return (
        <div>
            <div className="header">
                <img src={"logoplaceholder.png"} alt={"logo"}/>
                <text className="title">Upload Question</text>
            </div>
            <form id ="uploadQuestion" style={{width: "80%", marginLeft: "10%"}}>
                <div className="color-box" style={{backgroundColor: "rgb(255,252,123)"}}>
                    <label className="feild-entry-title" htmlFor={"authorName"}>Question:</label>
                    <textarea id="question-entry-box" className="question-entry-box" name={"Question"} form={"uploadQuestion"} placeholder={textboxPlaceHolder} onFocus={togglePlaceHolder} onBlur={togglePlaceHolder} value={questionText} onChange={(thisEvent) => inputHandler(thisEvent, questionTextSetter)}></textarea>
                </div>
                <br/>
                <div className="color-box" style={{backgroundColor: "rgb(182,255,123)"}}>
                    <label className="feild-entry-title" htmlFor={"authorName"}>Author:</label>
                    <input className="author-field" type={"text"} id={"author"} value={authorVal} onChange={(thisEvent) => inputHandler(thisEvent, authorValSetter)}/>
                </div>
                <br/>
                <div className="color-box" style={{backgroundColor: "rgb(255,94,94)"}}>
                    <label className="feild-entry-title" style={{marginLeft: "2vw"}} htmlFor={"ageRange"}>Age Range:</label>
                    <ul style={{margin: "2vh 0 2vh 2vw", padding: "0", display: "flex", listStyleType: "none"}}>
                        <li><div className="color-box" style={{backgroundColor: "rgb(255,187,89)", display: "inline-block"}}><input className="small-input" type="number" min="0" max="100" id={"minAge"} value={ageMin} onChange={(thisEvent) => inputHandler(thisEvent, ageMinSetter)}/></div></li>
                        <li><div className="feild-entry-title" style={{display: "inline-block", paddingTop: "5vh"}}>to</div></li>
                        <li><div className="color-box" style={{backgroundColor: "rgb(182,255,123)", display: "inline-block"}}><input className="small-input" type="number" min="1" max="100" id={"maxAge"} value={ageMax} onChange={(thisEvent) => inputHandler(thisEvent, ageMaxSetter)}/></div></li>
                    </ul>
                </div>
                <br/>
                <div className="upload-button-bounder">
                    <button className="uploadButtonFilterStyle" style={{backgroundColor: "rgb(255,94,94)"}} onClick={(thisEvent) => goBack(thisEvent)}>Back</button>
                    <button className="uploadButtonFilterStyle" onClick={(thisEvent) => checkSubmit(thisEvent)}>Upload</button>
                </div>
            </form>
        </div>
    )
}

export default UploadPage;