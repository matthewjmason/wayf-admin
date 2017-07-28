import React from 'react';

import PropTypes from 'prop-types';

import { createFragmentContainer, graphql } from 'react-relay';

import PublisherRegistrationCreateMutation from '../mutations/PublisherRegistrationCreateMutation';

import { 
  Form,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button
} from 'react-bootstrap';

class PublisherRegistrationInput extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit() {
    PublisherRegistrationCreateMutation.commit(
          this.props.relay.environment,
          this.publisherName.value,
          this.contactFirstName.value,
          this.contactLastName.value,
          this.contactPhoneNumber.value,
          this.contactEmail.value
    );
  }

  render() {
    return (
      <div data-framework="relay">
        <Form horizontal>
          <h3>Publisher Information</h3>
          <FormGroup controlId="publisherName">
            <Col componentClass={ControlLabel} sm={2}>
              Publisher Name
            </Col>
            <Col sm={10}>
              <FormControl inputRef={ref => { this.publisherName = ref; }} type="text" placeholder="" />
            </Col>
          </FormGroup>

          <h3>Contact Information</h3>

          <FormGroup controlId="contactFirstName">
            <Col componentClass={ControlLabel} sm={2}>
              First Name
            </Col>
            <Col sm={10}>
              <FormControl  inputRef={(ref) => {this.contactFirstName = ref}} type="text" placeholder="" />
            </Col>
          </FormGroup>

          <FormGroup controlId="contactLastName">
            <Col componentClass={ControlLabel} sm={2}>
              Last Name
            </Col>
            <Col sm={10}>
              <FormControl inputRef={(ref) => {this.contactLastName = ref}} type="text" placeholder="" />
            </Col>
          </FormGroup>

          <FormGroup controlId="contactEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={10}>
              <FormControl inputRef={(ref) => {this.contactEmail = ref}} type="email" placeholder="" />
            </Col>
          </FormGroup>

          <FormGroup controlId="contactPhoneNumber">
            <Col componentClass={ControlLabel} sm={2}>
              Phone Number
            </Col>
            <Col sm={10}>
              <FormControl inputRef={(ref) => {this.contactPhoneNumber = ref}} type="text" placeholder="" />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
            </Col>
          </FormGroup>
        </Form>
              <Button type="submit" onClick={this.handleSubmit}>
                Submit
              </Button>
      </div>

    );
  }
}

export default createFragmentContainer(
  PublisherRegistrationInput,
  graphql`
    fragment PublisherRegistrationInput_publisherRegistration on PublisherRegistrationType {
        id
    }
  `
);