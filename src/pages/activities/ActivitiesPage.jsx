import ActivityList from "./ActivityList";
import { DataStore } from 'aws-amplify/datastore';
import { Activity } from '../../models';
import { Amplify } from 'aws-amplify';
import config from '../../aws-exports.js';

Amplify.configure(config);

const models = await DataStore.query(Activity);
const ActivitiesPage = (props) => {
    console.log(models)
    const dummyActivities = [{Name: "icebreaker 1", Likes: 7, Abstract: "A cool icebreaker!", PlayerCount: [3, 4], Duration: [20, 20], Endorsed: true, id: 1},
        {Name: "icebreaker 2", Likes: 0, Abstract: "A second, less cool icebreaker!", PlayerCount: [1, 1], Duration: [50, 80], Endorsed: false, id: 2}]

    for (let i=0;i<20;i++) {
        dummyActivities.push({Name: "dummy", Likes: 7, Abstract: "This is an abstract! It's about 2 sentences!", PlayerCount: [1, 4], Duration: [20, 30], Endorsed: true, id: 0})
    }

    return (
        <div>
            <div> Filters </div>
            <ActivityList activities={models}/>
        </div>
    )
}

export default ActivitiesPage;