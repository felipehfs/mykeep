import React from 'react'
import Header from '../template/Header'
import ArticleList from './ArticlesList'
import axios from 'axios'
import { Link} from 'react-router-dom'

class Article extends React.Component {
    state = {
        articles: []
    }
    componentDidMount(){
        axios.get("http://localhost:3003/api/posts")
            .then(resp => this.setState({ articles: resp.data }))
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <Link to="/articles/new" className="btn btn-outline-primary mt-3 ml-3">New Article</Link>
                <div className="container mt-4">
                    <ArticleList rows={this.state.articles} />
                </div>
            </React.Fragment>
        )
    }
}

export default Article