import ActivityList from "./ActivityList";
import FilterBar from "./FilterBar";
import FilterEntry from "./FilterEntry";
import React, {useState} from 'react'

// page that displays the activities pulled from the database
const ActivitiesPage = () => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [filterEditing, setFilterEditing] = useState("");

    function openPopup(label) {
        setFilterEditing(label)
        setIsPopupOpen(true);
    };

    function closePopup(value) {
        filters[filterEditing] = value
        console.log(filters)
        setIsPopupOpen(false);
    };

    function removeFilter(filter) {
        delete filters[filter]
        console.log(filters)
    }

    const filters = {}


    const dummyActivities = [{Name: "icebreaker 1", Likes: 7, Abstract: "A cool icebreaker!", PlayerCount: [3, 4], Duration: [20, 20], Endorsed: true, id: 1},
        {Name: "icebreaker 2", Likes: 0, Abstract: "A second, less cool icebreaker!", PlayerCount: [1, 1], Duration: [50, 80], Endorsed: false, id: 2}]

    for (let i=0;i<20;i++) {
        dummyActivities.push({Name: "dummy", Likes: 7, Abstract: "This is an abstract! It's about 2 sentences!", PlayerCount: [1, 4], Duration: [20, 30], Endorsed: true, id: 0})
    }

    return (
        <div>
            {isPopupOpen && <FilterEntry onClose={closePopup} filter={filterEditing} />}
            <FilterBar openPopup={openPopup} removeFilter={removeFilter}/>
            <ActivityList activities={dummyActivities} />
        </div>
    )
}

export default ActivitiesPage;