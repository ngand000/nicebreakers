import {useSearchParams} from "react-router-dom";
import { Amplify } from 'aws-amplify';
import { Activity } from '../../models';
import config from '../../aws-exports.js';
import {useEffect, useState, React} from "react";
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
        setActivity((await DataStore.query(Activity, (a) => a.and(a => [a.id.eq(postParams.get('id'))])))[0])})()
    })

    const headerStyle = {height: "16vmin", display: "flex", margin: "auto", width: "90vw", justifyContent: "center", alignContent: "center"}

    const titleAndValueStyle = {display: "flex", borderWidth: 5, border: "solid", borderRadius: "10px", flexShrink: 1, margin: "20px 5px 5px 5px", width: "20%"}

    const titleStyle = {margin: "auto 1vmin auto 0"}

    const valueStyle = {margin: "auto 0 auto 0"}

    const attributesStyle = {display: "flex"}

    const descStyle = {borderWidth: 5, border: "solid", borderRadius: "10px", borderColor: "rgb(150, 150, 150)", margin: "0 5px 0 5px"}

    return (<div>
            {activity && (<div>
                <div style={headerStyle}>
                    <img src={"logoplaceholder.png"} alt={"logo"}/>
                    <h1>{activity.name}</h1>
                </div>
                <div style={attributesStyle}>
                    <div style={titleAndValueStyle}>
                        <h3 style={titleStyle}> Author: </h3>
                        <p style={valueStyle}>{activity.author}</p>
                    </div>
                    <div style={{...titleAndValueStyle, borderColor: "rgb(255,152,152)"}}>
                        <h3 style={titleStyle}> Group Size: </h3>
                        <p style={valueStyle}>{rangeToString(activity.playerCount)} people</p>
                    </div>
                    <div style={{...titleAndValueStyle, borderColor: "rgb(170,255,113)"}}>
                        <h3 style={titleStyle}> Age Range: </h3>
                        <p style={valueStyle}>{rangeToString(activity.ageRange)} years</p>
                    </div>
                    <div style={{...titleAndValueStyle, borderColor: "rgb(49,224,255)"}}>
                        <h3 style={titleStyle}> Duration: </h3>
                        <p style={valueStyle}>{rangeToString(activity.duration)} {activity.duration === [1,1] ? "minute" : "minutes"}</p>
                    </div>
                    <div style={{...titleAndValueStyle, borderColor: "rgb(100,77,255)"}}>
                        <h3 style={titleStyle}> Likes: </h3>
                        <p style={valueStyle}>{activity.likes}</p>
                    </div>
                </div>
                <h2>Description:</h2>
                <p style={descStyle}>{activity.description}</p>
                <h2>Images</h2>
                {/*images go here*/}
            </div>)}
        </div>
    )
}

export default PostPage;