import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'

const PrivateRoute = ({ component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        localStorage.getItem("_user") ? <Component {...props} /> : <Redirect to="/login" />  
    )} />
)

const mapStateToProps = action => ({
    userData: action.userReducer
})

export default connect(mapStateToProps)(PrivateRoute)