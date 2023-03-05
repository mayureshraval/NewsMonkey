import './App.css';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom'

import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News';
export default class App extends Component {
  state = {
    searchQuery: '',
    country: 'in'
  };

  updateSearchQuery = (queryInput) => {
    this.setState({ searchQuery:queryInput});
  };
  changeCountry = (country)=>{
      this.setState({country:country});
  }
  pageSize = 6;
  apiKey = 'e98fb163b35540948d47d641f8de2821';
  
  render() {

    return (
      <>
      {/* 369587ef416f43f08d1de323235e3d56 , 7600e354bf9744889480e63d79b08801, e98fb163b35540948d47d641f8de2821 */}
      <Router>
          <Navbar updateSearchQuery={this.updateSearchQuery} changeCountry={this.changeCountry}/>
          <Routes>
            <Route exact path='/' element={<News key='All' pageSize={this.pageSize} apiKey={this.apiKey} sources={''} country={this.state.country} category={'general'} query = {this.state.searchQuery}/>} /> 

            <Route exact path='/business' element={<News key='business' pageSize={this.pageSize} apiKey={this.apiKey} sources={''} country={this.state.country} category={'business'} query = {this.state.searchQuery} />} /> 
              
            <Route exact path='/entertainment' element={<News key='entertainment' pageSize={this.pageSize} apiKey={this.apiKey} sources={''} country={this.state.country} category={'entertainment'} query = {this.state.searchQuery}/>} /> 
              
            <Route exact path='/health' element={<News key='health' pageSize={this.pageSize} apiKey={this.apiKey} sources={''} country={this.state.country} category={'health'} query = {this.state.searchQuery}/>} /> 
              
            <Route exact path='/science' element={<News key='science' pageSize={this.pageSize} apiKey={this.apiKey} sources={''} country={this.state.country} category={'science'} query = {this.state.searchQuery}/>} /> 
              
            <Route exact path='/sports' element={<News key='sports' pageSize={this.pageSize} apiKey={this.apiKey} sources={''} country={this.state.country} category={'sports'} query = {this.state.searchQuery}/>} /> 
              
            <Route exact path='/technology' element={<News key='technology' pageSize={this.pageSize} apiKey={this.apiKey} sources={''} country={this.state.country} category={'technology'} query = {this.state.searchQuery}/>} />

          </Routes>
      </Router>
      </>
    )
  }
}
