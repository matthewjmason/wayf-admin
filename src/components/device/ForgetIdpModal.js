import React from 'react';

import { 
  Modal,
  Alert
} from 'react-bootstrap';

import Button from 'react-bootstrap-button-loader';

import PropTypes from 'prop-types';
import ForgetIdpMutation from '../../mutations/ForgetIdpMutation';

export default class ForgetIdpModal extends React.Component {
  static propTypes = {
    onForget: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    relay: PropTypes.object.isRequired,
    identityProvider: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
    	disableActions: false,
    	showModal: true,
      loading: false,
      successfulForget: false,
      showSuccessAlert: false
    };

    this.handleForgetRequest = this.handleForgetRequest.bind(this);
    this.handleForgetSuccess = this.handleForgetSuccess.bind(this);
    this.close = this.close.bind(this);
    this.getModalBody = this.getModalBody.bind(this);
    this.hideSuccessModal = this.hideSuccessModal.bind(this);
    this.getModalActions = this.getModalActions.bind(this);
  }

  handleForgetRequest() {
  	var state = this.state;
  	state.loading = true;
  	this.setState(state);

    ForgetIdpMutation.commit(
        this.props.relay.environment,
        this.props.identityProvider.idpId,
        this.handleForgetSuccess
    );
  }

  handleForgetSuccess(response) {
  	var state = this.state;
    state.loading = false;
    state.successfulForget = true;
    state.showSuccessAlert = true;

  	this.setState(state);
  }

  hideSuccessModal() {
    var state = this.state;
    state.showSuccessAlert = true;
    this.setState(state);
  }

  getModalAlert() {
    if (this.state.showSuccessAlert) {
      return (<Alert bsStyle="success" onDismiss={this.hideSuccessModal}>Success!</Alert>);
    }
  }

  getModalBody() {
    if (this.state.successfulForget) {
      return (<p>Successfully removed <b>{this.props.identityProvider.name}</b> from your login suggestions.</p>);
    } else {
      return (<p>Are you sure you want to remove <b>{this.props.identityProvider.name}</b> from your login suggestions?</p>);
    }
  }

  getModalActions() {
    if (this.state.successfulForget) {
      return (<Button onClick={this.close}>Close</Button>);
    } else {
      return (
        <div>
          <Button loading={this.state.loading} spinColor='#000' onClick={this.handleForgetRequest}>
            Confirm
          </Button>
          <Button bsStyle='danger' onClick={this.close}>
            Cancel
          </Button>
        </div>
      );
    }
  }

  close() {
    var successfulForget = this.state.successfulForget;
  	var state = this.state;
  	state.showModal = false;
  	this.setState(state);

    if (successfulForget) {
      this.props.onForget();
    } else {
      this.props.onClose();
    }
  }

  confirm() {
    var state = this.state;
    state.showModal = false;
    this.setState(state);

    this.props.onForget();
  }

  render() {
    return (
	    <Modal show={this.state.showModal} dialogClassName="custom-modal">
	      <Modal.Header>
	        <Modal.Title id="contained-modal-title-lg">Forget Login Suggestion</Modal.Title>
	      </Modal.Header>
	      <Modal.Body>
          {this.getModalAlert()}
	        {this.getModalBody()}
	      </Modal.Body>
	      <Modal.Footer>
          {this.getModalActions()}         
	      </Modal.Footer>
	    </Modal>
    );
  }
}
