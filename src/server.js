import express from 'express';
import graphQLHTTP from 'express-graphql';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { getFarceResult } from 'found/lib/server';
import ReactDOMServer from 'react-dom/server';
import serialize from 'serialize-javascript';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import cookieParser from 'cookie-parser';

import { ServerFetcher } from './fetcher';
import { createResolver, historyMiddlewares, render, routeConfig }
  from './router';
import schema from './data/schema';

const PORT = 3000;

const app = express();
app.use(cookieParser());

app.use('/graphql', graphQLHTTP((request) => ({
  schema: schema,
  rootValue: { session: request.deviceId },
  graphiql: true
})));

const webpackConfig = {
  entry: [
    'babel-polyfill',
    './src/client',
  ],

  output: {
    path: '/',
    filename: 'bundle.js',
  },

  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
      { test: /\.css$/, use: ExtractTextPlugin.extract('css-loader') },
      { test: /learn\.json$/, use: 'file-loader?name=[name].[ext]' },
    ],
  },

  plugins: [
    new ExtractTextPlugin('styles.css'),
  ],
};

app.use(webpackMiddleware(webpack(webpackConfig), {
  stats: { colors: true },
}));

app.use(async (req, res) => {
  const fetcher = new ServerFetcher(`http://localhost:${PORT}/graphql`);

  const { redirect, status, element } = await getFarceResult({
    url: req.url,
    historyMiddlewares,
    routeConfig,
    resolver: createResolver(fetcher),
    render,
  });

  if (redirect) {
    res.redirect(302, redirect.url);
    return;
  }

  res.status(status).send(`
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>WAYF Cloud</title>
  <link rel="stylesheet" href="styles.css">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">

    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css">
</head>

<body>
<div id="root">${ReactDOMServer.renderToString(element)}</div>

<script>
  window.__RELAY_PAYLOADS__ = ${serialize(fetcher, { isJSON: true })};
</script>
<script src="/bundle.js"></script>
</body>

</html>
  `);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`); // eslint-disable-line no-console
});
