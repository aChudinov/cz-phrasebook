import React, { Component } from 'react';
import Form from './Form.react';
import { Scene, Router } from 'react-native-router-flux';

export default class Phrasebook extends Component {

  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar>
          <Scene key="form" component={Form} title="Add new phrase" />
        </Scene>
      </Router>
    );
  }
}
