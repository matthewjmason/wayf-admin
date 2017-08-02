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
  relay: PropTypes.object.isRequired,
  onApprove: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  publisherRegistration: PropTypes.object.isRequired
};

export default class CreatePublisherModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        showModal: true,
        showProcessingModal: false,
        showSuccessModal: false,
        disableSubmit: false,
        publisherNameValidationState: null,
        publisherCodeValidationState: null,
        contactFirstNameValidationState: null,
        contactLastNameValidationState: null,
        contactPhoneValidationState: null,
        contactEmailValidationState: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.hideProcessingModal = this.hideProcessingModal.bind(this);
    this.hideSuccessModal = this.hideSuccessModal.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
    this.generatePublisherCode = this.generatePublisherCode.bind(this);
    this.getModalBody = this.getModalBody.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  hideProcessingModal() {
    var state = this.state;
    state.showProcessingModal = false;
    state.showSuccessModal = true;

    this.setState(state);
  }

  hideSuccessModal() {
    var state = this.state;
    state.showProcessingModal = false;
    state.showSuccessModal = false; 
    state.succesfulRegistration = true;

    this.setState(state);

    this.props.onSuccess();
  }

  cancel() {
    var state = this.state;
    state.showModal = false;
    this.setState(state);
    this.props.onCancel();
  }

  handleSubmit() {
    var validInputs = this.validateInputs();

    if (!validInputs) {
      return;
    }

    this.setState({disableSubmit: true, loading: true});
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

    if (!this.publisherCode.value) {
      state.publisherCodeValidationState = 'error';
      successfulValidation = false;
    } else {
      state.publisherCodeValidationState = null;
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

  getModalBody() {
    console.log(this.state.showProcessingModal);
    if (this.state.showProcessingModal) {
      return (
        <p>Your request is processing...</p>
      );
    } else {
      return (
            <Form horizontal>
              <h3>Publisher Information</h3>

              <FormGroup controlId="publisherName" validationState={this.state.publisherNameValidationState}>
                <Col componentClass={ControlLabel} sm={2}>
                  Publisher Name
                </Col>
                <Col sm={10}>
                  <FormControl inputRef={ref => { this.publisherName = ref; }} type="text" defaultValue={this.props.publisherRegistration.publisherName} />
                </Col>
              </FormGroup>

              <FormGroup controlId="publisherCode" validationState={this.state.publisherCodeValidationState}>
                <Col componentClass={ControlLabel} sm={2}>
                  Publisher Code
                </Col>
                <Col sm={10}>
                  <FormControl inputRef={ref => { this.publisherCode = ref; }} type="text" defaultValue={this.generatePublisherCode(this.props.publisherRegistration.publisherName)} />
                </Col>
              </FormGroup>

              <h3>Contact Information</h3>

              <FormGroup controlId="contactFirstName" validationState={this.state.contactFirstNameValidationState}>
                <Col componentClass={ControlLabel} sm={2}>
                  First Name
                </Col>
                <Col sm={10}>
                  <FormControl  inputRef={(ref) => {this.contactFirstName = ref}} type="text" defaultValue={this.props.publisherRegistration.contact.firstName} />
                </Col>
              </FormGroup>

              <FormGroup controlId="contactLastName" validationState={this.state.contactLastNameValidationState}>
                <Col componentClass={ControlLabel} sm={2} >
                  Last Name
                </Col>
                <Col sm={10}>
                  <FormControl inputRef={(ref) => {this.contactLastName = ref}} type="text" defaultValue={this.props.publisherRegistration.contact.lastName} />
                </Col>
              </FormGroup>

              <FormGroup controlId="contactEmail" validationState={this.state.contactEmailValidationState}>
                <Col componentClass={ControlLabel} sm={2}>
                  Email
                </Col>
                <Col sm={10}>
                  <FormControl inputRef={(ref) => {this.contactEmail = ref}} type="email" defaultValue={this.props.publisherRegistration.contact.email} />
                </Col>
              </FormGroup>

              <FormGroup controlId="contactPhoneNumber" validationState={this.state.contactPhoneNumberValidationState}>
                <Col componentClass={ControlLabel} sm={2}>
                  Phone Number
                </Col>
                <Col sm={10}>
                  <FormControl inputRef={(ref) => {this.contactPhoneNumber = ref}} type="text" defaultValue={this.props.publisherRegistration.contact.phoneNumber} />
                </Col>
              </FormGroup>
            </Form>
        );
    }
  }

  render() {
    return (
        <Modal show={this.state.showModal} dialogClassName="custom-modal">
          <Modal.Header>
            <Modal.Title id="contained-modal-title-lg">Approve Registration Request</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.getModalBody()}
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" loading={this.state.loading} spinColor='#000' onClick={this.handleSubmit}>
              Submit
            </Button>
            <Button bsStyle="danger" disabled={this.state.disableSubmit} onClick={this.cancel}>
              Cancel
            </Button>          
          </Modal.Footer>
        </Modal>
    );
  }
}

CreatePublisherModal.propTypes = propTypes;
