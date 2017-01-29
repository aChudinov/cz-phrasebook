import CommonLayout from '../layouts/Common.react';
import List from './List.react';
import React from 'react';

export default () => (
  <CommonLayout hasAddButton hasLanguageSwitcher>
    <List />
  </CommonLayout>
);
