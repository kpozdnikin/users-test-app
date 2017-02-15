'use strict';

//to distinguish dev and prod mode
const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

var config = {
    entry: './client/main.js',
    output: {
        filename: './client/js/index.js'
    },

    devServer: {
        inline: true,
        port: 8080
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            },
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff&name=[name].[ext]"
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff&name=[name].[ext]"
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream&name=[name].[ext]"
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file?name=[name].[ext]"
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml"
            }

            /*{
             test: /\.css$/,
             include: /node_modules/,
             loader: "style!css"
             },
             {
             test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
             include: /node_modules/,
             loader: "file?name=[name].[ext]"
             }*/
        ]
    },
    //watch for changes with timeout
    watch: true,
     watchOptions:{
     aggregateTimeout:100
    },

    devtool: NODE_ENV == 'development' ? 'source-map' : null,

    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
            LANG: JSON.stringify('ru')
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};

if(NODE_ENV == 'production'){
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                // dont show unreachable variables etc
                warnings:       false,
                drop_console:   true,
                unsafe:         true
            }
        })
    )
}

module.exports = config;
