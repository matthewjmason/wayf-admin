import PropTypes from 'prop-types';
import React from 'react';

import { 
  createFragmentContainer, 
  graphql 
} from 'react-relay';

import {
  Col,
  Button, 
  Grid,
  Row,
  Thumbnail,
  Jumbotron
} from 'react-bootstrap';

export default class DefaultHome extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col>
            <Jumbotron>
              <h1>Welcome to the WAYF Cloud!</h1>
              <p>The WAYF (Where Are You From) Cloud infrastructure enables service providers to exchange data with each other, so that users visiting one service provider are remembered on other service providers.</p>
              <p>This reduces, or even eliminates actions that currently need to be repeated by users at every service provider they visit.</p>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
        <Col xs={6} md={4}>
          <Thumbnail src="/images/thumbnaildiv.png" alt="242x200">
            <h3>Users</h3>
            <p>Users of publisher platforms can leverage the WAYF platform for a streamlined login process.</p>
            <p>
              <Button bsStyle="primary" href="/me">Lean More</Button>
            </p>
          </Thumbnail>
        </Col>
        <Col xs={6} md={4}>
          <Thumbnail src="/images/thumbnaildiv.png" alt="242x200">
            <h3>Publishers</h3>
            <p>Register to take part in the WAYF cloud. </p>
            <p>
              <Button bsStyle="primary" href="/publisher" >Learn More</Button>
            </p>
          </Thumbnail>
        </Col>
        <Col xs={6} md={4} >
          <Thumbnail src="/images/thumbnaildiv.png" alt="242x200">
            <h3>Administrators</h3>
            <p>View and act on publisher registrations,</p>
            <p>
              <Button bsStyle="primary" href="/admin">Learn More</Button>
            </p>
          </Thumbnail>
        </Col>
        </Row>
      </Grid>
    );
  }
}
