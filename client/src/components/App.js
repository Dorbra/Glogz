import React from 'react';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';
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
            <BrowserRouter>
                <Header />

                <Router history={history}>
                    <Route exact path="/" component={PostList} /> {/* '/' -> PostList */}
                    <Route path="/posts/new" component={PostCreate} /> {/* '/posts/new' -> PostCreate */}
                    <Route path="/posts/edit/:id" component={PostEdit} /> {/* '/posts/edit' -> PostEdit */}
                    <Route path="/posts/delete/:id" component={PostDelete} /> {/* '/posts/delete' -> PostDelete */}
                    <Route path="/posts/show" component={PostShow} /> {/* '/posts/show' -> PostShow */}
                </Router>
            </BrowserRouter>
        </div>
    )
};

export default App;