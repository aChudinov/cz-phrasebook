import Form from './form/Page.react';
import List from './list/Page.react';
import Phrase from './phrase/Page.react';
import PhraseStore from './stores/Phrase';
import React from 'react';
import Tags from './tags/Page.react';
import { Provider } from 'mobx-react/native';
import { Scene, Router } from 'react-native-router-flux';

const store = new PhraseStore();

export default () => (
  <Provider store={store}>
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="list" component={props => <List {...props} />} title="List of phrases" direction="leftToRight" initial />
        <Scene key="phrase" component={props => <Phrase {...props} />} title="Show phrase" />
        <Scene key="form" component={props => <Form {...props} />} title="Add new phrase" />
        <Scene key="tags" component={Tags} title="Tags list" />
      </Scene>
    </Router>
  </Provider>
);
