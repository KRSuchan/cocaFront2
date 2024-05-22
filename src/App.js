// App.js
import React from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage'; // 로그인 페이지 컴포넌트
import MainPage from './MainPage'; // 메인 페이지 컴포넌트
import SignUp from './SignupPage'; //회원가입 페이지
import GroupPage from './GroupPage' // 그룹페이지
import SettingPage from './SettingPage'; // 설정페이지
import LoginCheckPage from './LoginCheckPage';
import EditGroupPage from './groupComp/EditGroupPage';

import NoticePage from './NoticePage';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';

const store = createStore(reducer);


function App() {
  return (
    <Provider store={store}>
    <Router>
      <Helmet>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lexend+Zetta&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap" />
      </Helmet>
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/group' element={<GroupPage/>}/>
        <Route path='/setting' element={<SettingPage/>}/>
        <Route path='/check' element={<LoginCheckPage/>}/>
        <Route path='/editgroup' element={<EditGroupPage/>}/>
        <Route path='/editgroup/:groupId' element={<EditGroupPage/>}/>
        <Route path='/notice' element={<NoticePage/>}/>
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
