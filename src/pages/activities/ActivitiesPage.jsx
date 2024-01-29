import ActivityList from "./ActivityList";


const ActivitiesPage = (props) => {

    const dummyActivities = [{Name: "icebreaker 1", Likes: 7, Abstract: "A cool icebreaker!", PlayerCount: [3, 4], Duration: [20, 20], Endorsed: true},
        {Name: "icebreaker 2", Likes: 0, Abstract: "A second, less cool icebreaker!", PlayerCount: [1, 1], Duration: [50, 80], Endorsed: false}]

    return (
        <div>
            <div> Filters </div>
            <ActivityList activities={dummyActivities}/>
        </div>
    )
}

export default ActivitiesPage;