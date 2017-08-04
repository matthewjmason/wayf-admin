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

function commit(
    environment: Environment,
    publisherName: string,
    contactFirstName: string,
    contactLastName: string,
    contactPhoneNumber: string,
    contactEmail: string,
    onComplete: func
) {
  const variables  = {
    input: {
      publisherName,
      contactFirstName,
      contactLastName,
      contactPhoneNumber,
      contactEmail
    }
  }

  commitMutation(
      environment,
      {
        mutation,
        variables: variables,
        onCompleted: (response) => {
          onComplete();
        },
        onError: err => console.error(err),
      }
  );
}

export default { commit };