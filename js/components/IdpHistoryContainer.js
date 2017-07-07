import {
    createFragmentContainer,
    graphql,
} from 'react-relay/compat';
import IdpHistory from './IdpHistoryComponent';

export default createFragmentContainer(IdpHistory, {
    viewer: graphql`
        fragment IdpHistoryContainer_viewer on viewer {
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