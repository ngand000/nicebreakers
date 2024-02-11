import {useSearchParams} from "react-router-dom";
import { Amplify } from 'aws-amplify';
import { Activity } from '../../models';
import config from '../../aws-exports.js';
import {useEffect, useState} from "react";
import {DataStore} from "aws-amplify/datastore";

Amplify.configure(config);

const PostPage = () => {
    const postParams = useSearchParams()[0]
    const [activity, setActivity] = useState({})

    function rangeToString(r) {
        return (r && (r[0] === r[1] ? r[0] : r[0] + "-" + r[1]))
    }

    useEffect(() => {
        (async () => {
        setActivity((await DataStore.query(Activity, (a) => a.and(a => [a.id.eq(postParams.get('id'))])))[0])
        console.log(activity)})()
    })


    return (<div>
            {activity && (<div>
                <h1>{activity.name}</h1>
            <p>Author: {activity.author}</p>
            <p>Duration: {rangeToString(activity.duration)} {activity.duration === [1,1] ? "minute" : "minutes"}</p>
            <p>Group Size: {rangeToString(activity.playerCount)} people</p>
            <p>Age Range: {rangeToString(activity.ageRange)} years</p>
            <h2>Description:</h2>
            <p>{activity.description}</p>
            <p>Likes: {activity.likes}</p>
            </div>)}
        </div>
    )
}

export default PostPage;