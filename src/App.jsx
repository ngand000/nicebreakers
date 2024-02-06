import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';
import ActivitiesPage from "./pages/activities/ActivitiesPage";
import PostPage from "./pages/post/postPage";
import QuestionPage from "./pages/questions/questionsPage";
import UploadPage from "./pages/upload/uploadPage";
import { Amplify } from 'aws-amplify';
import config from './aws-exports.js';

Amplify.configure(config);

function App() {

    const linkStyle = {textDecoration: "none", height: 0}

    const headerStyle = {fontSize: "5vh", color: "black", textAlign: "center"}

  return (
      <div>
          <a href="/" style={linkStyle}>
              <p style={headerStyle}> Nicebreakers Logo </p>
          </a>
          <BrowserRouter>
            <Routes>
              { /* Put your page(s) here */}
              <Route path='/' element ={<ActivitiesPage />}/>s
              <Route path='/questions' element={<QuestionPage />}/>
              <Route path='/upload' element={<UploadPage />}/>
              <Route path='/post' element={<PostPage />}/>
            </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
