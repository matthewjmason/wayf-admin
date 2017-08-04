import React from 'react';

import PropTypes from 'prop-types';

import { createFragmentContainer, graphql } from 'react-relay';

import PublisherRegistrationCreateMutation from '../../mutations/PublisherRegistrationCreateMutation';
import CreatePublisherForm from '../admin/CreatePublisherForm';

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
    var validInputs = this.createPublisherForm.validateInputs();

    if (!validInputs) {
      return;
    }

    this.setState({disableSubmit: true, showProcessingModal: true});

    PublisherRegistrationCreateMutation.commit(
          this.props.relay.environment,
          this.createPublisherForm.publisherName.value,
          this.createPublisherForm.contactFirstName.value,
          this.createPublisherForm.contactLastName.value,
          this.createPublisherForm.contactPhoneNumber.value,
          this.createPublisherForm.contactEmail.value,
          this.hideProcessingModal
    );
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
            Your request was received. You should receive a response from the WAYF team in the next couple of days.
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="success" href="/publisher">OK</Button>
          </Modal.Footer>
        </Modal>

        <CreatePublisherForm ref={instance => {this.createPublisherForm = instance; }} suppressPublisherCode={true}/>
        <Button type="submit" disabled={this.state.disableSubmit} onClick={this.handleSubmit}>
          Submit
        </Button>
        <Button bsStyle="danger"disabled={this.state.disableSubmit} href="/publisher">
          Cancel
        </Button>
      </div>

    );
  }
}

export default createFragmentContainer(
  PublisherRegistrationInput,
  graphql`
    fragment PublisherRegistrationInput_viewer on viewer {
        viewerId
    }
  `
);