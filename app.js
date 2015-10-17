import React from 'react'
import { createHistory, useBasename } from 'history'
import { Router, Route, IndexRoute } from 'react-router'
import { render } from 'react-dom'

const history = useBasename(createHistory)({
  basename: ''
});

render((
    <Router history={history}>
        <Route path="/" getComponent={ require('./routes/async_components').index }>
            <IndexRoute getComponent={ require('./routes/async_components').index }/>
            <Route path="/custom_form" getComponent={ require('./routes/async_components').custom_form }/>
            <Route path="/newform" getComponent={ require('./routes/async_components').newform }/>
            <Route path="/messages" getComponent={ require('./routes/async_components').messages }/>
        </Route>
    </Router>
), document.getElementById('example'));

