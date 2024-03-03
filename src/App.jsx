import { Routes, Route, HashRouter } from "react-router-dom";
import './App.css';
import ActivitiesPage from "./pages/activities/ActivitiesPage";
import PostPage from "./pages/post/postPage";
import QuestionPage from "./pages/questions/QuestionsPage";
import ActivityUploadPage from "./pages/upload/ActivityUpload/ActivityUploadPage";
import QuestionUploadPage from "./pages/upload/QuestionUpload/QuestionUploadPage";
import AdminPage from "./pages/admin/adminPage";

function App() {

    return (
        <div>
            <HashRouter>
                <Routes>
                    { /* Put your page(s) here */}
                    <Route path='/' element ={<ActivitiesPage />}/>s
                    <Route path='/questions' element={<QuestionPage />}/>
                    <Route path='/upload/ActivityUpload' element={<ActivityUploadPage />}/>
                    <Route path='/upload/QuestionUpload' element={<QuestionUploadPage />}/>
                    <Route path='/post' element={<PostPage />}/>
                    <Route path='/admin' element={<AdminPage />}/>
                </Routes>
            </HashRouter>
        </div>
    );
}

export default App;