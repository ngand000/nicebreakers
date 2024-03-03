import React, {useState} from 'react';
import './ReportPopup.css';
import { Amplify } from 'aws-amplify';
import config from '../../aws-exports.js';
import {DataStore} from "aws-amplify/datastore";
import {Activity, Question, Report} from "../../models";

Amplify.configure(config);

// the popup wherein the user can input what value they want to filter by
export default function ReportPopup({closePopup, id, q}) {

    const [text, setText] = useState('')

    async function report() {
        const original = await DataStore.query((q ? Question : Activity), id)
        const report = await DataStore.save(new Report({postId: id, reason: text, isActivity: !q}))
        const n = await DataStore.save((q ? Question : Activity).copyOf(original, updated => {updated.timesReported = original.timesReported + 1}))
        console.log(n)
        console.log(report)
        return
    }

    return (
        <div className={"popup-container"}>
            <div className={"popup"}>
                <h2>{"Report " + (q ? "Question" : "Activity")}</h2>
                <input type={"text"} onChange={(e) => {setText(e.target.value)}}/>
                <div>
                    <button onClick={async () => {await report(); closePopup(false)}}> Report </button>
                    <button onClick={() => (closePopup(false))}> Go Back </button>
                </div>
            </div>
        </div>
    );
};