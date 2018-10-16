import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';


function RouterConfig({ history, app }) {
    const IndexPage = dynamic({
		app,
		models: () => [import('./models/index')],
		component: () => import('./routes/Index'),
	});

	const BookTypeInfo = dynamic({
		app,
		models: () => [import('./models/bookTypeInfo')],
		component: () => import('./routes/BookTypeInfo'),
	});
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/bookTypeInfo" exact component={BookTypeInfo} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
