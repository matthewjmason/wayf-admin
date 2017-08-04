import React from 'react';

import PropTypes from 'prop-types';

import { Label } from 'react-bootstrap';


export default class IdentityProviderProtocolDisplay extends React.Component {
  static propTypes = {
    protocol: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.getDisplayName = this.getDisplayName.bind(this);
  }

  getDisplayName(protocol) {
    if ('SAML' === protocol) {
      return 'SAML';
    } else if ('OPEN_ATHENS' === protocol) {
      return 'Open Athens';
    } else if ('OAUTH' === protocol) {
      return 'OAUTH';
    } else {
      return protocol;
    }
  }

  render() {
    return this.getDisplayName(this.props.protocol);
  }
}