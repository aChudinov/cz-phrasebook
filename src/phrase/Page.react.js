import CommonLayout from '../layouts/Common.react';
import Phrase from './Phrase.react';
import React, { Component, PropTypes as RPT } from 'react';
import { inject, observer } from 'mobx-react/native';

@inject('store')
@observer
export default class PhrasePage extends Component {

  static propTypes = {
    store: RPT.object,
    data: RPT.object
  }

  render() {
    const { data, store } = this.props;

    return (
      <CommonLayout hasBackButton noPadding title={data[store.language]}>
        <Phrase phrase={data} store={store} />
      </CommonLayout>
    );
  }
}
