import './App.css';
import { Route, Routes } from 'react-router-dom';
import { AdminSignup } from './page/admin/signup/signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserSignup } from './page/user/signup/signup';
import { PrivateRoute } from './adminPrivateRouter/PrivateRouter';
import { CreateQuestion } from './page/admin/createQuestion/questions';
import { AllQuizLinkPage } from './page/admin/AllQuizLinkPage/page';
import { AdminLogin } from './page/admin/login/login';
import { CheckAuthRoute } from './adminPrivateRouter/checkAuth';
import { CheckAuthUser } from './userPrivateRouter/checkAuth';
import { PrivateRouteUser } from './userPrivateRouter/private';
import { QuestionsPage } from './page/user/Questions/Questions';
import { UserLogin } from './page/user/login/login';


function App() {
  return (
    <div className="App">

      <Routes>
        <Route path='/question/:uniqueId/:questionNo' element={<PrivateRoute>
          <CreateQuestion/>
        </PrivateRoute>} />
        <Route path='/allquizlink' element={<PrivateRoute>
          <AllQuizLinkPage />
        </PrivateRoute>} />
        <Route path="/user_register/:uniqueId" element={<PrivateRouteUser><UserSignup /></PrivateRouteUser>} />
        <Route path="/user_login/:uniqueId" element={<PrivateRouteUser><UserLogin /></PrivateRouteUser>} />
        <Route path="/register" element={<CheckAuthRoute><AdminSignup /></CheckAuthRoute>} />
        <Route path="/" element={<CheckAuthRoute><AdminLogin /></CheckAuthRoute>} />
        <Route path="/user/quiz/:uniqueId" element={<CheckAuthUser><QuestionsPage /></CheckAuthUser>} />
      </Routes>

      <ToastContainer />

      {/* <header className="App-header">
       
        <Button as="a" variant="success">
                  Learn React
        </Button>
      </header> */}
    </div>
  );
}

export default App;
