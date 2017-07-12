import React from 'react';

import PropTypes from 'prop-types';
import moment from 'moment';
import { createRefetchContainer, graphql } from 'react-relay';

import {
  Grid,
  Col,
  Button,
  Row} from 'react-bootstrap';

import ForgetIdpButton from './ForgetIdpButton';

export class IdpHistory extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired,
    relay: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.fetchedHistory = false;

    this.toggleShow = this.toggleShow.bind(this);
    this.summaryRow = this.summaryRow.bind(this);
    this.loadSummary = this.loadSummary.bind(this);
    this.subscribeToForget = this.subscribeToForget.bind(this);
  }

  subscribeToForget() {
    this.fetchedHistory = false;
    this.toggleShow();
  }

  toggleShow() {
    if (!this.fetchedHistory) {
      const refetchVariables = () => ({
        fetchHistory: true
      });

      this.fetchedHistory = true;
      this.props.relay.refetch(refetchVariables, null);
    }
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
                  <ForgetIdpButton idpId={usage.idp.id} viewer={this.props.viewer} relay={this.props.relay} subscriber={this.subscribeToForget} />
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

export default createRefetchContainer(
    IdpHistory,
    graphql.experimental`
        fragment IdpHistory_viewer on viewer
        @argumentDefinitions(
            fetchHistory: {type: "Boolean!", defaultValue: true}
        ) {
            history @include(if: $fetchHistory) {
                key: idp {name},
                idp {
                    id,
                    name,
                    type
                },
                lastActiveDate
            }
        }
    `,
    graphql.experimental`
        query IdpHistoryRefetchQuery($fetchHistory: Boolean!) {
            viewer {
                ...IdpHistory_viewer @arguments(fetchHistory: $fetchHistory)
            }
        }
    `,
);
