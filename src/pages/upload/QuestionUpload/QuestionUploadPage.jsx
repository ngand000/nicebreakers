import React, {Component} from 'react';
import UploadButton from "../UploadButton.jsx";

const UploadPage = (props) => {
    return (
        <div>
            <form id ="uploadQuestion">
                <label for={"questionName"}>Question Name:</label>
                <input type={"text"} id={"question"}/>
                <br/>
                <textarea name={"Question"} form={"uploadQuestion"}>Enter the Question here.</textarea>
                <br/>
                {/*preload and lock this with username passed in*/}
                <label htmlFor={"authorName"}>Author:</label>
                <input type={"text"} id={"author"}/>
                <br/>
                <label htmlFor={"ageRange"}>Age Range:</label>
                <input type="number" min="1" max="100" id={"minAge"}/>
                to
                <input type="number" min="1" max="100" id={"maxAge"}/>
                <br/>
                <UploadButton uploadType={"/questions"}></UploadButton>
            </form>
            {/*<div> Data entry/upload </div>*/}
            {/*<div> Button to upload </div>*/}
        </div>
    )
}

export default UploadPage;