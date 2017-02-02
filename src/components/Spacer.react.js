import React from 'react';
import { View } from 'react-native';

export default ({ thin }) => <View style={{ height: thin ? 10 : 25 }} />;
