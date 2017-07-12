import React from 'react';

import PropTypes from 'prop-types';

import {
  Col,
  Button, Grid,
  Row} from 'react-bootstrap';

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
    this.sessionRows = this.sessionRows.bind(this);
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
