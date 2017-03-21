import React from 'react';
import { connect } from 'react-redux';
import { BackTop, Breadcrumb, Icon, Button } from 'antd';
import { Link } from 'react-router';

import Welcome from './welcome';
import Sider from './sider';
import styles from './style.css';

// const confirm = Modal.confirm;
// const showConfirm = (dispatch) => {
//   confirm({
//     title: '确定要退出吗',
//     onOk() {
//       dispatch({ type: 'user_my_account_log_out' });
//     },
//     onCancel() {},
//   });
// };
class Navigation extends React.Component {
  componentWillMount() {
   // this.props.dispatch({ type: 'nav_init_user_info' });
  }
  render() {
    // if (this.props.load)
    const { linkList, children, current, menus } = this.props;
    const routerMatchList = linkList.filter(
      ({ link }) => (link === '/' || `${current}/`.startsWith(`${link}/`)))
      .sort((item1, item2) => item1.link.length > item2.link.length);
    // document.title = [...routerMatchList].reverse()[0]
    //   ?
    //   [...routerMatchList].reverse()[0].name : '';
    return (
      <div className={styles.antLayoutAside}>
        <aside
          className={styles.antLayoutSider}
          style={{ width: this.props.expandable === 'expand' ? '180px' : '0px' }}
        >
          <div className={styles.antLayoutLogo} >
            <Link to="/">
              后台管理
            </Link>
          </div>
          <Sider current={current} menus={menus} routerMatchList={routerMatchList} />
        </aside>

        <div
          className={styles.antLayoutMain}
          style={{ marginLeft: this.props.expandable === 'expand' ? '180px' : '0px' }}
        >
          <div className={styles.antLayouttop}>
            <Button
              type="ghost"
              shape="circle-outline"
              className={styles.expandBtn}
              onClick={() => (
                this.props.dispatch(
                  {
                    type: 'nav_expand',
                    value: this.props.expandable === 'expand' ? 'close' : 'expand',
                  })
              )}
            ><Icon
              type="swap"
              style={{ fontSize: '15px' }}
            /></Button>
            <Breadcrumb className={styles.top_margin}>
              {
                routerMatchList
                  .map(({ link, crubName, name }) => (
                    <Breadcrumb.Item key={link}>
                      <Link className={styles.linkcolor} to={link}>{crubName || name}</Link>
                    </Breadcrumb.Item>
                  ))
              }
            </Breadcrumb>
          </div>
          <div>
            <div className={styles.antLayoutContent}>
              <BackTop />
              {
                children || <Welcome />
              }
            </div>
          </div>
        </div>
      </div>

    );
    // return (
    //   <div style={{ textAlign: 'center' }}>
    //     <Spin size="large" />
    //   </div>
    // );
  }
}

Navigation.propTypes = {
  /* eslint  react/forbid-prop-types: 0 */
  dispatch: React.PropTypes.func,
  children: React.PropTypes.element,
  current: React.PropTypes.string,
  linkList: React.PropTypes.array,
  menus: React.PropTypes.array,
  expandable: React.PropTypes.string,
};

const mapStateToProps = state => state.navigation;

export default connect(mapStateToProps)(Navigation);
