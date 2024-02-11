import React, {useState} from 'react';
import UploadButton from "../UploadButton.jsx";
import '../UploadPages.css';

const UploadPage = (props) => {

    const [textboxPlaceHolder, questionFocusToggler] = useState("Enter your Description here!");

    function togglePlaceHolder() {
        if (textboxPlaceHolder === "") {
            questionFocusToggler("Enter your Description here!");
        } else {
            questionFocusToggler("");
        }
    }

    return (
        <div>
            <div className="header">
                <img src={"logoplaceholder.png"} alt={"logo"}/>
                <text className="title">Upload Activity</text>
            </div>
            <form id ="uploadActivity" style={{width: "80%", marginLeft: "10%"}}>
                <div className="name-entry-block">
                    <label className="feild-entry-title" for={"activityName"}>Activity Name:</label>
                    <input className="name-entry-box" type={"text"} id={"activity"}/>
                </div>
                <br/>
                <div className="color-box" style={{backgroundColor: "rgb(255,252,123)"}}>
                    <label className="feild-entry-title" htmlFor={"activityDescription"}>Description:</label>
                    <textarea id="question-entry-box" className="question-entry-box" style={{width: "95%", height: "20vh"}} name={"Description"} form={"uploadActivity"} placeholder={textboxPlaceHolder} onFocus={togglePlaceHolder} onBlur={togglePlaceHolder}></textarea>
                </div>
                <br/>
                <div className="color-box" style={{backgroundColor: "rgb(182,255,123)"}}>
                    <label className="feild-entry-title" htmlFor={"authorName"}>Author:</label>
                    <input className="author-field" type={"text"} id={"author"}/>
                </div>
                <br/>
                <div className="color-box" style={{backgroundColor: "rgb(215, 109, 236)"}}>
                    <label className= "feild-entry-title" htmlFor={"playerCount"}>Player Count:</label>
                    <input className="small-input" type="number" min="1" max="100" id={"playerCount"}/>
                </div>
                <br/>
                <div className="color-box" style={{backgroundColor: "rgb(189,250,248)"}}>
                    <label className="feild-entry-title" style={{marginLeft: "2vw"}} htmlFor={"ageRange"}>Duration (min):</label>
                    <ul style={{margin: "2vh 0 2vh 2vw", padding: "0", display: "flex", listStyleType: "none"}}>
                        <li><div className="color-box" style={{backgroundColor: "rgb(255,252,123)", display: "inline-block"}}><input className="small-input" type="number" min="0" max="60" id={"minAge"}/></div></li>
                        <li><div className="feild-entry-title" style={{display: "inline-block", paddingTop: "5vh"}}>to</div></li>
                        <li><div className="color-box" style={{backgroundColor: "rgb(148, 148, 242)", display: "inline-block"}}><input className="small-input" type="number" min="1" max="60" id={"maxAge"}/></div></li>
                    </ul>
                </div>
                <br/>
                <div className="color-box" style={{backgroundColor: "rgb(255,94,94)"}}>
                    <label className="feild-entry-title" style={{marginLeft: "2vw"}} htmlFor={"ageRange"}>Age Range:</label>
                    <ul style={{margin: "2vh 0 2vh 2vw", padding: "0", display: "flex", listStyleType: "none"}}>
                        <li><div className="color-box" style={{backgroundColor: "rgb(255,187,89)", display: "inline-block"}}><input className="small-input" type="number" min="0" max="100" id={"minAge"}/></div></li>
                        <li><div className="feild-entry-title" style={{display: "inline-block", paddingTop: "5vh"}}>to</div></li>
                        <li><div className="color-box" style={{backgroundColor: "rgb(182,255,123)", display: "inline-block"}}><input className="small-input" type="number" min="1" max="100" id={"maxAge"}/></div></li>
                    </ul>
                </div>
                <br/>
                <div className="color-box" style={{backgroundColor: "rgb(169,246,187)"}}>
                    <label className="feild-entry-title" htmlFor={"photos"}>Upload photos:</label>
                    <input className="small-input" type="file" id="activityPics" name="activityPics"/>
                </div>
                <br/>
                <div className="upload-button-bounder">
                    <UploadButton uploadType={"/"}></UploadButton>
                </div>
            </form>
        </div>
    )
}

export default UploadPage;