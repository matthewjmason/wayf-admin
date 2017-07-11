import React from 'react';

import PropTypes from 'prop-types';

import {
  Col,
  Button, Grid,
  Row} from 'react-bootstrap';

import AccessTypeDisplay from './AccessTypeDisplay'

import moment from 'moment';


export default class DeviceActivity extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.sessionRows = this.sessionRows.bind(this);
  }

  sessionRows(device) {
    if (!device) {
      return <Button>Nothing</Button>;
    }
    return device.activity.map(
        function(access, i) {
          return (
              <Row>
                <Col md={5}>
                  {moment(access.createdDate).format('LLL')}
                </Col>
                <Col md={5}>
                  {access.publisher.name}
                </Col>
                <Col md={2}>
                  <AccessTypeDisplay accessType={access.type} />
                </Col>
              </Row>
          )
        }
    );
  }


  render() {
    return <Grid>{this.sessionRows(this.props.viewer.device)}</Grid>;
  }
}