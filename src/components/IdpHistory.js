import React from 'react';

import PropTypes from 'prop-types';
import moment from 'moment';

import {
  Grid,
  Col,
  Button,
  Row} from 'react-bootstrap';

export default class IdpHistory extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired,
    relay: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.summaryRow = this.summaryRow.bind(this);
    this.loadSummary = this.loadSummary.bind(this);
  }

  summaryRow(history) {
    if (!history) {
      return;
    }
    return history.map(
        (usage, i) => {
          return (
              <Row>
                <Col md={3}>
                  {usage.idp.name}
                </Col>
                <Col md={3}>
                  {usage.idp.type}
                </Col>
                <Col md={2}>
                  {moment(usage.lastActiveDate).format('LLL')}
                </Col>
                <Col md={2}>
                  <Button bsStyle="danger">
                    Forget
                  </Button>
                </Col>
              </Row>
          )
        }
    );
  }

  loadSummary(history) {
    if (history) {

      return (
          <Grid>
            <Row className="row-fluid">
              <Col md={3}>
                <h2>Name</h2>
              </Col>
              <Col md={3}>
                <h2>Protocol</h2>
              </Col>
              <Col md={2}>
                <h2></h2>
              </Col>
              <Col md={2}>
              </Col>
            </Row>

            {this.summaryRow(history)}
          </Grid>
      );
    }

    return <Grid>No History</Grid>;
  }


  render() {
    return this.loadSummary(this.props.viewer.history);
  }
}