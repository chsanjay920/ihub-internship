import React, { useState, useEffect } from 'react';
import Exjson from './pages/Exjson';
import YourWork from './pages/YourWork';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Temp from "./Temp";
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts';
import Auth from './components/Auth/Auth';


const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const [currentP,setCurrentP] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId,currentP, dispatch]);

  return ( 
    <Router>
     <Routes>
       <Route exact path="*" element={<Navigate to="/" replace />}/>
       <Route exact path="/"  element={<Temp currentId={currentId} setCurrentId={setCurrentId} currentP={currentP} setCurrentP={setCurrentP}/>} />
       
       <Route exact path="/posts/search" element={<Temp currentId={currentId} setCurrentId={setCurrentId} currentP={currentP} setCurrentP={setCurrentP}/>} />
       <Route exact path="/posts/yourWork" element={<YourWork currentId={currentId} setCurrentId={setCurrentId} currentP={currentP} setCurrentP={setCurrentP}/>} />
       <Route exact path='/auth' element={<Auth />}/>
       <Route exact path="/user" element={<Exjson currentId={currentId} currentP={currentP} />}/>
     </Routes>
   </Router>
  );
};

export default App;