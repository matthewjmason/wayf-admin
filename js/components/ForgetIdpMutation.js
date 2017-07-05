import { graphql, commitMutation, Environment } from 'react-relay/compat';

const mutation = graphql`
    mutation ForgetIdpMutation($input: ForgetIdpInput!) {
        forgetIdp(input: $input) {
            viewer {
                device {
                    globalId
                }
            }
        }
    }
`;

function getConfigs(viewerId) {
    return [{
        type: 'RANGE_ADD',
        parentName: 'viewer',
        parentID: viewerId,
        connectionName: 'features',
        edgeName: 'featureEdge',
        rangeBehaviors: {
            '': 'append',
        },
    }];
}

function getOptimisticResponse(idpId, viewerId) {
    return {
        forgetIdp: {
            viewer: {
                device: {
                    globalId: viewerId
                }
            }
        }
    };
}

function commit(
    environment: Environment,
    idpId: number,
    viewerId: number
) {
    commitMutation(
        environment,
        {
            mutation,
            variables: { input: idpId },
            optimisticResponse: getOptimisticResponse(idpId, viewerId),
            configs: getConfigs(viewerId),
        }
    );
}

export default { commit };