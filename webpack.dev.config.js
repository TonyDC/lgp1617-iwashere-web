const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'eval',

    entry: {
        app: ['webpack-hot-middleware/client', './src/index'],
        vendor: ['webpack-hot-middleware/client', 'react', 'react-dom', 'moment', 'material-ui']
    },

    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/public/'
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProvidePlugin({
            'Promise': 'es6-promise',                                           // Thanks Aaron (https://gist.github.com/Couto/b29676dd1ab8714a818f#gistcomment-1584602)
            'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')                       // This is required for the following: src/index.js imports a CommonJS-compliant file, where it it analyzed
            }                                                                   // the 'process.env' property. For the NodeJS, there is no problem because the environment variable is set
        }),                                                                     // when the command is run. However, when a ES6-compliant file accesses the same file (config/index.js), the
                                                                                // environment variables are not set, because they are transpiled by Webpack. As such, it is necessary to define
                                                                                // the environment variable using webpack.DefinePlugin.

        new webpack.optimize.CommonsChunkPlugin({ name: "vendor", filename: "vendor.bundle.js" })
    ],

    resolve: {
        modules: [
            path.join(__dirname, "src"),
            "node_modules"
        ]
    },

    module: {
        loaders: [
            { test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: path.join(__dirname, 'node_modules') },
            { test: /\.scss?$/,
                loader: 'style-loader!css-loader!sass-loader',
                include: path.join(__dirname, 'src', 'styles') },
            { test: /\.css$/,
                loader: 'style-loader!css-loader' },
            { test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader' },
            { test: /\.(png|jp(e)?g)$/,
                loader: 'file-loader' },
            // The url-loader uses DataUrls.
            // The file-loader emits files.
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    }
};
