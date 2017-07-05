/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only.  Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import React from 'react';
import {
    createFragmentContainer,
    graphql,
    compat
} from 'react-relay';

import DeviceHeader from './DeviceHeaderContainer';
import ForgetIdpButton from './ForgetIdpButtonComponent';
import moment from 'moment';

import { Button,
    Grid,
    Col,
    Row,
    Nav,
    NavItem,
    PageHeader,
    Tab,
    Tabs,
    Label } from 'react-bootstrap';
var classNames = require('classnames');

function sessionRow(activity) {

    return activity.map(
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
                      {getDisplayName(access.type)}
                  </Col>
                </Row>
            )
        }
    );
}

function getDisplayName(accessType) {
    if ('REMOVE_IDP' === accessType) {
        return 'DELETE';
    } else if ('READ_IDP_HISTORY' === accessType) {
        return 'GET';
    } else if ('ADD_IDP' === accessType) {
        return 'SAVE'
    } else {
        return accessType;
    }
}

function summaryRow(props) {
    return props.viewer.history.map(
        function(usage, i) {
            return (
                <Row>
                  <Col md={3}>
                      {usage.idp.name}
                  </Col>
                  <Col md={3}>
                      {usage.idp.type}
                  </Col>
                  <Col md={2}>
                      {moment(usage.lastActiveDate).format('LLL')}
                  </Col>
                   <Col md={2}>
                       <ForgetIdpButton relay={props.relay} viewer={props.viewer} idpId={usage.idp.id}/>
                   </Col>
                </Row>
            )
        }
    );
}
function buttonClick(i) {
    console.log(i);
    alert(i);
}

function loadSummary(props) {

    return (
        <Grid>
          <Row className="row-fluid">
            <Col md={3}>
              <h2>Name</h2>
            </Col>
            <Col md={3}>
              <h2>Protocol</h2>
            </Col>
            <Col md={2}>
              <h2></h2>
            </Col>
            <Col md={2}>
                  <h2></h2>
            </Col>
          </Row>
            {summaryRow(props)}
        </Grid>
    );
}

function loadActivity(device) {

      return (
        <Grid>
            {sessionRow(device.activity)}
        </Grid>
    );
}

export default class App extends React.Component {
    constructor(props) {
        super();
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
                    <Tab eventKey={1} title="Overview">{loadSummary(this.props)}</Tab>
                    <Tab eventKey={2} title="Activity">{loadActivity(this.props.viewer.device)}</Tab>
                  </Tabs>
                </Col>
              </Row>
            </Grid>
        );
    }
}
