import React from 'react';

import PropTypes from 'prop-types';

import { Button,
    Grid,
    Col,
    Row} from 'react-bootstrap';

export default class DeviceActivity extends React.Component {
    static propTypes = {
        viewer: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);

        this.sessionRows = this.sessionRows.bind(this);
        this.getDisplayName = this.getDisplayName.bind(this);
    }

    sessionRows(device) {
        if (!device || !dive) {
            return;
        }
        return device.activity.map(
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
                            {this.getDisplayName(access.type)}
                        </Col>
                    </Row>
                )
            }
        );
    }

    getDisplayName(accessType) {
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

    render() {
        return (
            <Grid>
                {this.sessionRows(this.props.viewer.device)}
            </Grid>
        );
    }
}