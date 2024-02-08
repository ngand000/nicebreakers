import QuestionsList from "./QuestionsList";
import FilterBar from "../activities/FilterBar";
import FilterEntry from "../activities/FilterEntry";
import React, {useState} from 'react'
import { DataStore } from 'aws-amplify/datastore';
import {Question} from '../../models';
import { Amplify } from 'aws-amplify';
import config from '../../aws-exports.js';

Amplify.configure(config);

const questions = await DataStore.query(Question);

// page that displays the questions pulled from the database
const QuestionsPage = () => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [filterEditing, setFilterEditing] = useState("");
    const [filters, setFilters] = useState({});

    //pre: none
    //args: label is the filter we are setting a value for
    //post: opens popup so user can enter a value for that filter
    function openPopup(label) {
        setFilterEditing(label)
        setIsPopupOpen(true);
        console.log(filters)
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
        console.log(filter)
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
        console.log(filters)
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
                <a href={"/"} style={otherLinkStyle}>Activities</a>
                <a href={"/questions"} style={thisLinkStyle}>Questions</a>
            </div>
            <div>
                {isPopupOpen && <FilterEntry onClose={closePopup} filter={filterEditing} dtype={filterTypes[filterEditing]} />}
                <FilterBar openPopup={openPopup} setEndorsed={setEndorsed} removeFilter={removeFilter}/>
                <QuestionsList questions={questions.filter(filterOK).sort(compareLikes)} />
            </div>
        </div>
    )
}

export default QuestionsPage;