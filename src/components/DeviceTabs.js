import PropTypes from 'prop-types';
import React from 'react';
import IdpHistory from './IdpHistory';
import { createFragmentContainer, createRefetchContainer, graphql } from 'react-relay';
import { Button,
  Nav,
  NavItem,
  Grid,
  Col,
  Row,
  Tab,
  Tabs,
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

    this.tabStates = { fetchedHistory: true, fetchedActivity: false };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(eventKey) {
    var requiresRefetch = false;

    var refetchVariables = null;

    if (eventKey == 'history') {
      if (!this.tabStates.fetchedHistory) {
        requiresRefetch = true;

        refetchVariables = fragmentVariables => ({
          fetchHistory: true,
          fetchActivity: !this.tabStates.fetchActivity
        });

        this.tabStates.fetchedHistory = true;
      }
    }

    if (eventKey == 'activity') {
      if (!this.tabStates.fetchedActivity) {
        requiresRefetch = true;

        refetchVariables = fragmentVariables => ({
          fetchHistory: this.tabStates.fetchedHistory,
          fetchActivity: true
        });

        this.tabStates.fetchedActivity = true;
      }
    }

    if (requiresRefetch) {
      this.props.relay.refetch(refetchVariables, null);
    }
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
              <TabPane eventKey="history"><IdpHistory relay={this.props.relay} viewer={this.props.viewer}/></TabPane>
              <TabPane eventKey="activity"><DeviceActivity viewer={this.props.viewer}/></TabPane>
            </TabContent>
          </Row>
        </TabContainer>
    );
  }
}

DeviceTabs.propTypes = propTypes;

export default createRefetchContainer(
    DeviceTabs,
    graphql.experimental`
        fragment DeviceTabs_viewer on viewer
        @argumentDefinitions(
            fetchHistory: {type: "Boolean!", defaultValue: true},
            fetchActivity: {type: "Boolean!", defaultValue: false}
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
        query DeviceTabsRefetchQuery($fetchHistory: Boolean!, $fetchActivity: Boolean!) {
            viewer {
                ...DeviceTabs_viewer @arguments(fetchHistory: $fetchHistory, fetchActivity: $fetchActivity)
            }
        }
    `,
);
