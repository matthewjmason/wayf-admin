import queryMiddleware from 'farce/lib/queryMiddleware';
import createRender from 'found/lib/createRender';
import makeRouteConfig from 'found/lib/makeRouteConfig';
import Route from 'found/lib/Route';
import { Resolver } from 'found-relay';
import React from 'react';
import { graphql } from 'react-relay';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';

import DeviceApp from './components/DeviceApp';
import PublisherRegistrationInput from './components/PublisherRegistrationInput';
import PublisherApp from './components/PublisherApp';
import PublisherInfo from './components/PublisherInfo';

export const historyMiddlewares = [queryMiddleware];

export function createResolver(fetcher) {
  const environment = new Environment({
    network: Network.create((...args) => fetcher.fetch(...args)),
    store: new Store(new RecordSource()),
  });

  return new Resolver(environment);
}


export const routeConfig = makeRouteConfig(
   <Route path="publisher"
    Component={PublisherApp}
    query={graphql`
      query router_PublisherApp_Query {
        publisherRegistration {
          ...PublisherApp_publisherRegistration
        }
      }
    `}>
    <Route Component={PublisherInfo} />
    <Route path="register" Component={PublisherRegistrationInput} />
  </Route>,
);

export const render = createRender({});
