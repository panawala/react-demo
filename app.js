import React from 'react'
import { createHistory, useBasename } from 'history'
import { Router, Route, IndexRoute } from 'react-router'
import { render } from 'react-dom'

const history = useBasename(createHistory)({
  basename: ''
});

render((
    <Router history={history}>
        <Route path="/" getComponent={ require('./routes/async_routes').index }>
            <IndexRoute getComponent={ require('./routes/async_routes').index }/>
            <Route path="/calender" getComponent={ require('./routes/async_routes').calender }/>
            <Route path="/grades" getComponent={ require('./routes/async_routes').grades }/>
            <Route path="/messages" getComponent={ require('./routes/async_routes').messages }/>
        </Route>
    </Router>
), document.getElementById('example'));

