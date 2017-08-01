import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { Nav,
  NavItem,
  Col,
  Row,
  TabContainer,
  TabContent, TabPane} from 'react-bootstrap';
import PendingRegistrations from "./PendingRegistrations";

const propTypes = {
  viewer: PropTypes.object.isRequired,
  relay: PropTypes.object.isRequired,
};

class AdminTabs extends React.Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(eventKey) {
    if (eventKey === 'pending') {
      this.idpHistoryComponent.refs.component.toggleShow();
    }

    if (eventKey === 'approved') {
      this.deviceActivityComponent.refs.component.toggleShow();
    }

    if (eventKey === 'denied') {
      this.deviceActivityComponent.refs.component.toggleShow();
    }
  }

  render() {
    return (
        <TabContainer defaultActiveKey="pending">
          <Row className="clearfix">

            <Col md={12}>
              <Nav bsStyle="tabs" onSelect={this.handleSelect}>
                <NavItem eventKey="pending">Pending</NavItem>
              </Nav>
            </Col>

            <TabContent>
              <TabPane eventKey="pending">
                <PendingRegistrations relay={this.props.relay} viewer={this.props.viewer} ref={(pendingRegistrations) => { this.pendingRegistrations = pendingRegistrations; }}/>
              </TabPane>
            </TabContent>
          </Row>
        </TabContainer>
    );
  }
}

AdminTabs.propTypes = propTypes;

export default createFragmentContainer(
    AdminTabs,
    graphql.experimental`
        fragment AdminTabs_viewer on viewer {
            ...PendingRegistrations_viewer
        },
    `,
);
