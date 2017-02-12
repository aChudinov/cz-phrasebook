import List from './List.react';
import React, { Component, PropTypes as RPT } from 'react';

export default class ListPage extends Component {

  static propTypes = {
    data: RPT.string
  }

  render() {
    const { data } = this.props;

    return <List tag={data} />;
  }
}
