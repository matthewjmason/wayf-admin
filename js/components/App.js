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
import Relay from 'react-relay';

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
                      {access.createdDate}
                  </Col>
                  <Col md={5}>
                      {access.publisher.name}
                  </Col>
                  <Col md={2}>
                      {access.type}
                  </Col>
                </Row>
            )
        }
    );
}

function summaryRow(usages) {
    return usages.map(
        function(usage, i) {
            return (
                <Row>
                  <Col md={5}>
                      {usage.idp.name}
                  </Col>
                  <Col md={5}>
                      {usage.idp.type}
                  </Col>
                  <Col md={2}>
                      {usage.lastActiveDate}
                  </Col>
                </Row>
            )
        }
    );
}

function loadSummary(history) {

    return (
        <Grid>
          <Row className="row-fluid">
            <Col md={5}>
              <h2>Last Seen</h2>
            </Col>
            <Col md={5}>
              <h2>Organization</h2>
            </Col>
            <Col md={2}>
              <h2></h2>
            </Col>
          </Row>
            {summaryRow(history)}
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
class App extends React.Component {
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
              <Row className="row-fluid">
                <Grid>
                  <Row>
                    <Col md={12}>
                      <PageHeader>{this.props.viewer.device.info.userAgent}</PageHeader>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <Label bsStyle="success">&nbsp;</Label>&nbsp;Last seen {this.props.viewer.latestActivity.createdDate} at {this.props.viewer.latestActivity.publisher.name}
                    </Col>
                  </Row>
                </Grid>
              </Row>
              <Row className="row-fluid">
                <Col md={12}>
                  <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect}>
                    <Tab eventKey={1} title="Overview">{loadSummary(this.props.viewer.history)}</Tab>
                    <Tab eventKey={2} title="Activity">{loadActivity(this.props.viewer.device)}</Tab>
                  </Tabs>
                </Col>
              </Row>
            </Grid>
        );
    }
}
export default Relay.createContainer(App, {
    fragments: {
        viewer: () => Relay.QL`
            fragment on viewer {
                device {
                    globalId,
                    info {
                        userAgent
                    },
                    activity {
                        publisher {
                            name
                        },
                        type,
                        createdDate
                    }
                    
                },
                latestActivity {
                    publisher {
                        name
                    },
                    createdDate
                },
                history {
                    key: idp {name},
                    idp {
                        name,
                        type
                    },
                    lastActiveDate
                }

            }
        `,
    },
});
