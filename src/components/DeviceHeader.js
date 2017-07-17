import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import moment from 'moment';

import { Grid,
    Col,
    Row,
    PageHeader,
    Label } from 'react-bootstrap';

const propTypes = {
  viewer: PropTypes.object.isRequired,
  relay: PropTypes.object.isRequired,
};

class DeviceHeader extends React.Component {
  render() {
    return (
          <Row className="row-fluid">
              <Grid>
                  <Row>
                      <Col md={12}>
                          <PageHeader>{this.props.viewer.device.info.userAgent}</PageHeader>
                      </Col>
                  </Row>
                  <Row>
                      <Col md={12}>
                          <Label bsStyle="success">&nbsp;</Label>&nbsp;Last seen {moment(this.props.viewer.latestActivity.createdDate).format('LLL')} at {this.props.viewer.latestActivity.publisher.name}
                      </Col>
                  </Row>
              </Grid>
          </Row>
    );
  }
}

DeviceHeader.propTypes = propTypes;

export default createFragmentContainer(
  DeviceHeader,
  graphql`
    fragment DeviceHeader_viewer on viewer {
      device {
          globalId,
          info {
              userAgent
          },
      },
      latestActivity {
          publisher {
              name
          },
          createdDate
      }
    }
  `
);