import ActivityList from "./ActivityList";
import FilterBar from "./FilterBar";
import FilterEntry from "./FilterEntry";
import React, {useState} from 'react'

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
        Endorsed: true}
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
        return b.Likes-a.Likes
    }

    const filterTypes = {"Group Size": "range", "Ages": "range", "Duration(min)": "range", "Endorsed": "bool"}

    const activities = [{Name: "icebreaker 1", Likes: 7, Abstract: "A cool icebreaker!", "Group Size": [3, 4], "Duration(min)": [20, 20], Endorsed: true, id: 1},
        {Name: "icebreaker 2", Likes: 0, Abstract: "A second, less cool icebreaker!", "Group Size": [1, 1], "Duration(min)": [50, 80], Endorsed: false, id: 2}]

    for (let i=0;i<20;i++) {
        activities.push({Name: "dummy", Likes: 7, Abstract: "This is an abstract! It's about 2 sentences!", "Group Size": [1, 4], "Duration(min)": [20, 30], Endorsed: true, id: 0})
    }

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