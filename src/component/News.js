import React, { Component } from 'react'
import NewsItems from './NewsItems'
import "./style.css"
import noimage from "./noimage.jpg"
import Spinner from './Spinner'
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
    static defaultProps = {
        country: 'in',
        category: 'general'

    }


    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResult:0
        }
    }

    async updateNews(page) {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a3804b71fea845a7aa477d2abf0d83c7&pageSize=10&page=${page}`;
        // const url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=a3804b71fea845a7aa477d2abf0d83c7&pageSize=10&page=1`;
        const data = await fetch(url)
        this.setState({ loading: true })
        let parsedData = await data.json()
        // console.log(parsedData)
        this.setState({
            articles: parsedData.articles,
            totalResult: parsedData.totalResults,
            loading: false
        })
        console.log(this.state.totalResult)
    }


    async componentDidMount() {
        this.updateNews(this.state.page)
    }

    Previous= ()=>{
        this.setState({page:this.state.page -1})
        this.updateNews(this.state.page-1)        
    }
    
    Next= ()=>{ 
        this.setState({page:this.state.page +1})
        this.updateNews(this.state.page+1)
    }

    fetchMoreData = async()=>{
        this.setState({page:this.state.page + 1})
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a3804b71fea845a7aa477d2abf0d83c7&pageSize=10&page=${this.state.page+1}`;

        const data = await fetch(url)
        this.setState({ loading: true })
        let parsedData = await data.json()
        // console.log(parsedData)

        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResult: parsedData.totalResults,
            loading: false,
        }) 
    }

    render() {


        return (
            <>
                <h1 style={{ textAlign: "center", margin: "20px", textDecoration: "underline" }}>Top News on {this.props.category}</h1>

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    // style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                    hasMore={this.state.articles.length !== this.state.totalResult}//It is true then it means that data is still remain to load
                    loader={<Spinner/>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                          <b>Yay! You have seen it all</b>
                        </p>
                      }
                >

                {/* {this.state.loading && <Spinner />} */}
                <div className="container News-container">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div key={element.url}>
                            <NewsItems title={element.title} description={element.description} image={element.urlToImage === null ? noimage : element.urlToImage} url={element.url} />
                        </div>

                    })

                    }

                </div>
                </InfiniteScroll>

                {/* <div className="container  d-flex justify-content-between p-2" >
                    <button className="btn btn-primary" disabled={this.state.page<=1}  onClick={this.Previous} >&larr; Previous</button>
                    <button className="btn btn-primary" disabled={this.state.page+1>= Math.ceil((this.state.totalResult/10))} onClick={this.Next}>Next &rarr; </button>
                </div> */}
            </>
        )
    }
}
