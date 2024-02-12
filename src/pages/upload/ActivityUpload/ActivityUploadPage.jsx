import React, {useState} from 'react';
import UploadButton from "../UploadButton.jsx";
import '../UploadPages.css';

const UploadPage = (props) => {

    const [textboxPlaceHolder, questionFocusToggler] = useState("Enter your Description here!");

    const [activityName, activityNameSetter] = useState("");
    const [activityDescription, activityDescriptionSetter] = useState("");
    const [authorVal, authorValSetter] = useState("");
    const [playerCountMin, playerCountMinSetter] = useState(1);
    const [playerCountMax, playerCountMaxSetter] = useState(1);
    const [durationMin, durationMinSetter] = useState(0);
    const [durationMax, duarationMaxSetter] = useState(1);
    const [ageMin, ageMinSetter] = useState(0);
    const [ageMax, ageMaxSetter] = useState(1);

    const filterNames = ["activityName", "activityDescription", "authorVal", "playerCountMin", "playerCountMax", "durationMin", "durationMax", "ageMin", "ageMax"];

    //pre: none
    //post: none
    //args: none
    //returns: none, toggles the descripton promp preview on click
    function togglePlaceHolder() {
        if (textboxPlaceHolder === "") {
            questionFocusToggler("Enter your Description here!");
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
                case "activityName":
                    if (activityName === "") {
                        alert("Activity Name cannot be blank");
                        passesChecks = false;
                    }
                    break;
                case "activityDescription":
                    if (activityDescription === "") {
                        alert("Activity Description cannot be blank");
                        passesChecks = false;
                    }
                    break;
                case "authorVal":
                    if (authorVal === "") {
                        alert("Author field cannot be blank");
                        passesChecks = false;
                    }
                    break;
                case "playerCountMin":
                    if (playerCountMin < 1) {
                        alert("Must have at least one player in min field");
                        passesChecks = false;
                    } else if (playerCountMin > 99) {
                        alert("Cannot have over 99 players");
                        passesChecks = false;
                    }
                    break;
                case "playerCountMax":
                    console.log(playerCountMin);
                    console.log(playerCountMax);
                    if (playerCountMax < 1) {
                        alert("Must have at least one player in max field");
                        passesChecks = false;
                    } else if (playerCountMax > 99) {
                        alert("Cannot have over 99 players");
                        passesChecks = false;
                    } else if (playerCountMin > playerCountMax) {
                        alert("Min players cannot be larger than max players");
                        passesChecks = false;
                    }
                    break;
                case "durationMin":
                    console.log(durationMin);
                    if (durationMin < 0) {
                        alert("Minimum duration must be at least 0 minutes");
                        passesChecks = false;
                    } else if (durationMin > 60) {
                        alert("Minimum duration cannot be over 60 minutes");
                        passesChecks = false;
                    }
                    break;
                case "durationMax":
                    if (durationMax < 0) {
                        alert("Maximum duration must be at least 0 minutes");
                        passesChecks = false;
                    } else if (durationMax > 60) {
                        alert("Maximum duration cannot be over 60 minutes");
                        passesChecks = false;
                    } else if (durationMin > durationMax) {
                        alert("Minimum duration cannot be larger than max duration");
                        passesChecks = false;
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
        return passesChecks;
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
            window.location.href = "/";
        }
    };

    return (
        <div>
            <div className="header">
                {/* TODO: Make the logo render properly and redirect to Activities Page on click*/}
                <img src={"logoplaceholder.png"} alt={"logo"}/>
                <text className="title">Upload Activity</text>
            </div>
            <form id ="uploadActivity" style={{width: "80%", marginLeft: "10%"}}>
                <div className="name-entry-block">
                    <label className="feild-entry-title" for={"activityName"}>Activity Name:</label>
                    <input className="name-entry-box" type={"text"} id={"activity"} value={activityName} onChange={(thisEvent) => inputHandler(thisEvent, activityNameSetter)}/>
                </div>
                <br/>
                <div className="color-box" style={{backgroundColor: "rgb(255,252,123)"}}>
                    <label className="feild-entry-title" htmlFor={"activityDescription"}>Description:</label>
                    <textarea id="question-entry-box" className="question-entry-box" style={{width: "95%", height: "20vh"}} name={"Description"} form={"uploadActivity"} placeholder={textboxPlaceHolder} onFocus={togglePlaceHolder} onBlur={togglePlaceHolder} value={activityDescription} onChange={(thisEvent) => inputHandler(thisEvent, activityDescriptionSetter)}></textarea>
                </div>
                <br/>
                <div className="color-box" style={{backgroundColor: "rgb(182,255,123)"}}>
                    <label className="feild-entry-title" htmlFor={"authorName"}>Author:</label>
                    <input className="author-field" type={"text"} id={"author"} value={authorVal} onChange={(thisEvent) => inputHandler(thisEvent, authorValSetter)}/>
                </div>
                <br/>
                <div className="color-box" style={{backgroundColor: "rgb(215, 109, 236)"}}>
                    <label className="feild-entry-title" style={{marginLeft: "2vw"}} htmlFor={"ageRange"}>Player Count:</label>
                    <ul style={{margin: "2vh 0 2vh 2vw", padding: "0", display: "flex", listStyleType: "none"}}>
                        <li><div className="color-box" style={{backgroundColor: "rgb(255,94,94)", display: "inline-block"}}><input className="small-input" type="number" min="1" max="99" id={"minPlayers"} value={playerCountMin} onChange={(thisEvent) => inputHandler(thisEvent, playerCountMinSetter)}/></div></li>
                        <li><div className="feild-entry-title" style={{display: "inline-block", paddingTop: "5vh"}}>to</div></li>
                        <li><div className="color-box" style={{backgroundColor: "rgb(169,246,187)", display: "inline-block"}}><input className="small-input" type="number" min="1" max="99" id={"maxPlayers"} value={playerCountMax} onChange={(thisEvent) => inputHandler(thisEvent, playerCountMaxSetter)}/></div></li>
                    </ul>
                </div>
                <br/>
                <div className="color-box" style={{backgroundColor: "rgb(189,250,248)"}}>
                    <label className="feild-entry-title" style={{marginLeft: "2vw"}} htmlFor={"ageRange"}>Duration (min):</label>
                    <ul style={{margin: "2vh 0 2vh 2vw", padding: "0", display: "flex", listStyleType: "none"}}>
                        <li><div className="color-box" style={{backgroundColor: "rgb(255,252,123)", display: "inline-block"}}><input className="small-input" type="number" min="0" max="60" id={"minTime"} value={durationMin} onChange={(thisEvent) => inputHandler(thisEvent, durationMinSetter)}/></div></li>
                        <li><div className="feild-entry-title" style={{display: "inline-block", paddingTop: "5vh"}}>to</div></li>
                        <li><div className="color-box" style={{backgroundColor: "rgb(148, 148, 242)", display: "inline-block"}}><input className="small-input" type="number" min="1" max="60" id={"maxTime"} value={durationMax} onChange={(thisEvent) => inputHandler(thisEvent, duarationMaxSetter)}/></div></li>
                    </ul>
                </div>
                <br/>
                <div className="color-box" style={{backgroundColor: "rgb(255,94,94)"}}>
                    <label className="feild-entry-title" style={{marginLeft: "2vw"}} htmlFor={"ageRange"}>Age Range:</label>
                    <ul style={{margin: "2vh 0 2vh 2vw", padding: "0", display: "flex", listStyleType: "none"}}>
                        <li><div className="color-box" style={{backgroundColor: "rgb(255,187,89)", display: "inline-block"}}><input className="small-input" type="number" min="0" max="99" id={"minAge"} value={ageMin} onChange={(thisEvent) => inputHandler(thisEvent, ageMinSetter)}/></div></li>
                        <li><div className="feild-entry-title" style={{display: "inline-block", paddingTop: "5vh"}}>to</div></li>
                        <li><div className="color-box" style={{backgroundColor: "rgb(182,255,123)", display: "inline-block"}}><input className="small-input" type="number" min="1" max="99" id={"maxAge"} value={ageMax} onChange={(thisEvent) => inputHandler(thisEvent, ageMaxSetter)}/></div></li>
                    </ul>
                </div>
                <br/>
                <div className="color-box" style={{backgroundColor: "rgb(169,246,187)"}}>
                    <label className="feild-entry-title" htmlFor={"photos"}>Upload photos:</label>
                    <input className="small-input" type="file" id="activityPics" name="activityPics"/>
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