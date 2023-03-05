import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export class Navbar extends Component {
  state ={
    queryInput: '',
    country:'in'
  };
// use fat arrow to solve the this binding issue.
  handleOnchange= (event) =>{
   this.setState({queryInput : event.target.value.trim()});
  }
  handleOnclick= ()=> {
    console.log(this.state.queryInput);
    this.props.updateSearchQuery(this.state.queryInput);
  }
  
  changeCountry=(e)=>{
      this.props.changeCountry(e.target.id);  
      this.setState({country:e.target.id})
  }

  componentDidMount() {
    // Add event listener to listen for the slash key
    document.addEventListener("keydown", this.handleSlashKey);
  }

  componentWillUnmount() {
    // Remove event listener when the component unmounts
    document.removeEventListener("keydown", this.handleSlashKey);
  }

  handleSlashKey = (event) => {
    // Check if the slash key was pressed
    if (event.key === "/") {
      // Set focus on the search input field
      document.getElementById("searchInput").focus();
      event.preventDefault();
      // to avoid typing / after focus
    }
  }
  render() {
    return (
      <div>
            <nav className="navbar navbar-expand-lg bg-dark " data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">NewsMonkey</a>
                    <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon bg-light"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-center">
                        <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/">All</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/business">Business</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/entertainment">Entertainment</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/health">Health</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/science">Science</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/sports">Sports</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/technology">Technology</Link>
                        </li>
                        
                         {/* country */}
                          <li className="nav-item">
                            <div className="dropdown">
                              <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Country - {this.state.country.toUpperCase()}
                              </button>
                              <ul className="dropdown-menu">
                                <li>
                                  <button className="dropdown-item" type="button" onClick={this.changeCountry} id='in'>
                                    <img src="https://flagcdn.com/16x12/in.png" width="16" height="12" alt="India"></img> India 
                                  </button>
                                </li>
                                <li>
                                  <button className="dropdown-item" type="button" onClick={this.changeCountry} id='us'>
                                    <img src="https://flagcdn.com/16x12/us.png" width="16" height="12" alt="USA"></img> USA
                                  </button>
                                </li>
                                <li>
                                  <button className="dropdown-item" type="button" onClick={this.changeCountry} id='ru'>
                                    <img src="https://flagcdn.com/16x12/ru.png" width="16" height="12" alt="Russia"></img> Russia 
                                  </button>
                                </li>
                                <li>
                                  <button className="dropdown-item" type="button" onClick={this.changeCountry} id='cn'>
                                    <img src="https://flagcdn.com/16x12/cn.png" width="16" height="12" alt="China"></img> China
                                  </button>
                                </li>
                              
                              </ul>
                            </div>
                          </li>
                         {/* country */}
                    </ul>
                   
                    <div className="d-flex" >
                        <input className="form-control me-2" type="text"id= 'searchInput' placeholder="Search" aria-label="Search" onChange={this.handleOnchange} 
                        onKeyDown={(e)=> { if(e.key==='Enter') this.handleOnclick()}} />
                          <button className="btn btn-outline-success" type='button' onClick={this.handleOnclick}>Search</button>
                    </div>
                    </div>
                </div>
                </nav>
      </div>
    )
  }
}

export default Navbar ;