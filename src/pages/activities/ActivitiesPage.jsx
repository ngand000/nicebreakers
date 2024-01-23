import ActivityList from "./ActivityList";


const ActivitiesPage = (props) => {

    const dummyActivities = [{Name: "icebreaker 1"}, {Name: "icebreaker 2"}]

    return (
        <div>
            <div> Filters </div>
            <ActivityList activities={dummyActivities}/>
        </div>
    )
}

export default ActivitiesPage;