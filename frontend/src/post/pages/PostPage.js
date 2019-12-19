import { CssBaseline } from '@material-ui/core';
import React, { Fragment } from 'react';
import ContentLayout from '../../shared/components/layouts/content/ContentLayout';
import IconLabelTabs from '../components/Tab';
import './PostPage.css';

const PostPage = () => {
  return (
    <Fragment>
      <CssBaseline />
      <ContentLayout>
        <div style={{ marginTop: '50px' }}>
          <IconLabelTabs></IconLabelTabs>
        </div>
      </ContentLayout>
    </Fragment>
  );
};

export default PostPage;
