import React from 'react';
import NotFound from './NotFound';
import { Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import PostCreate from './posts/PostCreate';
import PostShow from './posts/PostShow';
import PostList from './posts/PostList';
import PostEdit from './posts/PostEdit';
import PostDelete from './posts/PostDelete';

import history from '../history';

const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>
                <Header />

                <Switch>
                    <Route exact path="/" component={PostList} />
                    <Route path="/posts/new" exact component={PostCreate} />
                    <Route path="/posts/edit/:id" exact component={PostEdit} />
                    <Route path="/posts/delete/:id" exact component={PostDelete} />
                    <Route path="/posts/show/:id" exact component={PostShow} />
                    <Route component={NotFound} />
                </Switch>
            </Router>
        </div >
    )
};

export default App;