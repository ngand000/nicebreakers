import ActivityList from "./ActivityList";
import FilterBar from "./FilterBar";
import FilterEntry from "./FilterEntry";
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

    function openPopup(label) {
        setFilterEditing(label)
        setIsPopupOpen(true);
        console.log(filters)
    }

    function closePopup(value) {
        if (value) {
            setFilters({...filters,
            [filterEditing]: value})
        }
        setIsPopupOpen(false);
    }

    function removeFilter(filter) {
        let newFilters = {...filters}
        delete newFilters[filter]
        setFilters(newFilters)
    }

    function setEndorsed(value) {
        let newFilters = {...filters,
        endorsed: true}
        setFilters(newFilters)
    }

    function filterOK (a) {
        for (const [key, value] of Object.entries(filters)) {
            switch (filterTypes[key]) {
                case "range":
                    if (value[0] > a[key][0] || value[1] < a[key][1]) {
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

    function compareLikes(a, b) {
        return b.likes-a.likes
    }

    const filterTypes = {"Group Size": "range", "Ages": "range", "Duration(min)": "range", "Endorsed": "bool"}

    const headerStyle = {height: "16vmin", display: "flex", margin: "auto", width: "90vw", justifyContent: "center", alignContent: "center"}

    const thisLinkStyle = {textDecoration: "underline", color: "rgb(190, 190, 190)", margin: "auto", fontSize: "10vmin"}

    const otherLinkStyle = {textDecoration: "underline", color: "black", margin: "auto", fontSize: "10vmin"}

    const logoStyle = {}

    return (
        <div>
            <div style={headerStyle}>
                <img style={logoStyle} src={"logoplaceholder.png"} alt={"logo"}/>
                <a href={"/"} style={thisLinkStyle}>Activites</a>
                <a href={"/questions"} style={otherLinkStyle}>Questions</a>
            </div>
            <div>
                {isPopupOpen && <FilterEntry onClose={closePopup} filter={filterEditing} dtype={filterTypes[filterEditing]} />}
                <FilterBar openPopup={openPopup} setEndorsed={setEndorsed} removeFilter={removeFilter}/>
                <ActivityList activities={activities.filter(filterOK).sort(compareLikes)} />
            </div>
        </div>
    )
}

export default ActivitiesPage;