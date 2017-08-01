import React from 'react';

import { 
  Modal,
  Button
} from 'react-bootstrap';

import PropTypes from 'prop-types';

const propTypes = {
  onDeny: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  publisherRegistration: PropTypes.object.isRequired
};

export default class DenyPublisherRegistrationModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    	disableActions: false,
    	showModal: true
    };

    this.handleDeny = this.handleDeny.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  handleDeny() {
  	var state = this.state;
  	state.disableActions = true;
  	this.props.setState(state);
  }

  cancel() {
  	var state = this.state;
  	state.showModal = false;
  	this.setState(state);

  	this.props.onCancel();
  }

  render() {
    return (
	    <Modal show={this.state.showModal} dialogClassName="custom-modal">
	      <Modal.Header>
	        <Modal.Title id="contained-modal-title-lg">Deny Registration Request</Modal.Title>
	      </Modal.Header>
	      <Modal.Body>
	        <p>Are you sure you want to reject the request for <b>{this.props.publisherRegistration.publisherName}</b>?</p>
	      </Modal.Body>
	      <Modal.Footer>
	        <Button type="submit" bsStyle="danger" disabled={this.state.disableActions} onClick={this.handleDeny}>
	          Deny
	        </Button>
	        <Button disabled={this.state.disableActions} onClick={this.cancel}>
	          Cancel
	        </Button>          
	      </Modal.Footer>
	    </Modal>
    );
  }
}

DenyPublisherRegistrationModal.propTypes = propTypes;
