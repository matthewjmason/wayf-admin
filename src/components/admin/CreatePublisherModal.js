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
  Button,
  Modal
} from 'react-bootstrap';

export default class CreatePublisherModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
        <Modal show={true} dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">Approve Registration Request</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           
        <Form horizontal>
          <h3>Publisher Information</h3>

          <FormGroup controlId="publisherName" validationState={this.state.publisherNameValidationState}>
            <Col componentClass={ControlLabel} sm={2}>
              Publisher Name
            </Col>
            <Col sm={10}>
              <FormControl inputRef={ref => { this.publisherName = ref; }} type="text" value={this.props.publisherRegistration.publisherName} />
            </Col>
          </FormGroup>

          <FormGroup controlId="publisherCode" validationState={this.state.publisherCodeValidationState}>
            <Col componentClass={ControlLabel} sm={2}>
              Publisher Code
            </Col>
            <Col sm={10}>
              <FormControl inputRef={ref => { this.publisherCode = ref; }} type="text" value="" />
            </Col>
          </FormGroup>

          <h3>Contact Information</h3>

          <FormGroup controlId="contactFirstName" validationState={this.state.contactFirstNameValidationState}>
            <Col componentClass={ControlLabel} sm={2}>
              First Name
            </Col>
            <Col sm={10}>
              <FormControl  inputRef={(ref) => {this.contactFirstName = ref}} type="text" value={this.props.publisherRegistration.contact.firstName} />
            </Col>
          </FormGroup>

          <FormGroup controlId="contactLastName" validationState={this.state.contactLastNameValidationState}>
            <Col componentClass={ControlLabel} sm={2} >
              Last Name
            </Col>
            <Col sm={10}>
              <FormControl inputRef={(ref) => {this.contactLastName = ref}} type="text" value={this.props.publisherRegistration.contact.lastName} />
            </Col>
          </FormGroup>

          <FormGroup controlId="contactEmail" validationState={this.state.contactEmailValidationState}>
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={10}>
              <FormControl inputRef={(ref) => {this.contactEmail = ref}} type="email" value={this.props.publisherRegistration.contact.email} />
            </Col>
          </FormGroup>

          <FormGroup controlId="contactPhoneNumber" validationState={this.state.contactPhoneNumberValidationState}>
            <Col componentClass={ControlLabel} sm={2}>
              Phone Number
            </Col>
            <Col sm={10}>
              <FormControl inputRef={(ref) => {this.contactPhoneNumber = ref}} type="text" value={this.props.publisherRegistration.contact.phoneNumber} />
            </Col>
          </FormGroup>
        </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit">
              Submit
            </Button>
            <Button bsStyle="danger"disabled={this.state.disableSubmit}>
              Cancel
            </Button>          
          </Modal.Footer>
        </Modal>
    );
  }
}
