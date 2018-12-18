import React from 'react'
import './User.css'
import axios from 'axios'
import {setUser} from "../../store/actions"
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'

const minLengthPassword = 8

class User extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isSignOut: false,
            name: '',
            email: '',
            password: ''
        }

        this.onChange = this.onChange.bind(this)
        this.toggleSignOut = this.toggleSignOut.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.hasCorrectSignout = this.hasCorrectSignout.bind(this)
    }

    toggleSignOut(e) {
        e.preventDefault()
        this.setState({
            ...this.state,
            name: '',
            email: '',
            password: '',
            isSignOut: !this.state.isSignOut
        })
    }

    hasCorrectSignout(){
        const {name, email, password} = this.state
        return name.length > 0 && email.length > 0 && password.length >= minLengthPassword
    }

    onSubmit(e) {
        const {name, email, password, isSignOut} = this.state
        e.preventDefault()
        if (isSignOut){
            if (this.hasCorrectSignout()) {
                axios.post("http://localhost:3003/register", {name, email, password})
                .then(resp => {
                    this.setState({
                        ...this.state,
                        name: '',
                        email: '',
                        password: '',
                        isSignOut: false
                    })
                })
            } else {
                alert("Preencha os campos devidamente!")
            }
        } else {
            if (email.length > 0 && password.length >= minLengthPassword){
                axios.post("http://localhost:3003/login", {email, password}).then(resp => {
                    this.props.setUser(resp.data)
                    localStorage.setItem("_user", resp.data)
                    this.props.history.push("/")
                }).catch(err => alert(err))
            }
        }
    }

    onChange(e) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { isSignOut, name, email, password } = this.state 
        return (
            <React.Fragment>
                <div style={{ height: '100vh', width: '100%'}} className="d-flex justify-content-center align-items-center bg-dark">
                    <div className="card">
                        <div className="card-header">
                            { isSignOut? "Registrar": "Login"}
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <div className={isSignOut?"form-group": "invisible"}>
                                    <label htmlFor="name">Nome</label>
                                    <input name="name" id="name" onChange={this.onChange} 
                                    type="text" className="form-control"  value={name}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">E-mail</label>
                                    <input name="email" id="email" onChange={this.onChange} 
                                    type="email" className="form-control" value={email}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Senha</label>
                                    <input name="password" onChange={this.onChange}
                                     type="password" className="form-control" value={password}/>
                                </div>
                                <a href="" className="register-link" onClick={this.toggleSignOut}>{isSignOut? "Clique para logar": "Clique para registrar"}</a>
                                <button className={isSignOut?"btn btn-success": "btn btn-primary"}>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ setUser }, dispatch)

export default connect(null, mapDispatchToProps)(User)