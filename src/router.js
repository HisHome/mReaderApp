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
    const BookRanking = dynamic({
		app,
		models: () => [import('./models/bookRanking')],
		component: () => import('./routes/BookRanking'),
    });
    const BookRankInfo = dynamic({
		app,
		models: () => [import('./models/bookRankInfo')],
		component: () => import('./routes/BookRankInfo'),
    });
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/bookTypeInfo" exact component={BookTypeInfo} />
        <Route path="/bookDetail" exact component={BookDetail} />
        <Route path="/bookContent" exact component={BookContent} />
        <Route path="/bookRanking" exact component={BookRanking} />
        <Route path="/bookRankInfo" exact component={BookRankInfo} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
