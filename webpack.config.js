let path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

let conf = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js',
        publicPath: 'dist/'
    },
    devServer: {
        overlay: true
    },
    plugins: [new MiniCssExtractPlugin()],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
}

module.exports = (env, options) => {
    let production = options.mode === 'production'

    conf.devtool = production
                    ? false
                    : 'eval-sourcemap'

    return conf
}