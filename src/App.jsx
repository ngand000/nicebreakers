import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';
import ActivitiesPage from "./pages/activities/ActivitiesPage";
import PostPage from "./pages/post/postPage";
import QuestionPage from "./pages/questions/QuestionsPage";
import ActivityUploadPage from "./pages/upload/ActivityUpload/ActivityUploadPage";
import QuestionUploadPage from "./pages/upload/QuestionUpload/QuestionUploadPage";

function App() {

  return (
      <div>
          <BrowserRouter>
            <Routes>
              { /* Put your page(s) here */}
              <Route path='/' element ={<ActivitiesPage />}/>s
              <Route path='/questions' element={<QuestionPage />}/>
              <Route path='/upload/ActivityUpload' element={<ActivityUploadPage />}/>
              <Route path='/upload/QuestionUpload' element={<QuestionUploadPage />}/>
              <Route path='/post' element={<PostPage />}/>
            </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
