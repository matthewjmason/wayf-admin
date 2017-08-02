import React from 'react';

import PropTypes from 'prop-types';

import { Button} from 'react-bootstrap';
import ForgetIdpMutation from '../../mutations/ForgetIdpMutation';


export default class ForgetIdpButton extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired,
    relay: PropTypes.object.isRequired,
    subscriber: PropTypes.func.isRequired,
    idpId: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {isLoading: false};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({isLoading : true});

    ForgetIdpMutation.commit(
        this.props.relay.environment,
        {idpId: this.props.idpId, onCompleted: this.props.subscriber()},
        this.props.viewer.id,
        this.props.subscriber
    );

  }

  render() {
    return (
        <Button bsStyle="danger" disabled={this.state.isLoading} onClick={this.handleClick}>
          Forget
        </Button>
    );
  }
};
