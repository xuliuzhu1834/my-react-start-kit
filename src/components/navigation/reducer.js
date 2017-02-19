/**
 * Created by yeyangmei on 16/9/13.
 */
import { LOCATION_CHANGE } from 'react-router-redux';
import assign from 'object-assign';

const menus = [
  {
    name: '商品管理',
    key: 'goods',
    icon: 'bars',
    children: [],
  },
];

const linkList = menus.reduce((concated, { children }) => (
  concated.concat(children)), []);
const defaultState = {
  current: '/',
  load: false,
  menus,
  linkList,
  expandable: 'close',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return Object.assign({}, state, {
        current: action.payload.pathname,
      });
    case 'nav_init_user_info_res':
      return assign({}, state, {
        load: true,
      });
    case 'nav_expand':
      return assign({}, state, {
        expandable: action.value,
      });
    default:
      return state;
  }
};
