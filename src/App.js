import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'
import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home/Home';
import MyProfile from './pages/MyProfile/MyProfile';
import Characters from './pages/Characters/Characters';
import PatchNotes from './pages/PatchNotes/PatchNotes';
import Share from './pages/Share/Share';
import NavBar from './pages/NavBar';

function App() {
  return (
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/heroes' element={<Characters/>} />
        <Route path='/characters' element={<Characters/>} />
        <Route path='/patch-notes' element={<PatchNotes/>} />
        <Route path='/patchNotes' element={<PatchNotes/>} />
        <Route path='/my-player' element={<MyProfile/>} />
        <Route path='/myProfile' element={<MyProfile/>} />
        <Route path= '/share' element={<Share/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
