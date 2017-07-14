# WAYF Admin
## Introduction
An administrative user interface for the WAYF project. Provides users ability to view and manage data stored for their device. 

## Solution Overview
### React and Relay
[React](https://facebook.github.io/react/) tooling provides encapsulated display components. Coupled with [Relay](https://facebook.github.io/relay/) modern, responsible for managing each component's data needs, allows for a modular front-end.

###GraphQL
The [wayf-cloud](https://github.com/Atypon-OpenSource/wayf-cloud) is wrapped with a custom [GraphQL](http://graphql.org/) schema. This provides a layer of abstraction from the core API and integrates well with the React/Relay front-end.

### Node and Express
The [Express](https://expressjs.com/) framework for [node](https://nodejs.org/en/) is leveraged to provide a lightweight but flexible server for handling client requests. Static resources can be served and data requests can be marshalled to the GraphQL server.
the application where to load the wayf environment configuration from. If no value is specified, the application will attempt to load it from the classpath