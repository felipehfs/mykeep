import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Task from './components/tasks/Task'
import Posts from './components/posts/posts'
import Articles from './components/articles/Articles'
import ReadArticle from './components/readArticle/readArticle'
import User from './components/user/User'
import PrivateRoute from './PrivateRoute'

const Routes = props => (
    <Switch>
        <Route exact path="/" component={Task} />
        <Route path="/login" component={User} />
        <PrivateRoute exact path="/articles/new" component={Posts} />
        <PrivateRoute exact path="/articles" component={Articles} />
        <PrivateRoute path="/articles/:id" component={ReadArticle}/>
        <Redirect to="/" />
    </Switch>
)

export default Routes