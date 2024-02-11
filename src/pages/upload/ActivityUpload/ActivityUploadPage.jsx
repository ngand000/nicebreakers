import React, {Component} from 'react';
import UploadButton from "../UploadButton.jsx";

const UploadPage = (props) => {
    return (
        <div>
            <form id ="uploadActivity">
                <label for={"activityName"}>Activity Name:</label>
                <input type={"text"} id={"activity"}/>
                <br/>
                <label htmlFor={"activityDescription"}>Description:</label>
                <textarea name={"description"} form={"uploadActivity"}>Enter activity description here.</textarea>
                <br/>
                {/*preload and lock this with username passed in*/}
                <label htmlFor={"authorName"}>Author:</label>
                <input type={"text"} id={"author"}/>
                <br/>
                <label htmlFor={"playerCount"}>Player Count:</label>
                <input type="number" min="1" max="100" id={"playerCount"}/>
                <br/>
                {/*needs to be duration*/}
                <label htmlFor={"duration"}>Duration:</label>
                <input type="time" id={"duration"}/>
                <br/>
                <label htmlFor={"ageRange"}>Age Range:</label>
                <input type="number" min="1" max="100" id={"minAge"}/>
                to
                <input type="number" min="1" max="100" id={"maxAge"}/>
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