import './App.css';
import React, { Component } from 'react'
import Navbar from './component/Navbar';
import News from './component/News';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";



// business entertainment general health science sports technology
export default class App extends Component {
  render() {
    return (
      <>
      <BrowserRouter>
      <Navbar Name="Nutshell News" />
      <Routes>

        <Route  exact path="/" element={<News key="general" category="General" country="in" />} />
        <Route  exact path="/business" element={<News key="business" category="Business" country="in" />} />
        <Route  exact path="/entertainment" element={<News key="entertainment" category="Entertainment" country="in" />} />
        <Route  exact path="/health" element={<News key="health" category="Health" country="in" />} />
        <Route  exact path="/sports" element={<News key="sports" category="Sports" country="in" />} />
        <Route  exact path="/technology" element={<News key="technology" category="Technology" country="in" />} />
        <Route  exact path="/Science" element={<News key="Science" category="Science" country="in" />} />
      
      </Routes>
      </BrowserRouter>
      </>
    )
  }
}

