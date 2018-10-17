import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import './index.html';
import './index.less';
import '../node_modules/antd-mobile/dist/antd-mobile.css'; 
// 1. Initialize
const app = dva({
    history: createHistory(),
  });

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
// app.model(require('./models/index').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
