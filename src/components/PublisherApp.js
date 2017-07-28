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

    this.state = {
        showRegistration: false
    };

    this.determinePublisherContent = this.determinePublisherContent.bind(this);
    this.handleRegistrationSubmission = this.handleRegistrationSubmission.bind(this);
    this.handleRegisterRequest = this.handleRegisterRequest.bind(this);
  }

  handleRegistrationSubmission() {
    var state = this.state;
    state.showRegistration = false;

    this.setState(state);
  }

  handleRegisterRequest() {
    var state = this.state;
    state.showRegistration = true;

    this.setState(state);
  }

  determinePublisherContent() {
    if (this.state.showRegistration) {
      return (
          <PublisherRegistrationInput relay={this.props.relay} onSuccess={this.handleRegistrationSubmission} /> 
      );
    } else {
      return (
          <Col>
            <PublisherInfo />
            <Button bsStyle="success" type="submit" onClick={this.handleRegisterRequest}>
              Register
            </Button>
          </Col>
      );
    }
  }


  render() {
    return (
        <div data-framework="relay">
          <Grid>
            <PublisherHeader />
            {this.determinePublisherContent()}
          </Grid>
        </div>
      );
  
  }
}

export default createFragmentContainer(
  PublisherApp,
  graphql`
    fragment PublisherApp_publisherRegistration on PublisherRegistrationType {
        ...PublisherRegistrationInput_publisherRegistration
    }
  `
);