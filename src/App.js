import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Login from './Pages/Login';
import Book from './Pages/Book';
import Chat from './Pages/Chat';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
      <Route exact path="/" element={ <Login handleLogin={handleLogin} />}/>
        <Route exact path="/dashboard" element={<Home />}/>
        <Route exact path="/book" element={<Book />}/>
        <Route exact path="/chat" element={<Chat />}/>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
  );
};

export default App;
