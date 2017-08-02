import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, createRefetchContainer, graphql } from 'react-relay';
import DeviceHeader from './DeviceHeader';
import DeviceTabs from './DeviceTabs';
import { Grid} from 'react-bootstrap';
import NewUserModal from './NewUserModal';

const propTypes = {
  viewer: PropTypes.object.isRequired,
  relay: PropTypes.object.isRequired,
};

class DeviceApp extends React.Component {
  render() {
    var newUserModal = null;

    if (!this.props.viewer.device || !this.props.viewer.device.globalId) {
      newUserModal = <NewUserModal />
    }
    
    return (
      <div data-framework="relay">
        <Grid>
          {newUserModal}
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
      device {
        globalId
      },
        ...DeviceHeader_viewer,
        ...DeviceTabs_viewer
    }
  `
);
