import ActivityList from "./ActivityList";
import { generateClient } from "aws-amplify/api";
import { listActivitys, getActivity } from "./graphql/queries";

const client = generateClient()


// List all items
const allActivitys = await client.graphql({
    query: listActivitys
});

console.log(allActivity);

const ActivitiesPage = (props) => {

    const dummyActivities = [{Name: "icebreaker 1", Likes: 7, Abstract: "A cool icebreaker!", PlayerCount: [3, 4], Duration: [20, 20], Endorsed: true, id: 1},
        {Name: "icebreaker 2", Likes: 0, Abstract: "A second, less cool icebreaker!", PlayerCount: [1, 1], Duration: [50, 80], Endorsed: false, id: 2}]

    for (let i=0;i<20;i++) {
        dummyActivities.push({Name: "dummy", Likes: 7, Abstract: "This is an abstract! It's about 2 sentences!", PlayerCount: [1, 4], Duration: [20, 30], Endorsed: true, id: 0})
    }

    return (
        <div>
            <div> Filters </div>
            <ActivityList activities={dummyActivities}/>
        </div>
    )
}

export default ActivitiesPage;