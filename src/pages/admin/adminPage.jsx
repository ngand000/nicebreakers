import { Amplify } from "aws-amplify";
import {Activity, Question, Report} from '../../models';
import config from '../../aws-exports.js';
import {useEffect, useState, React} from "react";
import {DataStore} from "aws-amplify/datastore";
import { remove } from 'aws-amplify/storage';
import ReportList from './ReportList'
import "./adminPage.css"
import ActivityList from "../activities/ActivityList";
import PostPage from "../post/postPage";
import QuestionsList from "../questions/QuestionsList";

Amplify.configure(config)

const AdminPage = () => {
    // reports -> store reportedposts
    // setReports -> update the state
    const[reports, setReports] = useState([]);
    const[activities, setActivities] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [activityID, setActivityID] = useState();
    const [questionID, setQuestionID] = useState();

    useEffect(() => {
        const fetchReportedPosts = async () => {
            try {
                // fetch data from Amplify
                setActivities(await DataStore.query(Activity, (ac) => ac.timesReported.gt(0)));
                setQuestions(await DataStore.query(Question, (ac) => ac.timesReported.gt(0)))
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchReportedPosts();
    }, []);

    async function setActivity(id) {
        setQuestionID(undefined)
        if (activityID !== id) {
            setActivityID(id)
            setReports(await DataStore.query(Report, (r) => r.postId.eq(id)))
        } else {
            setActivityID(undefined)
            setReports([])
        }
    }

    async function setQuestion(id) {
        setActivityID(undefined)
        if (questionID !== id) {
            setQuestionID(id)
            setReports(await DataStore.query(Report, (r) => r.postId.eq(id)))
        } else {
            setQuestionID(undefined)
            setReports([])
        }
    }

    function compareReports(a, b) {
        return b.timesReported - a.timesReported
    }

    async function reset(id, q) {
        await DataStore.delete(Report, (r) => r.postId.eq(id))
        setActivityID(undefined)
        setQuestionID(undefined)
        setReports([])
        if (q) {
            setQuestions(questions.filter((q) => q.id !== id))
        } else {
            setActivities(activities.filter((q) => q.id !== id))
        }
    }

    async function resolve() {
        let q = questionID !== undefined
        let id = q ? questionID : activityID
        const original = await DataStore.query((q ? Question : Activity), id)
        await DataStore.save((q ? Question : Activity).copyOf(original, updated => {updated.timesReported = 0}))
        await reset(id, q)
        return
    }

    async function removePost() {
        let q = questionID !== undefined
        let id = q ? questionID : activityID
        if (q) {
            await DataStore.delete(Question, (r) => r.id.eq(id))
        } else {
            const original =  await DataStore.query(Activity, id)
            for (let i = 0; i < original.fileTypes.length; i++) {
                await remove({key: id + "img" + i + "." + original.fileTypes[i]})
            }
            await DataStore.delete(Activity, (r) => r.id.eq(id))
        }
        await DataStore.delete(Report, (r) => r.postId.eq(id))
        await reset(id, q)
        return
    }
    
    return (
        <div className="admin-container">
            <h1>Reported Activities</h1>
            <ActivityList activities={activities.sort(compareReports)} admin={setActivity} />
            {activityID && <button onClick={resolve}> Resolve </button>}
            {activityID && <button onClick={removePost}> Remove </button>}
            {(reports.length > 0 && activityID) && <ReportList reports={reports} />}
            {activityID && <PostPage id={activityID}/>}
            <h1>Reported Questions</h1>
            <QuestionsList questions={questions.sort(compareReports)} admin={setQuestion}/>
            {(reports.length > 0 && questionID) && <ReportList reports={reports} />}
            {questionID && <button onClick={resolve}> Resolve </button>}
            {questionID && <button onClick={removePost}> Remove </button>}
        </div>
    )


}

export default AdminPage;