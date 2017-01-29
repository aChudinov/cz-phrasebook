import CommonLayout from '../layouts/Common.react';
import fields from './fields';
import Form from './Form.react';
import React from 'react';

export default () => (
  <CommonLayout hasBackButton>
    <Form form={fields} />
  </CommonLayout>
);
