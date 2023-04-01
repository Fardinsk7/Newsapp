import React, { Component } from 'react'
import "./style.css"
import{Link} from "react-router-dom"

export default class NewsItems extends Component {
    render() {
        let {title,description,image,url} = this.props
        return (
            <>
                <div className="card News-items" style={{height:"auto"}}>
                    <img src={image} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <Link to={url} className="btn btn-primary" target={'_blank'}  rel="noopener noreferrer">Visit News</Link>
                        </div>
                </div>
               
              

            </>
        )
    }
}
