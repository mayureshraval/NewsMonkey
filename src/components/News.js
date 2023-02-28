import React, { Component } from 'react'
import Newsitem from './Newsitem'

export class News extends Component {

    constructor(){
        super();
        this.state = {
            articles: [],
            loading: false,
            page:1,
            disabled:false
        }
    }

    async componentDidMount(){ 
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=7600e354bf9744889480e63d79b08801&page=1pageSize=20";
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData); 
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults})
    }

     handlePrevClick = async ()=>{
        console.log("Previous");
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=7600e354bf9744889480e63d79b08801&page=${this.state.page - 1}&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);  
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            disabled:false
        })

    }
    
     handleNextClick = async ()=>{
        console.log("Next"); 
        if (this.state.page + 1 > Math.ceil(this.state.totalResults/20)){
            this.setState({disabled:true});
            alert('No More articles, click on previous!')
        }
        else{
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=7600e354bf9744889480e63d79b08801&page=${this.state.page + 1}&pageSize=20`;
            let data = await fetch(url);
            let parsedData = await data.json()
            console.log(parsedData);  
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
            })
    }
    }

    render() { 
        return (
            <div className="container my-3">
                <h1>NewsMonkey - Top Headlines</h1> 
                <div className="row"> 
                {this.state.articles.map((element)=>{
                    return <div className="col-md-4 my-4" key={element.url}>
                        <Newsitem title={element.title?element.title.slice(0,40):""} description={element.description?element.description.slice(0,70):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
                    </div> 
                })} 
                </div> 
                <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                <button type="button" className="btn btn-dark" onClick={this.handleNextClick} disabled={this.state.disabled}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
