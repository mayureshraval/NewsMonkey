import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

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
            loading: false,
            page: 1,
            prevQuery:'',
            prevCountry:'in'
        }
       
        document.title ="NewsMonkey - " + (this.props.category==='general'? 'All' : this.capitalizeFirstLetter(this.props.category));
    }
    
    async handleUpdate() {
        let url = `https://newsapi.org/v2/top-headlines?sources=${this.props.sources}&country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}&sortBy=popularity&q=${this.props.query}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, prevQuery:this.props.query })
        this.setState({ loading: false });    }
    
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
    handlePrevClick =  () => {
        this.setState({ page: this.state.page - 1, }, () => {
            this.handleUpdate();
        });
    }

    handleNextClick = () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            this.setState({ page: this.state.page + 1, }, () => {
                this.handleUpdate();
            });
        }
    }

    render() {
        return (
            <div className="container my-3">
                <h1 className='text-center my-2'>NewsMonkey - Top {this.props.category!=='general' && this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                <br />
                <h5 className='text-muted text-center'>{this.props.query!=='' && "🔎 Search results for " + this.props.query + " - " + this.state.totalResults}</h5>
                <div className="row">
                    {!this.state.loading && this.state.articles && this.state.articles.map((element) => {
                        return <div className="col-md-4 my-4 d-flex justify-content-center" key={element.url}>
                            <Newsitem title={element.title ? element.title.slice(0, 60) + '...' : ""} description={element.description ? element.description.slice(0, 85) + '...' : ""} imageUrl={element.urlToImage ? element.urlToImage : './news.jpg'} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} content={element.content} source={element.source.name}/>
                        </div>
                    })}
                    {!this.state.articles && <h2 className='text-center my-5'>Sorry We are down 😵!</h2>}
                    {this.state.totalResults===0 && <h2 className='text-center my-5'>No articles for {this.props.query} in this category, try other categories.</h2>}
                </div>
                {this.state.articles && <div className="container d-flex justify-content-between my-4">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                    {this.state.loading && <Spinner />}
                    <button type="button" className="btn btn-dark" onClick={this.handleNextClick} disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}>Next &rarr;</button>
                </div>}
            </div>
        )
    }
}

export default News
