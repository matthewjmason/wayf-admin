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
    constructor(props) {
    super(props);

    this.getUserAgent = this.getUserAgent.bind(this);
    this.getLatestActivity = this.getLatestActivity.bind(this);
  }

  getUserAgent() {
    console.log(this.props.viewer.device);

    if (this.props.viewer.device && this.props.viewer.device.info) {
      return this.props.viewer.device.info.userAgent;
    }

    return '';
  }

  getLatestActivity() {
    if (this.props.viewer.latestActivity) {
      return (
        <Col md={12}>
            <Label bsStyle="success">&nbsp;</Label>&nbsp;Last seen {moment(this.props.viewer.latestActivity.createdDate).format('LLL')} at {this.props.viewer.latestActivity.publisher.name}
        </Col>
      );
    } else {
      return (
        <Col md={12}>
            <Label bsStyle="warning">&nbsp;</Label>&nbsp;No Activity
        </Col>
      );
    }
  }

  render() {
    return (
          <Row className="row-fluid">
              <Grid>
                  <Row>
                      <Col md={12}>
                          <PageHeader>WAYF Device Admin&nbsp;<small>{this.getUserAgent()}</small></PageHeader>
                      </Col>
                  </Row>
                  <Row>
                      {this.getLatestActivity()}
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
