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
    
    const BookDetail = dynamic({
		app,
		models: () => [import('./models/bookDetail')],
		component: () => import('./routes/BookDetail'),
    });
    const BookContent = dynamic({
		app,
		models: () => [import('./models/bookContent')],
		component: () => import('./routes/BookContent'),
	});
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/bookTypeInfo" exact component={BookTypeInfo} />
        <Route path="/bookDetail" exact component={BookDetail} />
        <Route path="/bookContent" exact component={BookContent} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
