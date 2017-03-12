import CommonLayout from '../layouts/Common.react';
import fields from './fields';
import Form from './Form.react';
import React, { PropTypes as RPT } from 'react';

const Page = ({ data }) => (
  <CommonLayout hasBackButton noPadding>
    <Form form={fields} phrase={data} />
  </CommonLayout>
);

Page.propTypes = {
  data: RPT.object
};

export default Page;
