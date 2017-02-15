import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './App/App.jsx';
import NoMatch from './App/NotMatch.jsx';
import Users from './App/Users.jsx';
import Home from './App/Home.jsx';

ReactDOM.render(
    <Router history={ browserHistory }>
        <Route path="/" component={ App }>
            <IndexRoute component={ Home }/>
            <Route path="users" component={ Users }/>
            <Route path="*" component={ NoMatch }/>
        </Route>
    </Router>,
    document.getElementById('content')
);