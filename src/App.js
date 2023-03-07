import './App.css';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News';
export default class App extends Component {
  pageSize = 6;
  apiKey = process.env.REACT_APP_API_KEY;
  state = {
    searchQuery: '',
    country: 'in',
    progress:0
  };

  updateSearchQuery = (queryInput) => {
    this.setState({ searchQuery:queryInput});
  };
  changeCountry = (country)=>{
      this.setState({country:country});
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  
  render() {

    return (
      <>
      <Router>
         <LoadingBar
            color='#11951e'
            progress={this.state.progress}
            height='3px'
          />
          <Navbar updateSearchQuery={this.updateSearchQuery} changeCountry={this.changeCountry}/>
          <Routes>
            <Route exact path='/' element={<News setProgress={this.setProgress} key='All' pageSize={this.pageSize} apiKey={this.apiKey} sources={''} country={this.state.country} category={'general'} query = {this.state.searchQuery}/>} /> 

            <Route exact path='/business' element={<News setProgress={this.setProgress} key='business' pageSize={this.pageSize} apiKey={this.apiKey} sources={''} country={this.state.country} category={'business'} query = {this.state.searchQuery} />} /> 
              
            <Route exact path='/entertainment' element={<News setProgress={this.setProgress} key='entertainment' pageSize={this.pageSize} apiKey={this.apiKey} sources={''} country={this.state.country} category={'entertainment'} query = {this.state.searchQuery}/>} /> 
              
            <Route exact path='/health' element={<News setProgress={this.setProgress} key='health' pageSize={this.pageSize} apiKey={this.apiKey} sources={''} country={this.state.country} category={'health'} query = {this.state.searchQuery}/>} /> 
              
            <Route exact path='/science' element={<News setProgress={this.setProgress} key='science' pageSize={this.pageSize} apiKey={this.apiKey} sources={''} country={this.state.country} category={'science'} query = {this.state.searchQuery}/>} /> 
              
            <Route exact path='/sports' element={<News setProgress={this.setProgress} key='sports' pageSize={this.pageSize} apiKey={this.apiKey} sources={''} country={this.state.country} category={'sports'} query = {this.state.searchQuery}/>} /> 
              
            <Route exact path='/technology' element={<News setProgress={this.setProgress} key='technology' pageSize={this.pageSize} apiKey={this.apiKey} sources={''} country={this.state.country} category={'technology'} query = {this.state.searchQuery}/>} />

          </Routes>
          
      </Router>
      
      </>
    )
  }
}
