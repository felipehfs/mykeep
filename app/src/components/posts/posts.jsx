import React from 'react'
import Header from '../template/Header'
import ReactQuill from 'react-quill'
import axios from 'axios'
import './posts.css'

class Posts extends React.Component {
    constructor(props) {
        super(props)
        this.state = { text: '', title: '' }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChangeInputText = this.onChangeInputText.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onChange(value) {
        this.setState({ text: value })
    }

    onChangeInputText(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()
        axios.post("http://localhost:3003/api/posts", { text: this.state.text,
             title: this.state.title })
            .then(resp => this.setState({ ...this.state, text: '', title: '' }))
    }
    render() {
        return(
            <React.Fragment>
                <Header />
                <div className="container mt-3">
                    <form>
                        <div className="form-group">
                            <input type="text" value={this.state.title} 
                                onChange={this.onChangeInputText}
                                name="title" className="form-control" 
                                placeholder="Digite seu título"/>
                        </div>
                        <div className="form-group">
                            <ReactQuill value={this.state.text}
                             theme="snow" onChange={this.onChange} className="content"/>
                        </div>
                        <div className="row mt-5">
                            <div className="col-12">
                                <a href="" className="btn btn-primary " onClick={this.onSubmit}>Salvar</a>
                            </div>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default Posts