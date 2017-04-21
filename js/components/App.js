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
  Label } from 'react-bootstrap';

var classNames = require('classnames');

function sessionRow(publisherSessions) {

  return publisherSessions.map(
    function(publisherSession, i) {
          return (
            <Row>
              <Col md={5}>
                {publisherSession.publisher.name}
              </Col>
              <Col md={5}>
                {publisherSession.lastActiveDate}
              </Col>
              <Col md={2}>
                <Button bsStyle="danger">Delete</Button>
              </Col>
            </Row>
          )
        }
        );
}

class App extends React.Component {
  render() {
    return (
    
<Grid>
    <Row className="row-fluid">
      <Grid>
        <Row>
          <Col md={12}>
            <PageHeader>[BrowserName]<small> [version]</small></PageHeader>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Label bsStyle="success">&nbsp;</Label>&nbsp;Last seen on [date]
          </Col>
        </Row>
      </Grid>
    </Row>
    <Row className="row-fluid">
      <Col md={12}>
        <Nav bsStyle="tabs" activeKey="1">
          <NavItem eventKey="1" href="#">Overview</NavItem>
          <NavItem eventKey="2" title="Activity">Activity</NavItem>
        </Nav>
        <Grid>
          <Row className="row-fluid">
            <Col md={5}>
              <h2>Organization</h2>
            </Col>
            <Col md={5}>
              <h2>Last Seen</h2>
            </Col>
            <Col md={2}>
              <h2></h2>
            </Col>
          </Row>
          
          {sessionRow(this.props.viewer.publisherSessions)}
        </Grid>
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
          id
        },
        publisherSessions {
          id
          localId,
          publisher {
            name
          },
          lastActiveDate
        }
      }
    `,
  },
});
