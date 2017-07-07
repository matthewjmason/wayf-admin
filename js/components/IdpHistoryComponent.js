import React from 'react';

import PropTypes from 'prop-types';
import ForgetIdpButton from './ForgetIdpButtonComponent';
import moment from 'moment';

import {
    Grid,
    Col,
    Row} from 'react-bootstrap';
var classNames = require('classnames');

export default class IdpHistory extends React.Component {
    static propTypes = {
        viewer: PropTypes.object.isRequired,
        relay: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.summaryRow = this.summaryRow.bind(this);
        this.loadSummary = this.loadSummary.bind(this);
    }

    summaryRow(history) {
        if (!history) {
            return;
        }
        return history.map(
            (usage, i) => {
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

    loadSummary(history) {
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
                        <h2>{history}</h2>
                    </Col>
                </Row>

                {this.summaryRow(history)}
            </Grid>
        );
    }


    render() {
        return (
            <Grid>
                {this.loadSummary(this.props.history)}
            </Grid>
        );
    }
}