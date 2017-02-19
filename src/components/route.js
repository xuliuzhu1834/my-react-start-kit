/**
 * Created by xuliuzhu on 2017/1/16.
 */
import { hashHistory } from 'react-router';
import Nav from './navigation/view';

const viewReq = require.context('./', true, /view\.jsx$/);
const views = viewReq.keys();
function routeFactory(path, module) {
  return {
    path: [path, module.route || ''].join(''),
    component: module.default,
  };
}

function getRoute(path) {
  return path.slice(1).replace(/(\/list)?\/view\.jsx$/, '');
}
export default {
  childRoutes: [
    {
      path: '/',
      getChildRoutes({ location }, callback) {
        let path;
        let route = location.pathname;
        try {
          if (views.indexOf(`.${location.pathname}/view.jsx`) > -1) {
            path = `.${location.pathname}/view.jsx`;
          } else if (views.indexOf(`.${location.pathname}/list/view.jsx`) > -1) {
            path = `.${location.pathname}/list/view.jsx`;
          } else {
            path = views
              .filter(item => location.pathname.startsWith(item.slice(1).replace(/(\/list)?\/view\.jsx$/, '')))
              .sort((a, b) => getRoute(b).length - getRoute(a).length)[0];
            route = getRoute(path);
          }
          callback(null, routeFactory(route, viewReq(path)));
        } catch (e) {
          hashHistory.push('error/404');
        }
      },
      component: Nav,
    },
  ],
};
