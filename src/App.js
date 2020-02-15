import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/Home';
import Instructions from './components/Quiz/Instructions';
import Play from './components/Quiz/Play';
import Results from './components/Quiz/Results';

function App() {
  return (
   <BrowserRouter>
     <Route path= '/' exact component = {Home}/>
     <Route path= '/play/instructions' exact component = {Instructions}/>
     <Route path= '/play' exact component = {Play}/>
     <Route path= '/play/results' exact component = {Results}/>
   </BrowserRouter>
  );
}

export default App;
