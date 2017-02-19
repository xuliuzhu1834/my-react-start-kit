import { Menu, Icon } from 'antd';
import React from 'react';
import { Link } from 'react-router';
import styles from './style.css';
// import {
//   getPermission,
// } from '../../lib/permission';

const SubMenu = Menu.SubMenu;
const Sider = ({
  menus,
  current,
}) => {
  const defaultOpenKeys = menus.filter(menu =>
  menu.children.findIndex(item => item.link === current) > -1)
    .map(menu => menu.key);
  return (
    <Menu
      selectedKeys={[current]}
      defaultOpenKeys={defaultOpenKeys}
      mode="inline" theme="dark"
      className={styles.menu}
    >{
      menus.map(({ name, key, icon, children }) => (
        <SubMenu
          key={key} title={<span><Icon type={icon} className={styles.LevelIcon} /><span className={styles.Level1}>{name}</span></span>}
        >
          {
            children.filter(({ nav }) => (!!nav)).map(prop => (
              <Menu.Item
                key={prop.link}
                className={styles.menu2}
              >
                <Link to={prop.link} className={styles.Level2}>
                  <Icon type={prop.icon} className={styles.LevelIcon} /> {prop.name}
                </Link>
              </Menu.Item>
            ))
          }
        </SubMenu>
      ))
    }
    </Menu>
  );
};

Sider.propTypes = {
  current: React.PropTypes.string,
  /* eslint  react/forbid-prop-types: 0 */
  menus: React.PropTypes.array,
};
export default Sider;

