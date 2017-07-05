/**
 * This file was generated by:
 *   relay-compiler
 *
 * @providesModule ForgetIdpMutation.graphql
 * @generated SignedSource<<31175ad7586679eb6e0b3543308a559e>>
 * @relayHash d999a7477616bd6a75fccdf16f5966af
 * @flow
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type ForgetIdpInput = {
  idpId?: ?number;
};

export type ForgetIdpMutationResponse = {
  viewer?: ?ForgetIdpMutationResponse_viewer;
};

export type ForgetIdpMutationResponse_viewer_device = {
  globalId?: ?string;
};

export type ForgetIdpMutationResponse_viewer = {
  device?: ?ForgetIdpMutationResponse_viewer_device;
};
*/


/*
mutation ForgetIdpMutation(
  $input: ForgetIdpInput!
) {
  forgetIdp(input: $input) {
    viewer {
      device {
        globalId
      }
    }
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "ForgetIdpInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ForgetIdpMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "ForgetIdpInput!"
          }
        ],
        "concreteType": "ForgetIdpPayload",
        "name": "forgetIdp",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "viewer",
            "name": "viewer",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "DeviceType",
                "name": "device",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "globalId",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "ForgetIdpMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "ForgetIdpInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "ForgetIdpMutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "ForgetIdpInput!"
          }
        ],
        "concreteType": "ForgetIdpPayload",
        "name": "forgetIdp",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "viewer",
            "name": "viewer",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "DeviceType",
                "name": "device",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "globalId",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation ForgetIdpMutation(\n  $input: ForgetIdpInput!\n) {\n  forgetIdp(input: $input) {\n    viewer {\n      device {\n        globalId\n      }\n    }\n  }\n}\n"
};

module.exports = batch;
