import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Pagination.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { FriendList } from '../components';
import { createPageHandles, convertListToPages } from '../utils';

@connect(state => ({
  currentPage: state.friendlist.currentPage
}))
export default class Pagination extends Component {
  static propTypes = {
    friends: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    currentPage: PropTypes.number.isRequired
  }

  selectPage(pageNumber) {
    const { selectPage } = this.props.actions;

    return () => {
      if (!isNaN(pageNumber)) {
        selectPage( pageNumber );
      }
    }
  }

  render() {
    const { actions, friends, currentPage } = this.props,
          pages = convertListToPages(friends),
          pagination = createPageHandles(pages, currentPage);

    const HandleTag = (handle, action) => {
      return (<li key={handle} className={handle === currentPage ? styles.active: ''} onClick={action}>{handle}</li>);
    }

    return (
      <div>
        <FriendList friends={pages[currentPage]} actions={actions} />
        <div className={styles.handles}>
          <ul>
            {pagination.map(function(handle) {
              let tag;

              if (handle === 'prev') {
                tag = HandleTag(handle, this.selectPage(currentPage - 1));
              } else if (handle === 'next') {
                tag = HandleTag(handle, this.selectPage(currentPage + 1));
              } else {
                tag = HandleTag(handle, this.selectPage(handle));
              }
              return tag;
            }, this)}
          </ul>
        </div>
      </div>
    )
  }
}
