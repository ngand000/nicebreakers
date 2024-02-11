import ActivityList from "./ActivityList";
import FilterBar from "./FilterBar";
import FilterEntry from "./FilterEntry";
import UploadButton from "../upload/UploadButton.jsx"
import React, {useState} from 'react'
import { DataStore } from 'aws-amplify/datastore';
import { Activity } from '../../models';
import { Amplify } from 'aws-amplify';
import config from '../../aws-exports.js';

Amplify.configure(config);

const activities = await DataStore.query(Activity);

// page that displays the activities pulled from the database
const ActivitiesPage = () => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [filterEditing, setFilterEditing] = useState("");
    const [filters, setFilters] = useState({});

    //pre: none
    //args: label is the filter we are setting a value for
    //post: opens popup so user can enter a value for that filter
    function openPopup(label) {
        setFilterEditing(label)
        setIsPopupOpen(true)
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
    function setEndorsed(_) {
        let newFilters = {...filters,
        Endorsed: true}
        setFilters(newFilters)
    }

    const actualProperties = {"Group Size": "playerCount", "Duration(min)": "duration", "Ages": "ageRange", "Endorsed": "endorsed"}

    // pre, post: none
    // args: a, the activity for which it is being checked if it fits the filters
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
    // args: a, b the activities to compare
    // returns: difference between b and a's likes, so that they can be compared
    function compareLikes(a, b) {
        return b.likes-a.likes
    }

    // pre: none
    // post: none
    // args none
    // returns stirng representing number of vw units
    // to offset upload button
    function getUploadButtonOffset() {
        return activitiesUploadOffset + "vw";
    }

    const filterTypes = {"Group Size": "rangeOut", "Ages": "rangeOut", "Duration(min)": "rangeIn", "Endorsed": "bool"}

    const headerStyle = {height: "16vmin", display: "flex", margin: "auto", width: "90vw", justifyContent: "center", alignContent: "center"}

    const thisLinkStyle = {textDecoration: "underline", color: "rgb(190, 190, 190)", margin: "auto", fontSize: "10vmin"}

    const otherLinkStyle = {textDecoration: "underline", color: "black", margin: "auto", fontSize: "10vmin"}

    const logoStyle = {}

    const activitiesUploadOffset = 19

    return (
        <div>
            <div style={headerStyle}>
                <img style={logoStyle} src={"logoplaceholder.png"} alt={"logo"}/>
                <a href={"/"} style={thisLinkStyle}>Activities</a>
                <a href={"/questions"} style={otherLinkStyle}>Questions</a>
            </div>
            <div>
                {isPopupOpen && <FilterEntry onClose={closePopup} filter={filterEditing} dtype={filterTypes[filterEditing]} />}
                <ul style={{margin: "2vh 0 2vh 2vw", padding: "0"}}>
                    <li id="filterbar" style={{display: "inline-block"}}><FilterBar activities openPopup={openPopup} setEndorsed={setEndorsed} removeFilter={removeFilter}/></li>
                    <li style={{display: "inline-block", marginLeft: getUploadButtonOffset()}}><UploadButton></UploadButton></li>
                </ul>
                <ActivityList activities={activities.filter(filterOK).sort(compareLikes)} />
            </div>
        </div>
    )
}

export default ActivitiesPage;