import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import AllRoutes from './AllRoutes';
import './App.css';
import { fetchAllQuestions } from './actions/question';
import { fetchAllUsers } from './actions/users';
import Navbar from './components/Navbar/Navbar';

function App() {
  const dispatch =useDispatch()
  useEffect (() =>{
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers())
  },[dispatch])
  return (
    <div className="App">
    <Router>
      <Navbar/>
      <AllRoutes/>
      </Router>
    </div>
  );
}

export default App;
