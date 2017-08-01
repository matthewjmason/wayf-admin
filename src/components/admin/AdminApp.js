import React from 'react';

import PropTypes from 'prop-types';

import { 
  createFragmentContainer, 
  graphql 
} from 'react-relay';


import AdminHeader from './AdminHeader';
import AdminTabs from './AdminTabs';

import { 
  Grid,
  Col,
  Button
} from 'react-bootstrap';

class AdminApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.adminViewer);
    console.log(this.props.viewer);
    return (
        <div data-framework="relay">
          <Grid>
            <AdminHeader />
            <AdminTabs relay={this.props.relay} viewer={this.props.viewer}/>
          </Grid>
        </div>
      );
  
  }
}

export default createFragmentContainer(
  AdminApp,
  graphql`
    fragment AdminApp_viewer on viewer {
        ...AdminTabs_viewer
    }
  `
);