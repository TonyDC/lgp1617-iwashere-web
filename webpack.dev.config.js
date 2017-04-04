const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'eval',

    entry: [
        'webpack-hot-middleware/client',
        './src/index'
    ],

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
        })
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
