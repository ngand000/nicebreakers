import React, {useState} from 'react';
import { DataStore } from 'aws-amplify/datastore';
import { Activity } from '../../../models';
import {useNavigate} from "react-router-dom"
import { Amplify } from 'aws-amplify';
import { uploadData } from 'aws-amplify/storage';
import { remove } from 'aws-amplify/storage';
import config from '../../../aws-exports.js';
import '../UploadPages.css';

Amplify.configure(config);

DataStore.configure(config);

const UploadPage = (props) => {

    const [abstractPlaceHolder, abstractToggler] = useState("Enter your Abstract here!");
    const [descriptionPlaceHolder, descriptionToggler] = useState("Enter your Description here!");

    const [activityName, activityNameSetter] = useState("");
    const [activityAbstract, activityAbstractSetter] = useState("");
    const [activityDescription, activityDescriptionSetter] = useState("");
    const [authorVal, authorValSetter] = useState("");
    const [playerCountMin, playerCountMinSetter] = useState(1);
    const [playerCountMax, playerCountMaxSetter] = useState(1);
    const [durationMin, durationMinSetter] = useState(0);
    const [durationMax, duarationMaxSetter] = useState(1);
    const [ageMin, ageMinSetter] = useState(0);
    const [ageMax, ageMaxSetter] = useState(1);
    const [userImages, userImageSetter] = useState([]);
    const [userImageTypes, userImageTypesSetter] = useState([]);

    const navigate = useNavigate()


    const filterNames = ["activityName", "activityAbstract", "activityDescription", "authorVal", "playerCountMin", "playerCountMax", "durationMin", "durationMax", "ageMin", "ageMax"];

    //pre: none
    //post: none
    //args: toggler, the useState variable toggler to use
    //      placeHolder, the useStatePlaceHolder to use
    //      msg, the message to write
    //returns: none, toggles the descripton promp preview on click
    const togglePlaceHolder = (toggler, placeHolder, msg) => {
        if (placeHolder === "") {
            toggler(msg);
        } else {
            toggler("");
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

    //pre: event is non-null
    //post: none
    //args: event, the element event that caused the file update
    //returns: stores the event's file into proper useState variable
    //         or has an alert is filetype is invalid
    const handleFileInput = (event) => {
        if (event == null) {
            return null;
        }
        const currFiles = event.target.files;
        const tempFiles = [];
        const tempFileTypes = [];
        for (let i = 0; i < currFiles.length; i++) {
            const currFile = currFiles[i];
            if (currFile && currFile.type.startsWith('image/')) {
                tempFiles.push(currFile);
                tempFileTypes.push(String(currFile.type).split('image/').pop());
            } else {
                alert(currFile.name + " is not an image file (jpeg, png, etc)");
            }
        }
        userImageSetter(tempFiles);
        userImageTypesSetter(tempFileTypes);
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
                case "activityAbstract":
                        if (activityAbstract === "") {
                            alert("Activity Abstract cannot be blank");
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
                    if (Number(playerCountMin) < 1) {
                        alert("Must have at least one player in min field");
                        passesChecks = false;
                    } else if (Number(playerCountMin) > 99) {
                        alert("Cannot have over 99 players");
                        passesChecks = false;
                    }
                    break;
                case "playerCountMax":
                    if (Number(playerCountMax) < 1) {
                        alert("Must have at least one player in max field");
                        passesChecks = false;
                    } else if (Number(playerCountMax) > 99) {
                        alert("Cannot have over 99 players");
                        passesChecks = false;
                    } else if (Number(playerCountMin) > Number(playerCountMax)) {
                        alert("Min players cannot be larger than max players");
                        passesChecks = false;
                    }
                    break;
                case "durationMin":
                    if (Number(durationMin) < 0) {
                        alert("Minimum duration must be at least 0 minutes");
                        passesChecks = false;
                    } else if (Number(durationMin) > 60) {
                        alert("Minimum duration cannot be over 60 minutes");
                        passesChecks = false;
                    }
                    break;
                case "durationMax":
                    if (Number(durationMax) < 0) {
                        alert("Maximum duration must be at least 0 minutes");
                        passesChecks = false;
                    } else if (Number(durationMax) > 60) {
                        alert("Maximum duration cannot be over 60 minutes");
                        passesChecks = false;
                    } else if (Number(durationMin) > Number(durationMax)) {
                        alert("Minimum duration cannot be larger than max duration");
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
    //return, true if pushes new Activity to remote database
    //        populated with user inputs
    //        and false if push failed
    const queryPush = async() => {
        let currActivity = null;
        let i = 0;
        try {
            currActivity = await DataStore.save(
                new Activity({
                    name: activityName,
                    description: activityDescription,
                    Comments: null,
                    author: authorVal,
                    abstract: activityAbstract,
                    likes: 0,
                    fileTypes: userImageTypes,
                    captions: [],
                    playerCount: [Number(playerCountMin), Number(playerCountMax)],
                    duration: [Number(durationMin), Number(durationMax)],
                    ageRange: [Number(ageMin), Number(ageMax)],
                    endorsed: false,
                    setup: 0,
                    tags: null,
                    timesReported: 0,
                })
            );
            for (i = 0; i < userImages.length; i++) {
                await uploadData({
                    key: currActivity.id + "img" + i + "." + userImageTypes[i],
                    data: userImages[i],
                }).result;
            }
            alert("Uploaded Successfully");
            return true;
        } catch (error) {
            console.log(error);
            for (let j = 0; j < i; j++) {
                await remove({key: currActivity.id + "img" + j + "." + userImageTypes[j]});
            }
            if (currActivity) {
                await DataStore.delete(currActivity);
            }
            alert("Error in submitting activity");
            return false;
        }
    };

    //pre: event is non-null
    //post: none
    //args: none
    //returns: calls the filter check and if all
    //         checks pass, submits query to database
    //         add redirects to respective viewing page
    const checkSubmit = async(event) => {
        event.preventDefault();
        if (filterChecks()) {
            const queryStatus = await queryPush();
            if (queryStatus) {
                window.location.href = "/";
            }
        }
    };

    //pre: none
    //post: none
    //args: none
    //returns: redirects to respective viewing page
    const goBack = (event) => {
        event.preventDefault();
        navigate("/");
    }

    const logoStyle = {width: "15vmin", margin: "1vw 2vw 0 0"}

    return (
        <div>
            <div className="header">
                <a href={'/'}> <img src={"../../../../logoplaceholder.png"} alt={"logo"} style={logoStyle}/> </a>
                <h1 className="title">Upload Activity</h1>
            </div>
            <form id ="uploadActivity" style={{width: "80%", marginLeft: "10%"}}>
                <div className="color-box" style={{backgroundColor: "rgb(48,139,255)"}}>
                    <label className="feild-entry-title" style={{marginLeft: "4vw"}} for={"activityName"}>Activity Name:</label>
                    <input className="name-entry-box" type={"text"} id={"activity"} value={activityName} onChange={(thisEvent) => inputHandler(thisEvent, activityNameSetter)}/>
                </div>
                <br/>
                <div className="color-box" style={{backgroundColor: "rgb(79,239,255)"}}>
                    <label className="feild-entry-title" htmlFor={"activityDescription"}>Abstract:</label>
                    <textarea id="abstract-entry-box" className="question-entry-box" style={{width: "95%", height: "20vh"}} name={"Abstract"} form={"uploadAbstract"} placeholder={abstractPlaceHolder} onFocus={() => togglePlaceHolder(abstractToggler, abstractPlaceHolder, "Enter your Abstract here!")} onBlur={() => togglePlaceHolder(abstractToggler, abstractPlaceHolder, "Enter your Abstract here!")} value={activityAbstract} onChange={(thisEvent) => inputHandler(thisEvent, activityAbstractSetter)}></textarea>
                </div>
                <br/>
                <div className="color-box" style={{backgroundColor: "rgb(73,171,252)"}}>
                    <label className="feild-entry-title" htmlFor={"activityDescription"}>Description:</label>
                    <textarea id="question-entry-box" className="question-entry-box" style={{width: "95%", height: "20vh"}} name={"Description"} form={"uploadActivity"} placeholder={descriptionPlaceHolder} onFocus={() => togglePlaceHolder(descriptionToggler, descriptionPlaceHolder, "Enter your Description here!")} onBlur={() => togglePlaceHolder(descriptionToggler, descriptionPlaceHolder, "Enter your Description here!")} value={activityDescription} onChange={(thisEvent) => inputHandler(thisEvent, activityDescriptionSetter)}></textarea>
                </div>
                <br/>
                <div className="color-box" style={{backgroundColor: "rgb(120,193,255)"}}>
                    <label className="feild-entry-title" htmlFor={"authorName"}>Author:</label>
                    <input className="author-field" type={"text"} id={"author"} value={authorVal} onChange={(thisEvent) => inputHandler(thisEvent, authorValSetter)}/>
                </div>
                <br/>
                <div className="color-box" style={{backgroundColor: "rgb(48,139,255)"}}>
                    <label className="feild-entry-title" style={{marginLeft: "2vw"}} htmlFor={"ageRange"}>Player Count:</label>
                    <ul style={{margin: "2vh 0 2vh 2vw", padding: "0", display: "flex", listStyleType: "none"}}>
                        <li><div className="color-box" style={{backgroundColor: "rgb(148,148,148)", display: "inline-block"}}><input className="small-input" type="number" min="1" max="99" id={"minPlayers"} value={playerCountMin} onChange={(thisEvent) => inputHandler(thisEvent, playerCountMinSetter)}/></div></li>
                        <li><div className="feild-entry-title" style={{display: "inline-block", paddingTop: "5vh"}}>to</div></li>
                        <li><div className="color-box" style={{backgroundColor: "rgb(148,148,148)", display: "inline-block"}}><input className="small-input" type="number" min="1" max="99" id={"maxPlayers"} value={playerCountMax} onChange={(thisEvent) => inputHandler(thisEvent, playerCountMaxSetter)}/></div></li>
                    </ul>
                </div>
                <br/>
                <div className="color-box" style={{backgroundColor: "rgb(79,239,255)"}}>
                    <label className="feild-entry-title" style={{marginLeft: "2vw"}} htmlFor={"ageRange"}>Duration (min):</label>
                    <ul style={{margin: "2vh 0 2vh 2vw", padding: "0", display: "flex", listStyleType: "none"}}>
                        <li><div className="color-box" style={{backgroundColor: "rgb(148,148,148)", display: "inline-block"}}><input className="small-input" type="number" min="0" max="60" id={"minTime"} value={durationMin} onChange={(thisEvent) => inputHandler(thisEvent, durationMinSetter)}/></div></li>
                        <li><div className="feild-entry-title" style={{display: "inline-block", paddingTop: "5vh"}}>to</div></li>
                        <li><div className="color-box" style={{backgroundColor: "rgb(148,148,148)", display: "inline-block"}}><input className="small-input" type="number" min="1" max="60" id={"maxTime"} value={durationMax} onChange={(thisEvent) => inputHandler(thisEvent, duarationMaxSetter)}/></div></li>
                    </ul>
                </div>
                <br/>
                <div className="color-box" style={{backgroundColor: "rgb(73,171,252)"}}>
                    <label className="feild-entry-title" style={{marginLeft: "2vw"}} htmlFor={"ageRange"}>Age Range:</label>
                    <ul style={{margin: "2vh 0 2vh 2vw", padding: "0", display: "flex", listStyleType: "none"}}>
                        <li><div className="color-box" style={{backgroundColor: "rgb(148,148,148)", display: "inline-block"}}><input className="small-input" type="number" min="0" max="99" id={"minAge"} value={ageMin} onChange={(thisEvent) => inputHandler(thisEvent, ageMinSetter)}/></div></li>
                        <li><div className="feild-entry-title" style={{display: "inline-block", paddingTop: "5vh"}}>to</div></li>
                        <li><div className="color-box" style={{backgroundColor: "rgb(148,148,148)", display: "inline-block"}}><input className="small-input" type="number" min="1" max="99" id={"maxAge"} value={ageMax} onChange={(thisEvent) => inputHandler(thisEvent, ageMaxSetter)}/></div></li>
                    </ul>
                </div>
                <br/>
                <div className="color-box" style={{backgroundColor: "rgb(120,193,255)"}}>
                    <label className="feild-entry-title" htmlFor={"photos"}>Upload photos:</label>
                    <input className="small-input" type="file" accept="image/*" id="activityPics" name="activityPics" multiple onChange={(thisEvent) => handleFileInput(thisEvent)}/>
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