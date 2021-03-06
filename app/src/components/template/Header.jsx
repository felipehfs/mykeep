import React from 'react'
import { Link } from 'react-router-dom'
import { setUser } from '../../store/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';


class Header extends React.Component{

    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }
    
    logout(e) {
        e.preventDefault()
        localStorage.clear()
        this.props.setUser(null)
        window.location = "/login"
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to="/" className="navbar-brand">My Keep</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarNav" aria-controls="navbarNav"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Tasks</a>
                        </li>
                        <li className="nav-item">
                            <Link to="/articles" className="nav-link">Artigos</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                               {localStorage.getItem('_user')? JSON.parse(localStorage.getItem("_user")).name  : ""}
                </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" href="#" onClick={this.logout}>Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
} 


const mapStateToProps = state => ({
    userData: state.userReducer
})

const mapDispatchToProps = dispatch => bindActionCreators({ setUser }, dispatch) 

export default connect(mapStateToProps, mapDispatchToProps)(Header)