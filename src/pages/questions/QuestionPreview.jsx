import React from "react"
import "./QuestionPreview.css"
import { DataStore } from 'aws-amplify/datastore';
import { Question } from "../../models";
import Signin from "../components/Signin"
import { Account } from '../../models';
import { useEffect, useState } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { Authenticator } from '@aws-amplify/ui-react';


// The preview for a single question pulled from the database
export default function QuestionPreview({question, openReport, admin}) {
    const [isSignedIn, setSignedIn] = useState(true);
    const updateLikeCount = async(event, changeVal) => {
        try {
            const { userId } = await getCurrentUser();
            setSignedIn(true);
            if (!admin) {
                event.preventDefault();
                /* Models in DataStore are immutable. To update a record you must use the copyOf function
                to apply updates to the item’s fields rather than mutating the instance directly */
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
                if ((changeVal > 0) && update[0].postsLiked.find((element) => element === question.id) === undefined) {
                    await DataStore.save(
                        Account.copyOf(update[0], updated => {
                        const updateArray = updated.postsLiked.slice();
                        updateArray.push(question.id);
                        updated.postsLiked = updateArray;
                        // Check for if in disliked and remove it from there if it is
                        const index = updated.postDisliked.indexOf(question.id);
                        if (index > -1) {
                            const updateArrayDisliked = updated.postDisliked;
                            updateArrayDisliked.splice(index, 1);
                            updated.postDisliked = updateArrayDisliked
                            changeVal++;
                        }
                        })
                    );
                    await DataStore.save(
                        Question.copyOf(question, updated => {
                            updated.likes = question.likes + changeVal;
                        })
                    );
                    event.preventDefault();
                } else if ((changeVal < 0) && update[0].postDisliked.find((element) => element === question.id) === undefined) {
                    await DataStore.save(
                        Account.copyOf(update[0], updated => {
                        const updateArray = updated.postDisliked.slice();
                        updateArray.push(question.id);
                        updated.postDisliked = updateArray;
                        // Check for if in liked and remove it from there if it is
                        const index = updated.postsLiked.indexOf(question.id);
                        if (index > -1) {
                            const updateArrayliked = updated.postsLiked;
                            updateArrayliked.splice(index, 1);
                            updated.postsLiked = updateArrayliked
                            changeVal--;
                        }
                        })
                    );
                    await DataStore.save(
                        Question.copyOf(question, updated => {
                            updated.likes = question.likes + changeVal;
                        })
                    );
                } else {
                    changeVal = changeVal * -1;
                    await DataStore.save(
                        Account.copyOf(update[0], updated => {
                            // Check for if in disliked and remove it from there if it is
                            const index = updated.postDisliked.indexOf(question.id);
                            if (index > -1) {
                                const updateArrayDisliked = updated.postDisliked;
                                updateArrayDisliked.splice(index, 1);
                                updated.postDisliked = updateArrayDisliked
                            }
                            // Check for if in liked and remove it from there if it is
                            const index2 = updated.postsLiked.indexOf(question.id);
                            if (index2 > -1) {
                                const updateArrayliked = updated.postsLiked;
                                updateArrayliked.splice(index2, 1);
                                updated.postsLiked = updateArrayliked
                            }
                            console.log(update[0])
                        })
                    );
                    await DataStore.save(
                        Question.copyOf(question, updated => {
                            updated.likes = question.likes + changeVal;
                        })
                    );
                }
            }
        } catch (err) {
            setSignedIn(false);
        }
    }

    function onClick() {
        if (admin) {
            admin(question.id)
        }
    }

    useEffect(() => {
        (async () => {
            try {
                await getCurrentUser();
                setSignedIn(true);
            } catch (err) {
                console.log("Hello")
            }
        })()
    })


    const innerDivStyle = {
        border: "1px",
        borderStyle: "solid",
        borderColor: "rgb(200 200 200)",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        height: "100%"
    }


    const questionStyle = {fontSize: "3vmin", width: "95%", maxHeight: "65%", overflowY: "auto"}

    const bottomBar = {display: "flex", width: "100%", minHeight: "15%", margin: "auto 0 1% 0"}

    const likeNumStyle = {fontSize: "3.5vmin", flexGrow: 1, textAlign: "left", width: "10%"}

    const iconWithText = {display: "flex", width: "auto", flexGrow: 1, justifyContent: "center"}

    const icon = {margin: "auto 5% auto auto", flexShrink: 1, width: "3vmin", height: "auto"}

    const endorseStyle = {position: "absolute", top: "0", right: "0", width: "3vmin"}

    return ( <div className={"outerDivStyle2"}>
            <div style={innerDivStyle} onClick={onClick}>
                <div style={questionStyle}>
                    {question.question}
                </div>
                {question.endorsed && <img style={endorseStyle} src={"endorseplaceholder.png"} alt={"endorsed"}/>}
                <div style={bottomBar}>
                    <div style={iconWithText}>
                        <img style={icon} src={"likeplaceholder.png"} alt={"duration"} onClick={(thisEvent) => updateLikeCount(thisEvent, 1)}/>
                        <img style={icon} src={"dislikeplaceholder.png"} alt={"duration"} onClick={(thisEvent) => updateLikeCount(thisEvent, -1)}/>
                        <Signin trigger={!isSignedIn} setTrigger={setSignedIn}>
                            <h3>Please sign in</h3>
                            <Authenticator>
                            </Authenticator>
                        </Signin>
                        <div style={likeNumStyle}>
                            {question.likes}
                        </div>
                    </div>
                    {!admin && <button className={"reportStyle"} onClick={() => openReport(question.id)}> Report </button>}
                </div>
            </div>
        </div>)
}