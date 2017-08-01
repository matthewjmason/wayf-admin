import React from 'react';

import PropTypes from 'prop-types';
import moment from 'moment';
import { createRefetchContainer, graphql } from 'react-relay';

import {
  Grid,
  Table,
  Col,
  Button,
  Row} from 'react-bootstrap';


class PendingRegistrations extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired,
    relay: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.pendingRegistrationsRowMapper = this.pendingRegistrationsRowMapper.bind(this);

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

  pendingRegistrationsRowMapper(pendingPublisherRegistrations) {
    if (!pendingPublisherRegistrations) {
      return <p>No pending registrations</p>;
    }

    return pendingPublisherRegistrations.map(
        function(publisherRegistration, i) {
          return (
              <tr>
                <td>
                  {publisherRegistration.publisherName}
                </td>
                <td>
                  {publisherRegistration.contact.firstName}&nbsp;{publisherRegistration.contact.lastName}
                </td>
                <td>
                  <a href={`mailto:${publisherRegistration.contact.email}`}>{publisherRegistration.contact.email}</a>
                </td>
                <td>
                  {publisherRegistration.contact.phoneNumber}
                </td>
                <td>
                  {moment(publisherRegistration.applicationDate).format('LLL')}
                </td>
                <td>
                  <Button bsStyle="success">Approve</Button>&nbsp;<Button bsStyle="danger">Reject</Button>
                </td>
              </tr>
          )
        }
    );
  }

  render() {
    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Publisher Name</th>
            <th>Contact Name</th>
            <th>Contact Email</th>
            <th>Contact Phone Number</th>
            <th>Application Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.pendingRegistrationsRowMapper(this.props.viewer.pendingPublisherRegistrations)}
        </tbody>
      </Table>);
  }
}

export default createRefetchContainer(
    PendingRegistrations,
    graphql.experimental`
        fragment PendingRegistrations_viewer on viewer 
          @argumentDefinitions(
              fetchPendingRegistrations: {type: "Boolean!", defaultValue: true}
          ) {
            pendingPublisherRegistrations @include(if: $fetchPendingRegistrations) {
              publisherName,
              status,
              contact {
                firstName,
                lastName,
                email,
                phoneNumber
              },
              applicationDate
            }
        }
    `,
    graphql.experimental`
        query PendingRegistrationsRefetchQuery($fetchPendingRegistrations: Boolean!) {
            viewer {
                ...PendingRegistrations_viewer @arguments(fetchPendingRegistrations: $fetchPendingRegistrations)
            }
        }
    `,
);
