import {useSearchParams} from "react-router-dom";
import { Amplify } from 'aws-amplify';
import {Activity} from '../../models';
import config from '../../aws-exports.js';
import {useEffect, useState} from "react";
import {DataStore} from "aws-amplify/datastore";
import "./postPage.css"
import ImageWithCaption from "./ImageWithCaption";
import ReportPopup from "./ReportPopup";

Amplify.configure(config);

const PostPage = () => {
    const postParams = useSearchParams()[0]
    const [activity, setActivity] = useState({})
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    function rangeToString(r) {
        return (r && (r[0] === r[1] ? r[0] : r[0] + "-" + r[1]))
    }

    useEffect(() => {
        (async () => {
        setActivity((await DataStore.query(Activity, (a) => a.and(a => [a.id.eq(postParams.get('id'))])))[0])})()
    })

    const updateLikeCount = async(event, changeVal) => {
        event.preventDefault();
        if (changeVal > 0 || activity.likes > 0) {
            await DataStore.save(
                Activity.copyOf(activity, updated => {
                    updated.likes = activity.likes + changeVal;
                })
            );
        }
    }

    const headerStyle = {height: "16vmin", display: "flex", margin: "auto", width: "90vw", justifyContent: "center", alignContent: "center"}

    const titleStyle = {margin: "auto 1vmin auto 0"}

    const logoStyle = {width: "10vmin", margin: "1vw 2vw 0 0"}

    const valueStyle = {margin: "auto 0 auto 0"}

    const attributesStyle = {display: "flex"}

    const images = {display: "flex", overflowX: "scroll"}

    const bottomBar = {display: "flex"}

    return (<div>
            {isPopupOpen && <ReportPopup closePopup={setIsPopupOpen} id={activity.id}/>}
            {activity && (<div>
                <div style={headerStyle}>
                    <a href={'/'}> <img src={"logoplaceholder.png"} alt={"logo"} style={logoStyle}/> </a>
                    <h1>{activity.name}</h1>
                </div>
                <div style={attributesStyle}>
                    <div className={"titleAndValueStyle"}>
                        <h3 style={titleStyle}> Author: </h3>
                        <p style={valueStyle}>{activity.author}</p>
                    </div>
                    <div style={{borderColor: "rgb(48,139,255)"}} className={"titleAndValueStyle"}>
                        <h3 style={titleStyle}> Group Size: </h3>
                        <p style={valueStyle}>{rangeToString(activity.playerCount)} people</p>
                    </div>
                    <div style={{borderColor: "rgb(73,171,252)"}} className={"titleAndValueStyle"}>
                        <h3 style={titleStyle}> Age Range: </h3>
                        <p style={valueStyle}>{rangeToString(activity.ageRange)} years</p>
                    </div>
                    <div style={{borderColor: "rgb(79,239,255)"}} className={"titleAndValueStyle"}>
                        <h3 style={titleStyle}> Duration: </h3>
                        <p style={valueStyle}>{rangeToString(activity.duration)} {activity.duration === [1,1] ? "minute" : "minutes"}</p>
                    </div>
                    <div style={{borderColor: "rgb(185,255,253)"}} className={"titleAndValueStyle"}>
                        <h3 style={titleStyle}> Likes: </h3>
                        <p style={valueStyle}>{activity.likes}</p>
                    </div>
                </div>
                <h2>Description:</h2>
                <p className={"descStyle"}>{activity.description}</p>
                <h2>Images</h2>
                <div style={images}>
                    {activity.fileTypes && activity.fileTypes.map((fileType, i) => {
                        return <ImageWithCaption caption={activity.captions[i]} id={activity.id} imageNum={i} imgType={fileType}/>}
                    )}
                </div>
                <div style={bottomBar}>
                    <img className={"likeDislikeStyle"} src={"likeplaceholder.png"} alt={"duration"} onClick={(thisEvent) => updateLikeCount(thisEvent, 1)}/>
                    <img className={"likeDislikeStyle"} src={"dislikeplaceholder.webp"} alt={"duration"} onClick={(thisEvent) => updateLikeCount(thisEvent, -1)}/>
                    <button className={"reportStyle"} onClick={() => setIsPopupOpen(true)}> Report </button>
                </div>
            </div>)}
        </div>
    )
}

export default PostPage;