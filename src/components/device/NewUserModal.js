import React from 'react';

import PropTypes from 'prop-types';

import { 
  Label,
  Modal,
  Button
} from 'react-bootstrap';


export default class NewUserModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: true
    }

    this.acknowledge = this.acknowledge.bind(this);
  }

  acknowledge() {
    var state = this.state;
    state.showModal = false;

    this.setState(state);
  }

  render() {
    return (
        <Modal show={this.state.showModal} dialogClassName="custom-modal">
          <Modal.Header>
            <Modal.Title id="contained-modal-title-lg">Welcome!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>It appears that you have not yet registered with the WAYF Cloud. Please visit one our participating partners to register.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.acknowledge}>
              Got It!
            </Button>        
          </Modal.Footer>
        </Modal>
    );
  }
}