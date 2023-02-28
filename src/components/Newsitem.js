import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let {title,description,imageUrl,newsurl} = this.props;
    return (
        <>
           <div className="card" style={{width: '18rem'}}>
            <img src={imageUrl} style={{width:'100%',height:'150px'}} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <a href={newsurl} target="_blank" rel="noreferrer" className="btn btn-primary">Read more</a>
            </div>
          </div>
        </>
    )
  }
}

export default Newsitem