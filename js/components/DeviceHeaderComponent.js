import React from 'react';

import PropTypes from 'prop-types';

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

export default class DeviceHeader extends React.Component {
    static propTypes = {
        viewer: PropTypes.object.isRequired,
    };

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
                            <Label bsStyle="success">&nbsp;</Label>&nbsp;Last seen {this.props.viewer.latestActivity.createdDate} at {this.props.viewer.latestActivity.publisher.name}
                        </Col>
                    </Row>
                </Grid>
            </Row>
        );
    }
}