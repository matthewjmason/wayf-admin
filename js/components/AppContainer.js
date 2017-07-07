import {
    createFragmentContainer,
    graphql,
} from 'react-relay/compat';
import App from './AppComponent';
import DeviceHeader from './DeviceHeaderContainer'
import IdpHistory from './IdpHistoryContainer'
import DeviceActivity from './DeviceActivityContainer'

export default createFragmentContainer(App, {
    viewer: graphql`
        fragment AppContainer_viewer on viewer {
            ...IdpHistory_viewer,
            ...DeviceActivity_viewer,
            ...DeviceHeader_viewer

        }`
});