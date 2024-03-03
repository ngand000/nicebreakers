import QuestionsList from "./QuestionsList";
import FilterBar from "../activities/FilterBar";
import FilterEntry from "../activities/FilterEntry";
import UploadButton from "../upload/UploadButton.jsx";
import React, {useEffect, useRef, useState} from 'react';
import { DataStore } from 'aws-amplify/datastore';
import {useNavigate} from "react-router-dom"
import {Question} from '../../models';
import { Amplify } from 'aws-amplify';
import config from '../../aws-exports.js';
import ReportPopup from "../post/ReportPopup";

Amplify.configure(config);

// page that displays the questions pulled from the database
const QuestionsPage = () => {

    const [isPopupOpen, setIsPopupOpen] = useState(0);
    const [filterEditing, setFilterEditing] = useState("");
    const [filters, setFilters] = useState({});
    const filterBarRef = useRef(null);
    const [questions, setQuestions] = useState([])
    const [qid, setQid] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
        setQuestions(await DataStore.query(Question))})()
    })

    //pre: none
    //args: label is the filter we are setting a value for
    //post: opens popup so user can enter a value for that filter
    function openFilterPopup(label) {
        setFilterEditing(label)
        setIsPopupOpen(1);
    }

    //pre: none
    //post: opens report popup so user can report question
    function openReport(id) {
        setQid(id)
        setIsPopupOpen(2)
    }

    //pre: filterEditing has a value
    //args: value is the value we are assigning to the current filter
    //post: filters now include filterEditing with value value
    function closePopup(value) {
        if (value) {
            setFilters({...filters,
            [filterEditing]: value})
        }
        setIsPopupOpen(false);
    }

    //pre: none
    //args: filter is the filter we are removing the value from
    //post: removes that filter from filters, if it is there
    function removeFilter(filter) {
        let newFilters = {...filters}
        delete newFilters[filter]
        setFilters(newFilters)
    }

    //pre: none
    //args: _ is a dummy argument so this can be passed in place of openPopup
    //post: in filters, Endorsed is set to true
    function setEndorsed(value) {
        let newFilters = {...filters,
        Endorsed: true}
        setFilters(newFilters)
    }

    const actualProperties = {"Ages": "ageRange", "Endorsed": "endorsed"}

    // pre, post: none
    // args: a, the question for which it is being checked if it fits the filters
    // returns: boolean representing whether a fits all current filters
    function filterOK (a) {
        for (const [k, value] of Object.entries(filters)) {
            let key = actualProperties[k]
            switch (filterTypes[k]) {
                case "rangeIn":
                    if (value[0] > a[key][0] || value[1] < a[key][1]) {
                        return false;
                    }
                    break
                case "rangeOut":
                    if (value[0] < a[key][0] || value[1] > a[key][1]) {
                        return false;
                    }
                    break
                case "bool":
                    if (!a[key]) {
                        return false;
                    }
                    break
                default:
                    if (a[key] !== value) {
                        return false;
                    }
            }
        }
        return true;
    }

    // pre, post: none
    // args: a, b the questions to compare
    // returns: difference between b and a's likes, so that they can be compared
    function compareLikes(a, b) {
        return b.likes-a.likes
    }

    const filterTypes = {"Ages": "rangeOut", "Endorsed": "bool"}

    const headerStyle = {height: "16vmin", display: "flex", margin: "auto", width: "90vw", justifyContent: "center", alignContent: "center"}

    const thisLinkStyle = {textDecoration: "underline", color: "rgb(190, 190, 190)", margin: "auto", fontSize: "10vmin"}

    const otherLinkStyle = {textDecoration: "underline", color: "black", margin: "auto", fontSize: "10vmin"}

    const logoStyle = {}

    return (
        <div>
            <div style={headerStyle}>
                <img style={logoStyle} src={"logoplaceholder.png"} alt={"logo"}/>
                <div onClick={() => {navigate("/")}} style={otherLinkStyle}>Activities</div>
                <div onClick={() => {navigate("")}} style={thisLinkStyle}>Questions</div>
            </div>
            <div>
                {(isPopupOpen !== 0) && (isPopupOpen === 1 ? <FilterEntry onClose={closePopup} filter={filterEditing} dtype={filterTypes[filterEditing]} />:
                    <ReportPopup closePopup={(a) => {setIsPopupOpen(0)}} id={qid} q={true}/>)}
                <ul style={{margin: "0 10vw 0 2vw", padding: "0", display: "flex"}}>
                    <li ref={filterBarRef} style={{display: "inline-block"}}><FilterBar openPopup={openFilterPopup} setEndorsed={setEndorsed} removeFilter={removeFilter}/></li>
                    <li style={{display: "inline-block", marginLeft: "auto"}}><UploadButton uploadType={"/upload/QuestionUpload"}></UploadButton></li>
                </ul>
                <QuestionsList questions={questions.filter(filterOK).sort(compareLikes)} openReport = {openReport} />
            </div>
        </div>
    )
}

export default QuestionsPage;
