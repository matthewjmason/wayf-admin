import React from 'react';

import PropTypes from 'prop-types';

import { createFragmentContainer, graphql } from 'react-relay';

import { 
  Form,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Modal
} from 'react-bootstrap';

import Button from 'react-bootstrap-button-loader';

const propTypes = {
  suppressPublisherCode: PropTypes.bool,
  publisherRegistration: PropTypes.object
};

export default class CreatePublisherForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        publisherNameValidationState: null,
        publisherCodeValidationState: null,
        contactFirstNameValidationState: null,
        contactLastNameValidationState: null,
        contactPhoneValidationState: null,
        contactEmailValidationState: null,
    };

    this.validateInputs = this.validateInputs.bind(this);
    this.generatePublisherCode = this.generatePublisherCode.bind(this);
    this.genereatePublisherCodeInput = this.genereatePublisherCodeInput.bind(this);

    if (this.props.publisherRegistration) {
      this.defaultValues = {
          publisherName: this.props.publisherRegistration.publisherName,
          publisherCode: this.generatePublisherCode(this.props.publisherRegistration.publisherName),
          contactFirstName: this.props.publisherRegistration.contact.firstName,
          contactLastName: this.props.publisherRegistration.contact.lastName,
          contactPhoneNumber: this.props.publisherRegistration.contact.phoneNumber,
          contactEmail: this.props.publisherRegistration.contact.email,
      }
    } else {
      this.defaultValues = {};
    }
  }

  validateInputs() {
    var state = this.state;

    var successfulValidation = true;

    if (!this.publisherName.value) {
      state.publisherNameValidationState = 'error';
      successfulValidation = false;
    } else {
      state.publisherNameValidationState = null;
    }

    if (!this.props.suppressPublisherCode) {
      if (!this.publisherCode.value) {
        state.publisherCodeValidationState = 'error';
        successfulValidation = false;
      } else {
        state.publisherCodeValidationState = null;
      }
    }

    if (!this.contactFirstName.value) {
      state.contactFirstNameValidationState = 'error';
      successfulValidation = false;
    } else {
      state.contactFirstNameValidationState = null;
    }

    if (!this.contactLastName.value) {
      state.contactLastNameValidationState = 'error';
      successfulValidation = false;
    } else {
      state.contactLastNameValidationState = null;
    }

    if (!this.contactEmail.value) {
      state.contactEmailValidationState = 'error';
      successfulValidation = false;
    } else {
      state.contactEmailValidationState = null;
    }

    if (!this.contactPhoneNumber.value) {
      state.contactPhoneNumberValidationState = 'error';
      successfulValidation = false;
    } else {
      state.contactPhoneNumberValidationState = null;
    }

    this.setState(state);

    return successfulValidation;
  }

  generatePublisherCode(publisherName) {
    var upperCasePulisherName = publisherName.toUpperCase();
    var noWhitespace = upperCasePulisherName.replace(/\s+/g, '_');

    return noWhitespace;
  }

  genereatePublisherCodeInput() {
    if (!this.props.suppressPublisherCode) {
      return (
        <FormGroup controlId="publisherCode" validationState={this.state.publisherCodeValidationState}>
          <Col componentClass={ControlLabel} sm={2}>
            Publisher Code
          </Col>
          <Col sm={10}>
            <FormControl inputRef={ref => { this.publisherCode = ref; }} type="text" defaultValue={this.defaultValues.publisherCode} />
          </Col>
        </FormGroup>
      );
    }
  }


  render() {
    return (
      <Form horizontal>
        <h3>Publisher Information</h3>

        <FormGroup controlId="publisherName" validationState={this.state.publisherNameValidationState}>
          <Col componentClass={ControlLabel} sm={2}>
            Publisher Name
          </Col>
          <Col sm={10}>
            <FormControl inputRef={ref => { this.publisherName = ref; }} type="text" defaultValue={this.defaultValues.publisherName} />
          </Col>
        </FormGroup>

        {this.genereatePublisherCodeInput()}

        <h3>Contact Information</h3>

        <FormGroup controlId="contactFirstName" validationState={this.state.contactFirstNameValidationState}>
          <Col componentClass={ControlLabel} sm={2}>
            First Name
          </Col>
          <Col sm={10}>
            <FormControl  inputRef={(ref) => {this.contactFirstName = ref}} type="text" defaultValue={this.defaultValues.contactFirstName} />
          </Col>
        </FormGroup>

        <FormGroup controlId="contactLastName" validationState={this.state.contactLastNameValidationState}>
          <Col componentClass={ControlLabel} sm={2} >
            Last Name
          </Col>
          <Col sm={10}>
            <FormControl inputRef={(ref) => {this.contactLastName = ref}} type="text" defaultValue={this.defaultValues.contactLastName} />
          </Col>
        </FormGroup>

        <FormGroup controlId="contactEmail" validationState={this.state.contactEmailValidationState}>
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={10}>
            <FormControl inputRef={(ref) => {this.contactEmail = ref}} type="email" defaultValue={this.defaultValues.contactEmail} />
          </Col>
        </FormGroup>

        <FormGroup controlId="contactPhoneNumber" validationState={this.state.contactPhoneNumberValidationState}>
          <Col componentClass={ControlLabel} sm={2}>
            Phone Number
          </Col>
          <Col sm={10}>
            <FormControl inputRef={(ref) => {this.contactPhoneNumber = ref}} type="text" defaultValue={this.defaultValues.contactPhoneNumber} />
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

CreatePublisherForm.propTypes = propTypes;
