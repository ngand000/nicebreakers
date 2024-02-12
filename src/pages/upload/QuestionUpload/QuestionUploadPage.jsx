import React, {useState} from 'react';
import UploadButton from "../UploadButton.jsx";
import '../UploadPages.css';

const UploadPage = (props) => {
    
    const [textboxPlaceHolder, questionFocusToggler] = useState("Enter your Question here!");
    const [questionText, questionTextSetter] = useState("");
    const [authorVal, authorValSetter] = useState("");
    const [ageMin, ageMinSetter] = useState("");
    const [ageMax, ageMaxSetter] = useState("");

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
                    <UploadButton uploadType={"/questions"}></UploadButton>
                </div>
            </form>
        </div>
    )
}

export default UploadPage;