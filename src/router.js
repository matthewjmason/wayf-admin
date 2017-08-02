import queryMiddleware from 'farce/lib/queryMiddleware';
import createRender from 'found/lib/createRender';
import makeRouteConfig from 'found/lib/makeRouteConfig';
import Route from 'found/lib/Route';
import { Resolver } from 'found-relay';
import React from 'react';
import { graphql } from 'react-relay';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';

import RootApp from './components/RootApp';
import DeviceApp from './components/device/DeviceApp';
import AdminApp from './components/admin/AdminApp';
import PublisherRegistrationInput from './components/publisher/PublisherRegistrationInput';
import PublisherApp from './components/publisher/PublisherApp';
import PublisherInfo from './components/publisher/PublisherInfo';

export const historyMiddlewares = [queryMiddleware];

export function createResolver(fetcher) {
  const environment = new Environment({
    network: Network.create((...args) => fetcher.fetch(...args)),
    store: new Store(new RecordSource()),
  });

  return new Resolver(environment);
}

export const routeConfig = makeRouteConfig(
  <Route path="/"
      Component="RootApp"
      query={graphql`
          query router_RootApp_Query {
            viewer {
              ...RootApp_viewer
            }
          }
        `}>
    
    <Route path="publisher"
        Component={PublisherApp}
        query={graphql`
          query router_PublisherApp_Query {
            viewer {
              ...PublisherApp_viewer
            }
          }
        `}>
      <Route Component={PublisherInfo} />
      <Route path="register" Component={PublisherRegistrationInput} />
    </Route>,
    
    <Route path="admin"
        Component={AdminApp}
        query={graphql`
          query router_AdminApp_Query {
            viewer {
              ...AdminApp_viewer
            }
          }
        `} />,

    <Route path="me"
        Component={DeviceApp}
        query={graphql`
          query router_DeviceApp_Query {
            viewer {
              ...DeviceApp_viewer
            }
          }
        `} />
  </Route>
);

export const render = createRender({});
