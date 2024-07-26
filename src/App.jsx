import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Sidebar from './components/HomeComponents/SidebarRight.jsx';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import NotFound from './pages/NotFound.jsx';
import LogIn from './pages/LogIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Chat from './pages/Chat.jsx';
import store from './redux/store';
import SupabaseLogin from './pages/SupabaseLogin.jsx';
import Messages from './pages/Messages.jsx';
import './App.scss';


const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/profile/*" element={<Profile />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/supabaselogin" element={<SupabaseLogin />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Router>
    </Provider>
  );
};


export default App;