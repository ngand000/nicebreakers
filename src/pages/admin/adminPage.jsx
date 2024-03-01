import { Amplify } from "aws-amplify";
import { Report } from '../../models';
import config from '../../aws-exports.js';
import {useEffect, useState, React} from "react";
import {DataStore} from "aws-amplify/datastore";

import "./adminPage.css"

Amplify.configure(config)

const AdminPage = () => {
    // reports -> store reportedposts
    // setReports -> update the state
    const[reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReportedPosts = async () => {
            try {
                // fetch data from Amplify
                const fetchReports = await DataStore.query(Report);

                // store to setReports
                setReports(fetchReports);
            } catch (error) {
                console.error("Error fetching reports:", error);
            }
        };

        fetchReportedPosts();
    }, []);
    
    return (
        <div className="admin-container">
            <h1>Reports</h1>
            {reports.map(report => (
                <div key={report.id}>
                    <h2>Report ID: {report.id}</h2>
                    <p>Author: {report.author}</p>
                    <p>Description: {report.report}</p>
                </div>
            ))}
        </div>
    )


}

export default AdminPage;