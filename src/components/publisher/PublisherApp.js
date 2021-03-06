import React from 'react';

import PropTypes from 'prop-types';

import { 
  createFragmentContainer, 
  graphql 
} from 'react-relay';

import PublisherRegistrationInput from './PublisherRegistrationInput';
import PublisherInfo from './PublisherInfo';
import PublisherHeader from './PublisherHeader';

import { 
  Grid,
  Col,
  Button
} from 'react-bootstrap';

class PublisherApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Grid>
          <PublisherHeader />
          {this.props.children}
        </Grid>
      );
  
  }
}

export default createFragmentContainer(
  PublisherApp,
  graphql`
    fragment PublisherApp_viewer on viewer {
        ...PublisherRegistrationInput_viewer
    }
  `
);