
import React from 'react';
import {
    compat
} from 'react-relay';

import DeviceHeader from './DeviceHeaderContainer';
import IdpHistory from './IdpHistoryComponent';
import DeviceActivity from './DeviceActivityComponent';

import moment from 'moment';

import { Button,
    Grid,
    Col,
    Row,
    Tab,
    Tabs } from 'react-bootstrap';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Takes active tab from props if it is defined there
            activeTab: props.activeTab || 1
        };

        // Bind the handleSelect function already here (not in the render function)
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(selectedTab) {
        // The active tab must be set into the state so that
        // the Tabs component knows about the change and re-renders.
        this.setState({
            activeTab: selectedTab
        });
    }


    render() {
        return (
            <Grid>
              <DeviceHeader viewer={this.props.viewer} />

              <Row className="row-fluid">
                <Col md={12}>
                  <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect}>
                    <Tab eventKey={1} title="Overview"><IdpHistory history={this.props.viewer.history} relay={this.props.relay} viewer={this.props.viewer}/></Tab>
                    <Tab eventKey={2} title="Activity"><DeviceActivity viewer={this.props.viewer}/></Tab>
                  </Tabs>
                </Col>
              </Row>
            </Grid>
        );
    }
}
