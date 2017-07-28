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
  Button,
  Modal
} from 'react-bootstrap';

const propTypes = {
  relay: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired
};

class PublisherRegistrationInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        showProcessingModal: false,
        showSuccessModal: false,
        disableSubmit: false,
        publisherNameValidationState: null,
        contactFirstNameValidationState: null,
        contactLastNameValidationState: null,
        contactPhoneValidationState: null,
        contactEmailValidationState: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.hideProcessingModal = this.hideProcessingModal.bind(this);
    this.hideSuccessModal = this.hideSuccessModal.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
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


  handleSubmit() {
    var validInputs = this.validateInputs();

    if (!validInputs) {
      return;
    }

    this.setState({disableSubmit: true, showProcessingModal: true});

    PublisherRegistrationCreateMutation.commit(
          this.props.relay.environment,
          this.publisherName.value,
          this.contactFirstName.value,
          this.contactLastName.value,
          this.contactPhoneNumber.value,
          this.contactEmail.value,
          this.hideProcessingModal
    );
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

  render() {
    return (
      <div>

        <Modal show={this.state.showProcessingModal} dialogClassName="custom-modal">
          <Modal.Body>
            Request is processing...
          </Modal.Body>
        </Modal>

        <Modal show={this.state.showSuccessModal} dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">Sucess!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Your request was received. You should hear back from the WAYF team in the next couple of days.
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="success" onClick={this.hideSuccessModal}>OK</Button>
          </Modal.Footer>
        </Modal>


        <Form horizontal>
          <h3>Publisher Information</h3>

          <FormGroup controlId="publisherName" validationState={this.state.publisherNameValidationState}>
            <Col componentClass={ControlLabel} sm={2}>
              Publisher Name
            </Col>
            <Col sm={10}>
              <FormControl inputRef={ref => { this.publisherName = ref; }} type="text" placeholder="" />
            </Col>
          </FormGroup>

          <h3>Contact Information</h3>

          <FormGroup controlId="contactFirstName" validationState={this.state.contactFirstNameValidationState}>
            <Col componentClass={ControlLabel} sm={2}>
              First Name
            </Col>
            <Col sm={10}>
              <FormControl  inputRef={(ref) => {this.contactFirstName = ref}} type="text" placeholder="" />
            </Col>
          </FormGroup>

          <FormGroup controlId="contactLastName" validationState={this.state.contactLastNameValidationState}>
            <Col componentClass={ControlLabel} sm={2} >
              Last Name
            </Col>
            <Col sm={10}>
              <FormControl inputRef={(ref) => {this.contactLastName = ref}} type="text" placeholder="" />
            </Col>
          </FormGroup>

          <FormGroup controlId="contactEmail" validationState={this.state.contactEmailValidationState}>
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={10}>
              <FormControl inputRef={(ref) => {this.contactEmail = ref}} type="email" placeholder="" />
            </Col>
          </FormGroup>

          <FormGroup controlId="contactPhoneNumber" validationState={this.state.contactPhoneNumberValidationState}>
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
        <Button type="submit" disabled={this.state.disableSubmit} onClick={this.handleSubmit}>
          Submit
        </Button>
        <Button bsStyle="danger"disabled={this.state.disableSubmit} onClick={this.props.onSuccess}>
          Cancel
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