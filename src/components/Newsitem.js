import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, publishedAt ,content} = this.props;
    let dateTime = new Date(publishedAt);
    let formatted = dateTime.toGMTString();
    return (
      <>
        <div className="card" style={{ width: '24rem' }}>
          <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-success" style={{zIndex:'1'}}>
             {author ? author : "unknown"}
          </span> 
          <img src={imageUrl} style={{ width: '100%', height: '150px' }} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description? description:content}</p>
            <p className="card-text"><small className="text-muted">
             Published - {formatted}</small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-dark">Read more</a>
          </div>
        </div>
      </>
    )
  }
}

export default Newsitem