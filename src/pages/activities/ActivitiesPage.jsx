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
    };

    function closePopup(value) {
        if (value) {
            setFilters({...filters,
            [filterEditing]: value})
        }
        setIsPopupOpen(false);
    };

    function removeFilter(filter) {
        let newFilters = {...filters}
        delete newFilters[filter]
        setFilters(newFilters)
    }


    const filterTypes = {"Group Size": "range", "Ages": "range", "Duration(min)": "range", "Endorsed": "bool"}

    const activities = [{Name: "icebreaker 1", Likes: 7, Abstract: "A cool icebreaker!", "Group Size": [3, 4], "Duration(min)": [20, 20], Endorsed: true, id: 1},
        {Name: "icebreaker 2", Likes: 0, Abstract: "A second, less cool icebreaker!", "Group Size": [1, 1], "Duration(min)": [50, 80], Endorsed: false, id: 2}]

    for (let i=0;i<20;i++) {
        activities.push({Name: "dummy", Likes: 7, Abstract: "This is an abstract! It's about 2 sentences!", "Group Size": [1, 4], "Duration(min)": [20, 30], Endorsed: true, id: 0})
    }

    return (
        <div>
            {isPopupOpen && <FilterEntry onClose={closePopup} filter={filterEditing} dtype={filterTypes[filterEditing]} />}
            <FilterBar openPopup={openPopup} removeFilter={removeFilter}/>
            <ActivityList activities={activities.filter((a) => {
                for (const [key, value] of Object.entries(filters)) {
                    if (a[key] !== value) {
                        return false;
                    }
                }
                return true;
            })} />
        </div>
    )
}

export default ActivitiesPage;