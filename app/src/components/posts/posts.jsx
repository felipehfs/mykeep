import React from 'react'
import Header from '../template/Header'
import ReactQuill from 'react-quill'
import axios from 'axios'
import './posts.css'
import { ToastContainer, toast } from 'react-toastify'

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

    showError(message){
        toast.error(message, {
            position: "top-center",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
            });
    }

    onSubmit(e) {
        e.preventDefault()
        if (this.state.title === '' && this.state.text === '') {
            this.showError("Preencha os campos corretamente")
            return
        }
        axios.post("http://localhost:3003/api/posts", {
            text: this.state.text,
            title: this.state.title
        })
            .then(resp => this.setState({ ...this.state, text: '', title: '' }))
            .catch(err => this.showError(err))
    }
    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="container mt-3">
                    <form>
                        <div className="form-group">
                            <input type="text" value={this.state.title}
                                onChange={this.onChangeInputText}
                                name="title" className="form-control"
                                placeholder="Digite seu título" />
                        </div>
                        <div className="form-group">
                            <ReactQuill value={this.state.text}
                                theme="snow" onChange={this.onChange} className="content" />
                        </div>
                        <div className="row mt-5">
                            <div className="col-12">
                                <a href="" className="btn btn-primary " onClick={this.onSubmit}>Salvar</a>
                            </div>
                        </div>
                    </form>
                </div>
                <ToastContainer
                    position="top-center"
                    autoClose={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                />
            </React.Fragment>
        )
    }
}

export default Posts