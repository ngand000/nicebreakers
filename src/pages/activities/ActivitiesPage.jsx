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

    const dummyActivities = [{Name: "icebreaker 1"}, {Name: "icebreaker 2"}]

    return (
        <div>
            <div> Filters </div>
            <ActivityList activities={dummyActivities}/>
        </div>
    )
}

export default ActivitiesPage;