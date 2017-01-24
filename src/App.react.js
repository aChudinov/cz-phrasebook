import React, { Component } from 'react';
import Form from './form/Page.react';
import { Provider } from 'mobx-react/native';
import { Scene, Router } from 'react-native-router-flux';

import PhraseStore from './stores/Phrase';

const phraseStore = new PhraseStore();
phraseStore.subscribeLocalstorageToStore();

export default class Phrasebook extends Component {

  render() {
    return (
      <Provider phraseStore={phraseStore}>
        <Router>
          <Scene key="root" hideNavBar>
            <Scene key="form" component={Form} title="Add new phrase" />
          </Scene>
        </Router>
      </Provider>
    );
  }
}
