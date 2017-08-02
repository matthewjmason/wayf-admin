import React from 'react';

import PropTypes from 'prop-types';

import {
  Table,
  Button, Grid,
  Row
} from 'react-bootstrap';

import AccessTypeDisplay from './AccessTypeDisplay';
import { createRefetchContainer, graphql } from 'react-relay';

import moment from 'moment';


export class DeviceActivity extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired,
    relay: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.fetchedActivity = false;

    this.toggleShow = this.toggleShow.bind(this);
    this.generateActivityRows = this.generateActivityRows.bind(this);
  }

  toggleShow() {
    if (!this.fetchedActivity) {
      const refetchVariables = () => ({
        fetchActivity: true
      });

      this.fetchedActivity = true;
      this.props.relay.refetch(refetchVariables, null);
    }
  }

  generateActivityRows(device) {
    if (!device || !device.activity) {
      return <tr><td colSpan="3">No Data to display!</td></tr>;
    }

    return device.activity.map(
        function(access, i) {
          return (
              <tr>
                <td>
                  {moment(access.createdDate).format('LLL')}
                </td>
                <td>
                  {access.publisher.name}
                </td>
                <td>
                  <AccessTypeDisplay accessType={access.type} />
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
            <th>Timestamp</th>
            <th>Publisher Name</th>
            <th>Access Type</th>
          </tr>
        </thead>
        <tbody>
          {this.generateActivityRows(this.props.viewer.device)}
        </tbody>
      </Table>
    );
  }
}

export default createRefetchContainer(
    DeviceActivity,
    graphql.experimental`
        fragment DeviceActivity_viewer on viewer
        @argumentDefinitions(
            fetchActivity: {type: "Boolean!", defaultValue: false}
        ) {
            device @include(if: $fetchActivity) {
                activity {
                    publisher {
                        name
                    },
                    type,
                    createdDate
                }
            }
        }
    `,
    graphql.experimental`
        query DeviceActivityRefetchQuery($fetchActivity: Boolean!) {
            viewer {
                ...DeviceActivity_viewer @arguments(fetchActivity: $fetchActivity)
            }
        }
    `,
);
