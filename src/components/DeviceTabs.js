import PropTypes from 'prop-types';
import React from 'react';
import IdpHistory from './IdpHistory';
import { createFragmentContainer, graphql } from 'react-relay';
import { Nav,
  NavItem,
  Col,
  Row,
  TabContainer,
  TabContent, TabPane} from 'react-bootstrap';
import DeviceActivity from "./DeviceActivity";

const propTypes = {
  viewer: PropTypes.object.isRequired,
  relay: PropTypes.object.isRequired,
};

class DeviceTabs extends React.Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(eventKey) {
    if (eventKey === 'history') {
      this.idpHistoryComponent.refs.component.toggleShow();
    }

    if (eventKey === 'activity') {
      this.deviceActivityComponent.refs.component.toggleShow();
    }
  }

  componentDidMount() {
    this.handleSelect('history');
  }

  render() {
    return (
        <TabContainer defaultActiveKey="history">
          <Row className="clearfix">

            <Col md={12}>
              <Nav bsStyle="tabs" onSelect={this.handleSelect}>
                <NavItem eventKey="history">Overview</NavItem>
                <NavItem eventKey="activity">Activity</NavItem>
              </Nav>
            </Col>

            <TabContent>
              <TabPane eventKey="history">
                <IdpHistory relay={this.props.relay} viewer={this.props.viewer} ref={(idpHistory) => { this.idpHistoryComponent = idpHistory; }}/>
              </TabPane>
              <TabPane eventKey="activity">
                <DeviceActivity relay={this.props.relay} viewer={this.props.viewer} ref={(deviceActivity) => { this.deviceActivityComponent = deviceActivity; }}/>
              </TabPane>
            </TabContent>
          </Row>
        </TabContainer>
    );
  }
}

DeviceTabs.propTypes = propTypes;

export default createFragmentContainer(
    DeviceTabs,
    graphql.experimental`
        fragment DeviceTabs_viewer on viewer {
            ...IdpHistory_viewer,
            ...DeviceActivity_viewer
        },
    `,
);
