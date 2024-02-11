import React, {useState} from 'react';
import UploadButton from "../UploadButton.jsx";
import '../UploadPages.css';

const UploadPage = (props) => {

    const [textboxPlaceHolder, questionFocusToggler] = useState("Enter your Description here!");

    function togglePlaceHolder() {
        if (textboxPlaceHolder == "") {
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
                {/*preload and lock this with username passed in*/}
                <div className="color-box" style={{backgroundColor: "rgb(182,255,123)"}}>
                    <label className="feild-entry-title" htmlFor={"authorName"}>Author:</label>
                    <input className="author-field" type={"text"} id={"author"}/>
                </div>
                <br/>
                <div className="color-box" style={{backgroundColor: "rgb(215, 109, 236)"}}>
                    <label className= "feild-entry-title" htmlFor={"playerCount"}>Player Count:</label>
                    <input style={{padding: "1vh 1vw 1vh 1vw", fontSize: "3vmin"}} type="number" min="1" max="100" id={"playerCount"}/>
                </div>
                <br/>
                {/*needs to be duration*/}
                <label htmlFor={"duration"}>Duration:</label>
                <input type="time" id={"duration"}/>
                <br/>
                <div className="color-box" style={{backgroundColor: "rgb(255,94,94)"}}>
                    <label className="feild-entry-title" style={{marginLeft: "2vw"}} htmlFor={"ageRange"}>Age Range:</label>
                    <ul style={{margin: "2vh 0 2vh 2vw", padding: "0", display: "flex", listStyleType: "none"}}>
                        <li><div className="color-box" style={{backgroundColor: "rgb(255,187,89)", display: "inline-block"}}><input style={{padding: "1vh 1vw 1vh 1vw", fontSize: "3vmin"}} type="number" min="1" max="100" id={"minAge"}/></div></li>
                        <li><div className="feild-entry-title" style={{display: "inline-block", paddingTop: "5vh"}}>to</div></li>
                        <li><div className="color-box" style={{backgroundColor: "rgb(182,255,123)", display: "inline-block"}}><input style={{padding: "1vh 1vw 1vh 1vw", fontSize: "3vmin"}} type="number" min="1" max="100" id={"maxAge"}/></div></li>
                    </ul>
                </div>
                <br/>
                <label htmlFor={"photos"}>Upload photos:</label>
                <input type="file" id="activityPics" name="activityPics"/>
                <br/>
                <UploadButton uploadType={"/"}></UploadButton>
            </form>
            {/*<div> Data entry/upload </div>*/}
            {/*<div> Button to upload </div>*/}
        </div>
    )
}

export default UploadPage;