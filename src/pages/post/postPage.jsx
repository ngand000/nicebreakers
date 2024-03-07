import {useSearchParams} from "react-router-dom";
import { Amplify } from 'aws-amplify';
import {Activity} from '../../models';
import config from '../../aws-exports.js';
import {useEffect, useState} from "react";
import {DataStore} from "aws-amplify/datastore";
import "./postPage.css"
import ImageWithCaption from "./ImageWithCaption";
import ReportPopup from "./ReportPopup";
import { getCurrentUser } from 'aws-amplify/auth';
import { Account } from '../../models';
import { Authenticator } from '@aws-amplify/ui-react';


Amplify.configure(config);

const PostPage = ({id}) => {
    const postParams = useSearchParams()[0]
    const [activity, setActivity] = useState({})
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [postID, setPostID] = useState()
    const [liked, setLiked] = useState(0)

    function rangeToString(r) {
        return (r && (r[0] === r[1] ? r[0] : r[0] + "-" + r[1]))
    }

    useEffect(() => {
        (async () => {
            if (!id) {
                setPostID(postParams.get('id'))
            } else {
                setPostID(id)
            }
            const { userId } = await getCurrentUser();
            const user = (await DataStore.query(Account, (c) => c.userId.eq(userId)))[0];
            if (user) {
                setLiked(0)
                if (user.postsLiked.indexOf(postID) >= 0) {
                    setLiked(1)
                } else if (user.postDisliked.indexOf(postID) >= 0) {
                    setLiked(-1)
                }
            }
            setActivity((await DataStore.query(Activity, (a) => a.and(a => [a.id.eq(postID)])))[0])})()
    })

    const updateLikeCount = async(event, changeVal) => {
        /* Models in DataStore are immutable. To update a record you must use the copyOf function
        to apply updates to the item’s fields rather than mutating the instance directly */
        const { userId } = await getCurrentUser();
        const original = await DataStore.query(Account, (c) => c.userId.eq(userId));
        if (original.length === 0) {
            await DataStore.save(
                new Account({
                    "userId": userId,
                    "postsLiked":  [],
                    "postsReported":  [],
                    "postDisliked":  [],
                    "Admin": false
                })
            );
        }
        const update = await DataStore.query(Account, (c) => c.userId.eq(userId));
        if ((changeVal > 0) && update[0].postsLiked.find((element) => element === activity.id) === undefined) {
            setLiked(1)
            await DataStore.save(
                Account.copyOf(update[0], updated => {
                const updateArray = updated.postsLiked.slice();
                updateArray.push(activity.id);
                updated.postsLiked = updateArray;
                // Check for if in disliked and remove it from there if it is
                let index = updated.postDisliked.indexOf(activity.id);
                if (index > -1) {
                    changeVal++
                }
                while (index > -1) {
                    const updateArrayDisliked = updated.postDisliked;
                    updateArrayDisliked.splice(index, 1);
                    updated.postDisliked = updateArrayDisliked
                    index = updated.postDisliked.indexOf(activity.id);
                }
                })
            );
            await DataStore.save(
                Activity.copyOf(activity, updated => {
                    updated.likes = activity.likes + changeVal;
                })
            );
            event.preventDefault();
        } else if ((changeVal < 0) && update[0].postDisliked.find((element) => element === activity.id) === undefined) {
            setLiked(-1)
            await DataStore.save(
                Account.copyOf(update[0], updated => {
                const updateArray = updated.postDisliked.slice();
                updateArray.push(activity.id);
                updated.postDisliked = updateArray;
                // Check for if in liked and remove it from there if it is
                let index2 = updated.postsLiked.indexOf(activity.id);
                if (index2 > -1) {
                    changeVal--
                }
                while (index2 > -1) {
                    const updateArrayliked = updated.postsLiked;
                    updateArrayliked.splice(index2, 1);
                    updated.postsLiked = updateArrayliked
                    index2 = updated.postsLiked.indexOf(activity.id);
                }
                })
            );
            await DataStore.save(
                Activity.copyOf(activity, updated => {
                    updated.likes = activity.likes + changeVal;
                })
            );
        } else {
            setLiked(0)
            changeVal = changeVal * -1;
            await DataStore.save(
                Account.copyOf(update[0], updated => {
                    // Check for if in disliked and remove it from there if it is
                    let index = updated.postDisliked.indexOf(activity.id);
                    while (index > -1) {
                        const updateArrayDisliked = updated.postDisliked;
                        updateArrayDisliked.splice(index, 1);
                        updated.postDisliked = updateArrayDisliked
                        index = updated.postDisliked.indexOf(activity.id);
                    }
                    // Check for if in liked and remove it from there if it is
                    let index2 = updated.postsLiked.indexOf(activity.id);
                    while (index2 > -1) {
                        const updateArrayliked = updated.postsLiked;
                        updateArrayliked.splice(index2, 1);
                        updated.postsLiked = updateArrayliked
                        index2 = updated.postsLiked.indexOf(activity.id);
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

    const headerStyle = {height: "16vmin", display: "flex", margin: "auto", width: "90vw", justifyContent: "flex-start", alignContent: "center"}

    const titleStyle = {margin: "auto auto auto auto"}

    const logoStyle = {height: "16vmin", margin: "0 1vmin 0 auto"}

    const valueStyle = {margin: "auto 0 auto 0"}

    const attributesStyle = {display: "flex"}

    const images = {display: "flex", overflowX: "auto"}

    const bottomBar = {display: "flex"}

    return (<div>
            {isPopupOpen && <ReportPopup closePopup={setIsPopupOpen} id={activity.id}/>}
            {activity && (<div>
                <div style={headerStyle}>
                    <a href={'/'}> <img src={"logoplaceholder.png"} alt={"logo"} style={logoStyle}/> </a>
                    <h1 style={{margin: "auto auto auto auto"}}>{activity.name}</h1>
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
                        <p style={valueStyle}>{Math.max(activity.likes, 0)}</p>
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
                <Authenticator>
                <div style={bottomBar}>
                    <img style={{backgroundColor: liked === 1 ? "rgb(64,240,248)" : "white"}} className={"likeDislikeStyle"} src={"likeplaceholder.png"} alt={"duration"} onClick={(thisEvent) => updateLikeCount(thisEvent, 1)}/>
                    <img style={{backgroundColor: liked === -1 ? "rgb(62,92,187)" : "white"}} className={"likeDislikeStyle"} src={"dislikeplaceholder.png"} alt={"duration"} onClick={(thisEvent) => updateLikeCount(thisEvent, -1)}/>
                    <button className={"reportStyle"} onClick={() => setIsPopupOpen(true)}> Report </button>
                </div>
                </Authenticator>
            </div>)}
        </div>
    )
}

export default PostPage;