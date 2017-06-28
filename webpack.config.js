const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

let appEntry;
let devtool;
let plugins;

if (process.env.NODE_ENV === 'production') {
    appEntry = [path.join(__dirname, 'js/app.js')];
    devtool = 'source-map';
    plugins = [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true
            }
        }),
        new HtmlWebpackPlugin({
            title: 'Relay Starter Kit - Integrated with Relay, GraphQL, Express, ES6/ES7, JSX, Webpack, Babel, Material Design Lite, and PostCSS',
            template: './js/index.html',
            mobile: true,
            inject: false
        }),
    ];
} else {
    appEntry = [
        'react-hot-loader/patch',
        path.join(__dirname, 'js/app.js')
    ];
    devtool = 'eval';
    plugins = [
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            __DEV__: true
        }),
        new HtmlWebpackPlugin({
            title: 'Relay Starter Kit - Integrated with Relay, GraphQL, Express, ES6/ES7, JSX, Webpack, Babel, Material Design Lite, and PostCSS',
            template: './js/index.html',
            mobile: true,
            inject: false
        })
    ];
}

module.exports = {
    entry: {
        app: appEntry,
        vendor: ['react', 'react-dom', 'react-mdl', 'react-relay', 'react-router', 'react-router-relay']
    },
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: '/',
        filename: '[name].js'
    },
    devtool,
    module: {
        rules: [{
            test: /\.jsx?$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ],
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        importLoaders: 1,
                        localIdentName: '[name]__[local]___[hash:base64:5]',
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        // https://github.com/postcss/postcss-loader/issues/164
                        // use ident if passing a function
                        ident: 'postcss',
                        plugins: () => [
                            /* eslint-disable global-require */
                            require('precss'),
                            require('autoprefixer')
                        ]
                    }

                }
            ]
        }, {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 1000,
                        name: 'assets/[hash].[ext]'
                    }
                }
            ]
        }]
    },
    plugins
};