const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  return {
    mode: argv.mode || "development",
    entry: {
      main: "./src/main.js"
    },
    plugins: [
      new HtmlWebpackPlugin({
        minify: isProduction,
        template: "./src/index.html",
        inlineSource: isProduction ? ".(js|css)$" : ""
      }),
      new HtmlWebpackInlineSourcePlugin(),
      new MiniCssExtractPlugin({ filename: "[contenthash].css" })
    ],
    output: {
      filename: "[contenthash].js",
      path: path.resolve(__dirname, "dist")
    },
    optimization: {
      minimize: isProduction
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [{ loader: MiniCssExtractPlugin.loader }, "css-loader"]
        },
        {
          test: /\.svg$/,
          loader: "svg-url-loader"
        },
        {
          test: /\.png$/,
          loader: "url-loader"
        }
      ]
    }
  };
};
