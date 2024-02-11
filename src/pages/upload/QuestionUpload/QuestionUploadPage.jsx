import React, {useState} from 'react';
import UploadButton from "../UploadButton.jsx";
import '../UploadPages.css';

const UploadPage = (props) => {
    
    const [textboxPlaceHolder, questionFocusToggler] = useState("Enter your Question here!");

    function togglePlaceHolder() {
        if (textboxPlaceHolder == "") {
            questionFocusToggler("Enter your Question here!");
        } else {
            questionFocusToggler("");
        }
    }

    return (
        <div>
            <div className="header">
                <img src={"logoplaceholder.png"} alt={"logo"}/>
                <text className="title">Upload Question</text>
            </div>
            <form id ="uploadQuestion" style={{width: "80%", marginLeft: "10%"}}>
                <div className="color-box" style={{backgroundColor: "rgb(255,252,123)"}}><textarea id="question-entry-box" className="question-entry-box" name={"Question"} form={"uploadQuestion"} placeholder={textboxPlaceHolder} onFocus={togglePlaceHolder} onBlur={togglePlaceHolder}></textarea></div>
                <br/>
                {/*preload and lock this with username passed in*/}
                <div className="color-box" style={{backgroundColor: "rgb(182,255,123)"}}>
                    <label className="feild-entry-title" htmlFor={"authorName"}>Author:</label>
                    <input className="author-field" type={"text"} id={"author"}/>
                </div>
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
                <UploadButton uploadType={"/questions"}></UploadButton>
            </form>
            {/*<div> Data entry/upload </div>*/}
            {/*<div> Button to upload </div>*/}
        </div>
    )
}

export default UploadPage;