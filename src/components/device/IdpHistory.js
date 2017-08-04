import React from 'react';

import PropTypes from 'prop-types';
import moment from 'moment';
import { createRefetchContainer, graphql } from 'react-relay';

import {
  Grid,
  Col,
  Button,
  Row,
  Table} from 'react-bootstrap';

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
    this.generateHistoryRows = this.generateHistoryRows.bind(this);
    this.subscribeToForget = this.subscribeToForget.bind(this);
    this.getProtocolDisplayName = this.getProtocolDisplayName.bind(this);
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

  getProtocolDisplayName(protocol) {
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

  generateHistoryRows(history) {
    if (!history) {
      return <tr><td colSpan="4">No Data to display!</td></tr>;
    }

    return history.map(
      (usage, i) => {
        return (
          <tr key={i}>
            <td>
              {usage.idp.name}
            </td>
            <td>
              {this.getProtocolDisplayName(usage.idp.type)}
            </td>
            <td>
              {moment(usage.lastActiveDate).format('LLL')}
            </td>
            <td>
              <ForgetIdpButton idpId={usage.idp.idpId} viewer={this.props.viewer} relay={this.props.relay} subscriber={this.subscribeToForget} />
            </td>
          </tr>
        )
      }
    );
  }

  render() {
    return (
      <Table striped condensed hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Protocol</th>
            <th>Timestamp</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.generateHistoryRows(this.props.viewer.history)}
        </tbody>
      </Table>
    )
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
                    idpId: id,
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
