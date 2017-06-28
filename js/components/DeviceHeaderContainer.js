import React from 'react';
import {
  createFragmentContainer,
  graphql
} from 'react-relay/compat';
import DeviceHeader from './DeviceHeaderComponent';

export default createFragmentContainer(DeviceHeader, {
   viewer: graphql`
            fragment DeviceHeaderContainer_viewer on viewer {
                device {
                    globalId,
                    info {
                        userAgent
                    }
                },
                latestActivity {
                    publisher {
                        name
                    },
                    createdDate
                }
            }
        `
});