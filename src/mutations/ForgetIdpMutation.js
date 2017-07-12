import { graphql, commitMutation, Environment } from 'react-relay/compat';

const mutation = graphql`
    mutation ForgetIdpMutation($input: ForgetIdpInput!) {
        forgetIdp(input: $input) {
            viewer {
                history {
                    key: idp {name},
                    idp {
                        id,
                        name,
                        type
                    },
                    lastActiveDate
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

function commit(
    environment: Environment,
    idpId: number,
    viewerId: number,
    onCompleted: func
) {
  commitMutation(
      environment,
      {
        mutation,
        variables: { input: idpId },
        configs: getConfigs(viewerId),
        onCompleted: (response) => {
          onCompleted();
        },
        onError: err => console.error(err),
      }
  );
}

export default { commit };