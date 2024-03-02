import { Amplify } from "aws-amplify";
import {Activity, Report} from '../../models';
import config from '../../aws-exports.js';
import {useEffect, useState, React} from "react";
import {DataStore} from "aws-amplify/datastore";
import ReportList from './ReportList'

import "./adminPage.css"
import ActivityList from "../activities/ActivityList";
import PostPage from "../post/postPage";

Amplify.configure(config)

const AdminPage = () => {
    // reports -> store reportedposts
    // setReports -> update the state
    const[reports, setReports] = useState([]);
    const[activities, setActivities] = useState([]);
    const [activityID, setActivityID] = useState();

    useEffect(() => {
        const fetchReportedPosts = async () => {
            try {
                // fetch data from Amplify
                setActivities(await DataStore.query(Activity, (ac) => ac.timesReported.gt(0)));
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchReportedPosts();
    }, []);

    async function setActivity(id) {
        setActivityID(id)
        setReports(await DataStore.query(Report, (r) => r.postId.eq(id)))
    }
    
    return (
        <div className="admin-container">
            <ActivityList activities={activities} admin={setActivity}></ActivityList>
            <p>{reports.length > 0 && <ReportList reports={reports} />}</p>
            {activityID && <PostPage id={activityID}/>}
        </div>
    )


}

export default AdminPage;