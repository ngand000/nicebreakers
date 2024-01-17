import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';
import ActivitiesPage from "./pages/activities/activitiesPage";
import PostPage from "./pages/post/postPage";
import QuestionPage from "./pages/questions/questionsPage";
import UploadPage from "./pages/upload/uploadPage";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          { /* Put your page(s) here */}
          <Route path='/' element ={<ActivitiesPage />}/>s
          <Route path='/questions' element={<QuestionPage />}/>
          <Route path='/upload' element={<UploadPage />}/>
          <Route path='/post' element={<PostPage />}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
