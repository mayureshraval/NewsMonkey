import './App.css';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom'

import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News';
export default class App extends Component {
  pageSize = 6;
  country = 'in';
  apiKey = '369587ef416f43f08d1de323235e3d56';
  render() {
    return (
      <>
      {/* 369587ef416f43f08d1de323235e3d56 , 7600e354bf9744889480e63d79b08801 */}
      <Router>
          <Navbar/>
          <Routes>
            <Route exact path='/' element={<News key='All' pageSize={this.pageSize} apiKey={this.apiKey} sources={''} country={this.country} category={'general'}/>} /> 

            <Route exact path='/business' element={<News key='business' pageSize={this.pageSize} apiKey={this.apiKey} sources={''} country={this.country} category={'business'}/>} /> 
              
            <Route exact path='/entertainment' element={<News key='entertainment' pageSize={this.pageSize} apiKey={this.apiKey} sources={''} country={this.country} category={'entertainment'}/>} /> 
              
            <Route exact path='/health' element={<News key='health' pageSize={this.pageSize} apiKey={this.apiKey} sources={''} country={this.country} category={'health'}/>} /> 
              
            <Route exact path='/science' element={<News key='science' pageSize={this.pageSize} apiKey={this.apiKey} sources={''} country={this.country} category={'science'}/>} /> 
              
            <Route exact path='/sports' element={<News key='sports' pageSize={this.pageSize} apiKey={this.apiKey} sources={''} country={this.country} category={'sports'}/>} /> 
              
            <Route exact path='/technology' element={<News key='technology' pageSize={this.pageSize} apiKey={this.apiKey} sources={''} country={this.country} category={'technology'}/>} /> 
          </Routes>
      </Router>
      </>
    )
  }
}
