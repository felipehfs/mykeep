import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Task from './components/tasks/Task'
import Posts from './components/posts/posts'
import Articles from './components/articles/Articles'
import ReadArticle from './components/readArticle/readArticle'

const Routes = props => (
    <Switch>
        <Route exact path="/" component={Task} />
        <Route exact path="/articles/new" component={Posts} />
        <Route exact path="/articles" component={Articles} />
        <Route path="/articles/:id" component={ReadArticle}/>
        <Redirect to="/" />
    </Switch>
)

export default Routes