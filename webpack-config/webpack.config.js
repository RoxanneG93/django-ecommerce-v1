const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const exclusions = /node_modules/;

//console.log(path.resolve(__dirname))
module.exports = [
    {
      entry: {
        app: ["./assets/app.js", "./assets/scss/app.scss"],
      },
      output: {
        path: path.resolve(__dirname, "../ecommerce/static"),
        publicPath: "/static/",
        filename: "[name].js",
        chunkFilename: "[id]-[chunkhash].js",
      },
      devServer: {
        port: 8081,
        writeToDisk: true,
      },
      module: {
        rules: [
          {
            test: /\.scss$/,
            exclude: exclusions,
            use: [
              MiniCssExtractPlugin.loader, // 3. extracts css to css file
              "css-loader", // 2. turns css into commonjs
              "sass-loader" // 1. turns sass into css
            ],
          },
        ],
      },
      plugins: [
        new CleanWebpackPlugin({
            // ignores assets folder in app's static dir
            cleanOnceBeforeBuildPatterns: [`!${path.resolve(__dirname, "../ecommerce/static/assets")}`],
            cleanStaleWebpackAssets: false 
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            options: {
                publicPath: '/static/',
            },
        }),
      ],
    },
];