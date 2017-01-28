import React, { Component } from 'react';
import Form from './form/Page.react';
import List from './list/Page.react';
import PhraseStore from './stores/Phrase';
import { Provider } from 'mobx-react/native';
import { Scene, Router } from 'react-native-router-flux';

const store = new PhraseStore();

export default class Phrasebook extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene key="root" hideNavBar>
            <Scene key="form" component={Form} title="Add new phrase" />
            <Scene key="list" component={List} title="List of phrases" />
          </Scene>
        </Router>
      </Provider>
    );
  }
}
