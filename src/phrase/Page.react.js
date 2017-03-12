import CommonLayout from '../layouts/Common.react';
import Phrase from './Phrase.react';
import React, { Component, PropTypes as RPT } from 'react';
import { inject, observer } from 'mobx-react/native';

@inject('uiStore')
@observer
export default class PhrasePage extends Component {

  static propTypes = {
    uiStore: RPT.object,
    data: RPT.object
  }

  render() {
    const { data, uiStore } = this.props;

    return (
      <CommonLayout
        hasBackButton
        hasEditButton
        noPadding
        phrase={data}
        title={data[uiStore.language]}
      >
        <Phrase phrase={data} uiStore={uiStore} />
      </CommonLayout>
    );
  }
}
