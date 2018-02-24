const webpack = require("webpack");
const path = require("path");

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

module.exports = {
    devtool: "inline-source-map",
    entry: [
        `webpack-dev-server/client?http://${server_ip_address}:${server_port}/`,
        "webpack/hot/only-dev-server",
        "./src"
    ],
    output: {
        path: `${__dirname}/public`,
        filename: "index.js"
    },
    resolve: {
        modulesDirectories: ["node_modules", "src"],
        extensions: [
            "",
            ".js"
        ]
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                loaders: ["react-hot", "babel?presets[]=react,presets[]=es2015"],
            },
            {
                test: /\.css$/,
                loaders: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
};
