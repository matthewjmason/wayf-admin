import React from 'react';

import PropTypes from 'prop-types';

import { Label } from 'react-bootstrap';


export default class AccessTypeDisplay extends React.Component {
  static propTypes = {
    accessType: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.getDisplayName = this.getDisplayName.bind(this);
  }

  getDisplayName(accessType) {
    if ('REMOVE_IDP' === accessType) {
      return <Label bsStyle="danger">DELETE</Label>;
    } else if ('READ_IDP_HISTORY' === accessType) {
      return <Label bsStyle="info">GET</Label>;
    } else if ('ADD_IDP' === accessType) {
      return <Label bsStyle="success">SAVE</Label>;
    } else {
      return <Label bsStyle="warning">accessType</Label>;
    }
  }

  render() {
    return this.getDisplayName(this.props.accessType);
  }
}