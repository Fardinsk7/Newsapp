import React, { Component } from 'react'
import NewsItems from './NewsItems'
import "./style.css"
import noimage from "./noimage.jpg"
import Spinner from './Spinner'

export default class News extends Component {
    static defaultProps = {
        country: 'in',
        category: 'general'

    }


    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
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
    }


    async componentDidMount() {
        this.updateNews(this.state.page)
        console.log(Math.ceil((this.state.totalResult / 10)))
        
    }

    Previous= async ()=>{
        this.setState({page:this.state.page-1})
        this.updateNews(this.state.page)
        
        console.log("previous",this.state.page)
    }
    
    Next=()=>{
        this.setState({page:this.state.page+1})
        this.updateNews(this.state.page)
        console.log('next',this.state.page)
    }


    render() {


        return (
            <>
                <h1 style={{ textAlign: "center", margin: "20px", textDecoration: "underline" }}>Top News on {this.props.category}</h1>
                {this.state.loading && <Spinner />}
                <div className="container News-container">
                    {this.state.articles.map((element) => {
                        return <div key={element.url}>
                            <NewsItems title={element.title} description={element.description} image={element.urlToImage === null ? noimage : element.urlToImage} url={element.url} />
                        </div>

                    })

                    }

                </div>
                <div className="container  d-flex justify-content-between p-2" >
                    <button className="btn btn-primary" disabled={this.state.page<=1}  onClick={this.Previous} >&larr; Previous</button>
                    <button className="btn btn-primary" disabled={this.state.page+1>= Math.ceil((this.state.totalResult/10))} onClick={this.Next}>Next &rarr; </button>
                </div>
            </>
        )
    }
}
