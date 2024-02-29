import {useSearchParams} from "react-router-dom";
import { Amplify } from 'aws-amplify';
import {Activity} from '../../models';
import config from '../../aws-exports.js';
import {useEffect, useState} from "react";
import {DataStore} from "aws-amplify/datastore";
import { Account } from '../../models';
import "./postPage.css"
import ImageWithCaption from "./ImageWithCaption";
import ReportPopup from "./ReportPopup";
import { getCurrentUser } from 'aws-amplify/auth';



Amplify.configure(config);

const PostPage = () => {
    const postParams = useSearchParams()[0]
    const [activity, setActivity] = useState({})
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    var username = null;
    var userId = null;
    function rangeToString(r) {
        return (r && (r[0] === r[1] ? r[0] : r[0] + "-" + r[1]))
    }

    useEffect(() => {
        (async () => {
        setActivity((await DataStore.query(Activity, (a) => a.and(a => [a.id.eq(postParams.get('id'))])))[0])})()
    })

    useEffect(() => {
        (
            async () => {
                try {
                  const { usernameGet, userIdGet, signInDetails } = await getCurrentUser();
                  userId = userIdGet;
                  username = usernameGet;
                } catch (err) {
                  console.log(err);
                }
              }
        )()
    })

    const updateLikeCount = async(event, changeVal) => {
        /* Models in DataStore are immutable. To update a record you must use the copyOf function
        to apply updates to the item’s fields rather than mutating the instance directly */
        const original = await DataStore.query(Account, (c) => c.userEmail.eq(userId));
        if (original.length == 0) {
            await DataStore.save(
                new Account({
                    "userEmail": userId,
                    "postsLiked":  [],
                    "postsReported":  [],
                    "postDisliked":  [],
                    "Admin": false
                })
            );
        }
        const update = await DataStore.query(Account, (c) => c.userEmail.eq(userId));
        console.log(update[0])
        if ((changeVal > 0 && activity.likes > 0) && update[0].postsLiked.find((element) => element == activity.id) == undefined) {
            const updatedAccount = await DataStore.save(
                Account.copyOf(update[0], updated => {
                const updateArray = updated.postsLiked.slice();
                updateArray.push(activity.id);
                updated.postsLiked = updateArray;
                // Check for if in disliked and remove it from there if it is
                const index = updated.postDisliked.indexOf(activity.id);
                if (index > -1) {
                    const updateArrayDisliked = updated.postDisliked;
                    updateArrayDisliked.splice(index, 1);
                    updated.postDisliked = updateArrayDisliked
                    changeVal++;
                }
                })
            );
            await DataStore.save(
                Activity.copyOf(activity, updated => {
                    updated.likes = activity.likes + changeVal;
                })
            );
            event.preventDefault();
        } else if ((changeVal < 0 && activity.likes > 0) && update[0].postDisliked.find((element) => element == activity.id) == undefined) {
            const updatedAccount = await DataStore.save(
                Account.copyOf(update[0], updated => {
                const updateArray = updated.postDisliked.slice();
                updateArray.push(activity.id);
                updated.postDisliked = updateArray;
                // Check for if in liked and remove it from there if it is
                const index = updated.postsLiked.indexOf(activity.id);
                if (index > -1) {
                    const updateArrayliked = updated.postsLiked;
                    updateArrayliked.splice(index, 1);
                    updated.postsLiked = updateArrayliked
                    changeVal--;
                }
                })
            );
            await DataStore.save(
                Activity.copyOf(activity, updated => {
                    updated.likes = activity.likes + changeVal;
                })
            );
        } else {
            changeVal = changeVal * -1;
            const updatedAccount = await DataStore.save(
                Account.copyOf(update[0], updated => {
                    // Check for if in disliked and remove it from there if it is
                    const index = updated.postDisliked.indexOf(activity.id);
                    if (index > -1) {
                        const updateArrayDisliked = updated.postDisliked;
                        updateArrayDisliked.splice(index, 1);
                        updated.postDisliked = updateArrayDisliked
                    }
                    // Check for if in liked and remove it from there if it is
                    const index2 = updated.postsLiked.indexOf(activity.id);
                    if (index2 > -1) {
                        const updateArrayliked = updated.postsLiked;
                        updateArrayliked.splice(index2, 1);
                        updated.postsLiked = updateArrayliked
                    }
                })
            );
            await DataStore.save(
                Activity.copyOf(activity, updated => {
                    updated.likes = activity.likes + changeVal;
                })
            );
        }
    }

    const headerStyle = {height: "16vmin", display: "flex", margin: "auto", width: "90vw", justifyContent: "center", alignContent: "center"}

    const titleStyle = {margin: "auto 1vmin auto 0"}

    const valueStyle = {margin: "auto 0 auto 0"}

    const attributesStyle = {display: "flex"}

    const images = {display: "flex", overflowX: "scroll"}

    const bottomBar = {display: "flex"}

    return (<div>
            {isPopupOpen && <ReportPopup closePopup={setIsPopupOpen} id={activity.id}/>}
            {activity && (<div>
                <div style={headerStyle}>
                    <img src={"logoplaceholder.png"} alt={"logo"}/>
                    <h1>{activity.name}</h1>
                </div>
                <div style={attributesStyle}>
                    <div className={"titleAndValueStyle"}>
                        <h3 style={titleStyle}> Author: </h3>
                        <p style={valueStyle}>{activity.author}</p>
                    </div>
                    <div style={{borderColor: "rgb(255,152,152)"}} className={"titleAndValueStyle"}>
                        <h3 style={titleStyle}> Group Size: </h3>
                        <p style={valueStyle}>{rangeToString(activity.playerCount)} people</p>
                    </div>
                    <div style={{borderColor: "rgb(170,255,113)"}} className={"titleAndValueStyle"}>
                        <h3 style={titleStyle}> Age Range: </h3>
                        <p style={valueStyle}>{rangeToString(activity.ageRange)} years</p>
                    </div>
                    <div style={{borderColor: "rgb(49,224,255)"}} className={"titleAndValueStyle"}>
                        <h3 style={titleStyle}> Duration: </h3>
                        <p style={valueStyle}>{rangeToString(activity.duration)} {activity.duration === [1,1] ? "minute" : "minutes"}</p>
                    </div>
                    <div style={{borderColor: "rgb(100,77,255)"}} className={"titleAndValueStyle"}>
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