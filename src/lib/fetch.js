/**
 * Created by xuliuzhu on 16/9/5.
 */
/**
 * Created by fed on 16/8/2.
 */
import { notification } from 'antd';
import { hashHistory } from 'react-router';

let fetch;
if (process.env.NODE_ENV === 'test') {
  fetch = global.fetch;
} else {
  fetch = window.fetch;
}

let messageShowed = false;

function showMessage(msg, fn = () => {}) {
  if (!messageShowed) {
    messageShowed = true;
    notification.open({
      message: '提醒',
      description: msg,
    });
    setTimeout(() => {
      messageShowed = false;
      fn();
    }, 3000);
  }
}

export default (url, args = {}) => (
  fetch(url, Object.assign({
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Token: localStorage.getItem('token') || 'test',
      ClientId: localStorage.getItem('clientId') || 'test',
      SiteUID: localStorage.getItem('siteUID') || 'test',
    },
  }, args)))
  .then((res) => {
    const { status } = res;
    if (status === 404) return hashHistory.push('/error/404');
    else if (status === 500) return hashHistory.push('/error/500');
    else if (status > 300) {
      showMessage('服务器响应出错,请尝试 刷新 重试,或者联系开发人员需求帮助  _(:3 」∠)_');
      throw new Error(status);
    }
    return res.json();
  });
