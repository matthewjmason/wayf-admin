import { graphql, commitMutation, Environment } from 'react-relay/compat';

const mutation = graphql`
    mutation PublisherRegistrationCreateMutation($input: CreatePublisherRegistrationInput!) {
        createPublisherRegistration(input: $input) {
            publisherRegistration {
                responseId: id
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
    publisherName: string,
    contactFirstName: string,
    contactLastName: string,
    contactEmail: string,
    contactPhoneNumber: string
) {
  const variables  = {
    input: {
      publisherName,
      contactFirstName,
      contactLastName,
      contactEmail,
      contactPhoneNumber
    }
  }
  console.log(environment);

  commitMutation(
      environment,
      {
        mutation,
        variables: variables,
        onCompleted: (response) => {
          console.log(response);
        },
        onError: err => console.error(err),
      }
  );
}

export default { commit };