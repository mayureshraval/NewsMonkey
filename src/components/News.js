import React, { Component } from 'react'
import Newsitem from './Newsitem'

export class News extends Component {
  constructor(){
    super();
    this.state = {
      articles: [],
      loading:false,
      page:1,
      disabled:false
    }
    // console.log(this.state.articles[0].author);
  }
  handlePrev= async ()=> {
      this.setState({page:this.state.page - 1});
      let getData = await fetch(`https://newsapi.org/v2/everything?domains=wsj.com&apiKey=7600e354bf9744889480e63d79b08801&page=${this.state.page -1}&pageSize=20`);
      let data = await getData.json();
      this.setState({articles:data.articles,totalResults:data.totalResults});
      console.log(this.state.page);
  }
  handleNext= async ()=>{
    // console.log(this.state.totalResults);
    if(this.state.page + 1 >= Math.ceil(this.state.totalResults/20)){
      this.setState({disabled:true})
      return;
    }
    else{
      let getData = await fetch(`https://newsapi.org/v2/everything?domains=wsj.com&apiKey=7600e354bf9744889480e63d79b08801&page=${this.state.page + 1}&pageSize=20`);
      let data = await getData.json();
      this.setState({articles:data.articles,totalResults:data.totalResults,page:this.state.page + 1,disabled:this.state.page + 1 >= Math.ceil(this.state.totalResults/20) });
      console.log(this.state.page);
    }
  }
  // component did mount is a functiion that executes when the ui is rendered.
  async componentDidMount(){
    let getData = await fetch(`https://newsapi.org/v2/everything?domains=wsj.com&apiKey=7600e354bf9744889480e63d79b08801&page=${this.state.page}&pageSize=20`);
    let data = await getData.json();
    this.setState({articles:data.articles,totalResults:data.totalResults});
    console.log(this.state.page);
  }

  render() {
    console.log('render');
    return (
        <>
            <div className='container my-3'>
                <h1 className='d-flex justify-content-center'>News Monkey Top Headlines</h1>
                <div className="row">
                {this.state.articles && this.state.articles.map((element)=>{
                  // console.log(element);  
                  return <div key={element.url} className="col-md-4 my-4 d-flex justify-content-center">
                        <Newsitem title={element.title?element.title.slice(0,45)+'...':''} description={element.description?element.description.slice(0,80)+'...':''} imgurl={element.urlToImage?element.urlToImage:'https://images.wsj.net/im-722610/social'} newsurl={element.url}/>
                    </div>
                })}
                {/* {!this.state.articles && <div><h3 className=' my-4 d-flex justify-content-center'>No more articles found. You are all caught up for today 😀</h3></div>} */}
                </div>
                <div className="btn container d-flex justify-content-between">
                <button type="button" className="btn btn-primary" disabled={this.state.page<=1}onClick={this.handlePrev}>&#8592; Prev</button>
                <button type="button" className="btn btn-primary" onClick={this.handleNext} disabled={this.state.disabled}>Next &#8594;</button>
                </div>
            </div>
        </>
    )
  }
}

export default News