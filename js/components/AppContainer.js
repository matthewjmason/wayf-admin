import {
    createFragmentContainer,
    graphql,
} from 'react-relay/compat';
import App from './AppComponent';
import DeviceHeader from './DeviceHeaderContainer'

export default createFragmentContainer(App, {
    viewer: graphql`
        fragment AppContainer_viewer on viewer {
            ...DeviceHeader_viewer,
            device {
                activity {
                    publisher {
                        name
                    },
                    type,
                    createdDate
                }
            }
            history {
                key: idp {name},
                idp {
                    id,
                    name,
                    type
                },
                lastActiveDate
            }
        }`
});