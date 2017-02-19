/**
 * Created by brook on 2017/2/13.
 */
import React, { Component } from 'react';
import styles from './style.css';

class Welcome extends Component {
  render() {
    return (
      <div className={styles.demo} style={{ height: window.innerHeight - 74 }}>
        <p><span>你</span><span>好</span><span>啊</span></p>
      </div>
    );
  }
}

export default Welcome;
