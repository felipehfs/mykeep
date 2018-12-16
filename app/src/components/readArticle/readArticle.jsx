import React from 'react'
import Header from '../template/Header'
import axios from 'axios'
import HtmlReactParser from 'html-react-parser'

export default class ReadArticle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            article: {}
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id 
        axios.get(`http://localhost:3003/api/posts/${id}`).then(resp => {
            const {state} = this 
            state.article = resp.data
            state.article.text = HtmlReactParser(state.article.text)
            this.setState(state)
        })
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="container mt-5">
                    <h1 className="h1">{this.state.article.title}</h1>
                    {this.state.article.text}
                </div>
            </React.Fragment>
        )
    }
}