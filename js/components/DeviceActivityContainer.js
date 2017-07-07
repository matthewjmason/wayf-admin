import {
    createFragmentContainer,
    graphql,
} from 'react-relay/compat';
import DeviceActivity from './DeviceActivityComponent';

export default createFragmentContainer(DeviceActivity, {
    viewer: graphql`
        fragment DeviceActivityContainer_viewer on viewer {
            device {
                activity {
                    publisher {
                        name
                    },
                    type,
                    createdDate
                }
            }
        }`
});