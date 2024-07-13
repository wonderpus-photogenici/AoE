   import React from 'react';
     import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
     import { Provider } from 'react-redux';
     import Header from './components/Header.jsx';
     import Footer from './components/Footer.jsx';
     import Sidebar from './components/Sidebar.jsx';
     import Home from './pages/Home.jsx';
     import Profile from './pages/Profile.jsx';
     import NotFound from './pages/NotFound.jsx';
     import LogIn from './pages/LogIn.jsx';
     import SignUp from './pages/SignUp.jsx';
     import RootPage from './pages/RootPage.jsx';
     import store from './redux/store';
     import './App.scss';

     const App = () => {
       return (
         <Provider store={store}>
           <Router>
             <div>
               <main>
                 <Routes>
                   <Route path="/" element={<Home />} />
                   <Route path="/root" element={<RootPage />} />
                   <Route path="/signup" element={<SignUp />} />
                   <Route path="/login" element={<LogIn />} />
                   <Route path="/profile" element={<Profile />} />
                   <Route path="*" element={<NotFound />} />
                 </Routes>
               </main>
             </div>
           </Router>
         </Provider>
       );
     };

     export default App;