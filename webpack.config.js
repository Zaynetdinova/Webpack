let path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const svgToMiniDataURI = require('mini-svg-data-uri')

let conf = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.js',
        publicPath: ''
    },
    devServer: {
        overlay: true
    },
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
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "[name].[ext]",
                            outputPath: "images"
                        }
                    },
                ],
            },
            {
                test: /\.svg$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            generator: (content) => svgToMiniDataURI(content.toString()),
                        },
                    },
                ],
            },
            {
                test: /\.pug/,
                loaders: ['html-loader', 'pug-html-loader'],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
        filename: 'bundle.css'
    }),
        new HtmlWebpackPlugin({
            template: './src/index.pug',
            filename: 'index.html'
        })],
}

module.exports = (env, options) => {
    let production = options.mode === 'production'

    conf.devtool = production
                    ? false
                    : 'eval-sourcemap'

    return conf
}