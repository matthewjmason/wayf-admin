import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, createRefetchContainer, graphql } from 'react-relay';
import DeviceHeader from './DeviceHeader';
import DeviceTabs from './DeviceTabs';
import { Grid} from 'react-bootstrap';
const propTypes = {
  viewer: PropTypes.object.isRequired,
  relay: PropTypes.object.isRequired,
};

class DeviceApp extends React.Component {
  render() {
    return (
      <div data-framework="relay">
        <Grid>
          <DeviceHeader viewer={this.props.viewer} />
          <DeviceTabs viewer={this.props.viewer} relay={this.props.relay} />
        </Grid>
      </div>
    );
  }
}

DeviceApp.propTypes = propTypes;

export default createFragmentContainer(
    DeviceApp,
  graphql`
    fragment DeviceApp_viewer on viewer {
        ...DeviceHeader_viewer,
        ...DeviceTabs_viewer
    }
  `
);
