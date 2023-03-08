import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import Placeholder from './Placeholder';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
    static defaultProps = {
        country: 'us',
        pageSize: 6,
        apiKey: '7600e354bf9744889480e63d79b08801',
        sources: '',
        category: 'general',
        query:'',
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        apiKey: PropTypes.string,
        sources: PropTypes.string,
        category: PropTypes.string
    }
    capitalizeFirstLetter=(string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            prevQuery:'',
            prevCountry:'in',
            totalResults:0
        }
       
        document.title ="NewsMonkey - " + (this.props.category==='general'? 'All' : this.capitalizeFirstLetter(this.props.category));
    }
    
    async handleUpdate() {
        this.props.setProgress(20);
        let url = `https://newsapi.org/v2/top-headlines?sources=${this.props.sources}&country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}&sortBy=popularity&q=${this.props.query}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(40);
        let parsedData = await data.json()
        this.props.setProgress(80);
        console.log(parsedData);
        this.setState({ loading: false }); 

        this.setState({  totalResults: parsedData.totalResults, articles: parsedData.articles,prevQuery:this.props.query })
        this.props.setProgress(100);  
    }
    
    componentDidMount() {
            this.handleUpdate();
    }
    componentDidUpdate(){
        if (this.state.prevQuery!==this.props.query) {
                this.setState({prevQuery:this.props.query});
                this.handleUpdate();
                this.setState({page:1});
                return console.log('componentDidUpdate() fired query');
        }
        else if(this.state.prevCountry!==this.props.country){
            this.setState({prevCountry:this.props.country});
            this.handleUpdate();
            this.setState({page:1});
            return console.log('componentDidUpdate() fired country');
        }
    }
    fetchMoreData=()=>{
        this.setState({page:this.state.page + 1} , async ()=>{
             this.setState({ loading: true });
            
            this.props.setProgress(20);
            let url = `https://newsapi.org/v2/top-headlines?sources=${this.props.sources}&country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}&sortBy=popularity&q=${this.props.query}`;
            let data = await fetch(url);
            this.props.setProgress(40);
            let parsedData = await data.json()
            this.props.setProgress(80);
            console.log(parsedData);
            this.setState({ loading: false }); 
            
            // when new articles come we add them to previous articles.
            this.setState({totalResults: parsedData.totalResults, articles: this.state.articles.concat(parsedData.articles),  prevQuery:this.props.query })
            this.props.setProgress(100);
        })
    }

    render() {
        return (
            <div className="container my-3">
                <h1 className='text-center my-2'>NewsMonkey - Top {this.props.category!=='general' && this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                <br />
                <h5 className='text-muted text-center'>{this.props.query!=='' && "🔎 Search results for " + this.props.query + " - " + this.state.totalResults}</h5>
                {/* {this.state.loading && <Spinner/>} */}
                {this.state.loading && <Placeholder totalResults={6}/> }

               
                {/* infinite scroll */}
                {this.state.articles && 
                 <InfiniteScroll
                 dataLength={this.state.articles.length}
                 next={this.fetchMoreData}
                 hasMore={this.state.articles.length!==this.state.totalResults}
                 loader={<Placeholder totalResults={6}/>}
                 style={{overflow:'hidden'}}>
                    <div className="row">
                        {this.state.articles && this.state.articles.map((element) => {
                            return <div className="col-md-4 my-4 d-flex justify-content-center" key={element.url}>
                                <Newsitem title={element.title ? element.title.slice(0, 60) + '...' : ""} description={element.description ? element.description.slice(0, 85) + '...' : ""} imageUrl={element.urlToImage ? element.urlToImage : './news.jpg'} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} content={element.content} source={element.source.name}/>
                            </div>
                        })}
                    
                    </div>
                    </InfiniteScroll>
                }
               
                {!this.state.articles && <h2 className='text-center my-5'>Sorry We are down 😵!</h2>}
                {!this.state.loading && this.state.totalResults===0 && <h2 className='text-center my-5'>No articles for {this.props.query} in this category, try other categories.</h2>}
                {/* infinite scroll */}
              
            </div>
        )
    }
}

export default News
