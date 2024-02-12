import React, {useState} from 'react';
import '../UploadPages.css';

const UploadPage = (props) => {
    
    const [textboxPlaceHolder, questionFocusToggler] = useState("Enter your Question here!");

    const [questionText, questionTextSetter] = useState("");
    const [authorVal, authorValSetter] = useState("");
    const [ageMin, ageMinSetter] = useState("");
    const [ageMax, ageMaxSetter] = useState("");

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
        filterNames.forEach(function(filter) {
            switch(filter) {
                case "questionText":
                    if (questionText === "") {
                        alert("Question cannot be blank");
                        return false;
                    }
                    break;
                case "authorVal":
                    if (authorVal === "") {
                        alert("Author field cannot be blank");
                        return false;
                    }
                    break;
                case "ageMin":
                    if (ageMin < 0) {
                        alert("Minimum age must be at least 0");
                        passesChecks = false;
                    } else if (ageMin > 99) {
                        alert("Minimum age cannot be over 99");
                        passesChecks = false;
                    }
                    break;
                case "ageMax":
                    if (ageMax < 0) {
                        alert("Maximum age must be at least 0");
                        passesChecks = false;
                    } else if (ageMax > 99) {
                        alert("Maximum age cannot be over 99");
                        passesChecks = false;
                    } else if (ageMin > ageMax) {
                        alert("Minimum age cannot be larger than max age");
                        passesChecks = false;
                    }
                    break;
                default:
                    console.log("Unknown input");
            }
        });
        return true;
    }

    //pre: event is non-null
    //post: none
    //args: none
    //returns: calls the filter check and if all
    //         checks pass, submits query to database
    //         add redirects to respective viewing page
    const checkSubmit = (event) => {
        event.preventDefault();
        if (filterChecks()) {
            //TODO: Put function call to Database Query Here
            window.location.href = "/questions";
        }
    };

    return (
        <div>
            <div className="header">
                {/* TODO: Make the logo render properly and redirect to Questions Page on click*/}
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
                    <button className="uploadButtonFilterStyle" onClick={(thisEvent) => checkSubmit(thisEvent)}>Upload</button>
                </div>
            </form>
        </div>
    )
}

export default UploadPage;