import React, { PropTypes as RPT } from 'react';
import { View } from 'react-native';

const Spacer = ({ thin }) => <View style={{ height: thin ? 10 : 25 }} />;

Spacer.propTypes = {
  thin: RPT.bool
};

export default Spacer;
